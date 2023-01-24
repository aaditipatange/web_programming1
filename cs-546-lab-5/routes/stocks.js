const express = require('express');
const router = express.Router();
const data = require('../data');
const stckData = data.stocks;

router.get('/:id', async (req, res) => {
  try {
    const stock = await stckData.getStockById(req.params.id);
    res.json(stock);
  } catch (e) {
    res.status(404).json({ message: 'Stock not found!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listStck = await stckData.getStocks();
    res.json(listStck);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

module.exports = router;