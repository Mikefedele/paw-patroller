const { AuthenticationError } = require('apollo-server-express');
const { User, Business } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      console.log('got to user query')
      return User.findOne({ username }).populate('businesses');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('businesses');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    businesses: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Business.find(params);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args.username, args.email, args.password);
      const user = await User.create({ username: args.username, email: args.email, password: args.password });
      const token = signToken(user);

      console.log(user);
      return {token, user };
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
    addBusiness: async (parent, { name, yelpId, url, location, imgUrl }, context) => {
      console.log('got to addBusiness mutation')
      if (context.user) {
        let business = await Business.findOne({yelpId})
        if(!business) {
          business = await Business.create({
            name, yelpId, url, location, imgUrl
          });
        } 
        console.log(business);

        await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { businesses: business._id } },
          {new: true},
        );

        return business;
      }
      throw new AuthenticationError('You need to be logged in!');
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

        return business;
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