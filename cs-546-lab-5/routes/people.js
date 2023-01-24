const express = require('express');
const router = express.Router();
const data = require('../data');
const pplData = data.people;

router.get('/:id', async (req, res) => {
  try {
    const person = await pplData.getPersonById(req.params.id);
    res.json(person);
  } catch (e) {
    res.status(404).json({ message: 'Person not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listPpl = await pplData.getPeople();
    res.json(listPpl);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;