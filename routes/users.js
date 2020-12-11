const router = require('express').Router();
const fs = require('fs');

router.get('/users', (req, res) => {
  fs.readFile('./data/users.json', (err, users) => {
    if (err) {
      res.send({ message: 'Ошибки при считывании файла' });
      return;
    }

    res.send(users);
  });
});

router.get('/users/:id', (req, res) => {
  fs.readFile('./data/users.json', (err, users) => {
    if (err) {
      res.send({ message: 'Ошибки при считывании файла' });
      return;
    }

    const user = JSON.parse(users).filter((item) => item._id === req.params.id)[0];

    if (!user) {
      res.status(404);
      res.send({ message: 'Нет пользователя с таким id' });

      return;
    }

    res.send(user);
  });
});

module.exports = router;
