const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(?:[a-z0-9-_/]+\.)+[a-z0-9_-]+([a-zA-Z0-9-/?#[\]@!$&'()*+,;=_~:.]+)?$/;
        return regex.test(v);
      },
      message: 'Ввод неверен',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
