const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => res.status(404).send({ message: 'Карточки не найдены' }))
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => res.status(404).send({ message: 'Карточка не найдена' }))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(404).send({ message: 'Карточка не найдена' }))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(404).send({ message: 'Карточка не найдена' }))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный запрос' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};
