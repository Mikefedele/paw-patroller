const { AuthenticationError } = require('apollo-server-express');
const { User, Business } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args.username, args.email, args.password);
      const user = await User.create({ username: args.username, email: args.email, password: args.password });
      // const token = signToken(user);

      console.log(user);
      return user ;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBusiness: async (parent, { name, yelpId, url, location }, context) => {
      // if (context.user) {
        let business = await Business.findOne({yelpId})
        console.log(business);
        if(!business) {
          console.log('you got here')
          console.log(name)
          business = await Business.create({
            name, yelpId, url, location
          });
          console.log('inside if block', business);
        } 

        await User.findOneAndUpdate(
          { _id: '628cfbfc4f68a6d729501c8c'},
          { $addToSet: { businesses: business._id } },
          {new: true},
        );

        return business;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeBusiness: async (parent, { businessId }, context) => {
      if (context.user) {
        const business = await Business.findOne({
          _id: businessId
        })
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { businesses: business._id } }
        );
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { businessId, commentText }, context) => {
      if (context.user) {
        return Business.findOneAndUpdate(
          { _id: businessId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }, 
    removeComment: async (parent, { businessId, commentId }, context) => {
      if (context.user) {
        return Business.findOneAndUpdate(
          { _id: businessId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
}

module.exports = resolvers;