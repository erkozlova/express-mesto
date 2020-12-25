const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
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
});

module.exports = mongoose.model('user', userSchema);
