const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters;

router.get('/:id', async (req, res) => {
  try {
    const char = await charData.getCharacterId(req.params.id);
    res.render('characters/char', { char: char ,title:char.data.results[0].name});
  } catch (e) {
    res.status(404).render('characters/retResponse',{error:'Character Not found',title:'Character Not Found'});
  }
});
 module.exports = router;