const router = require('express').Router();
const fs = require('fs');

router.get('/cards', (req, res) => {
  fs.readFile('./data/cards.json', (err, cards) => {
    if (err) {
      res.send({ message: 'Ошибки при считывании файла' });
      return;
    }

    res.send(cards);
  });
});

module.exports = router;
