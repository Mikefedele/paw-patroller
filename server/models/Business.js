const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  yelpId: {
    type: String,
  },
  url: {
    type: String,
  },
  location: {
    type: String,
  },
  imgUrl: {
    type: String
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Business = model('Business', businessSchema);

module.exports = Business;
