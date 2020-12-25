const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => res.status(404).send({ message: 'Пользователи не найдены' }))
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.undateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};
