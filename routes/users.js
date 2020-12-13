const router = require('express').Router();
const fs = require('fs');

router.get('/users', (req, res) => {
  fs.readFile('./data/users.json', (err, users) => {
    if (err) {
      res.status(500).send({ message: 'Ошибки при считывании файла' });
      return;
    }

    const usersObj = JSON.parse(users);

    res.json(usersObj);
  });
});

router.get('/users/:id', (req, res) => {
  fs.readFile('./data/users.json', (err, users) => {
    if (err) {
      res.status(500).send({ message: 'Ошибки при считывании файла' });
      return;
    }

    const user = JSON.parse(users).filter((item) => item._id === req.params.id)[0];

    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });

      return;
    }

    res.json(user);
  });
});

module.exports = router;
