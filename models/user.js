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
        const regex = /https*:\/\/[0-9A-z[\]@!$&'()*+,;=\-._~:/?#]+/;
        return regex.test(v);
      },
      message: 'Ввод неверен',
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
