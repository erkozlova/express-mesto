const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/cards', (req, res) => {
  fs.readFile(path.join('data', 'cards.json'), (err, cards) => {
    if (err) {
      res.status(500).send({ message: 'Ошибки при считывании файла' });
      return;
    }

    const cardsObj = JSON.parse(cards);

    res.json(cardsObj);
  });
});

module.exports = router;
