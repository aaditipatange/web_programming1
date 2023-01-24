const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;

router.post('/', async (req, res) => {
  let searchChar = req.body;

  // if (!searchChar.searchTerm) {
  //   throw res.status(400).render('characters/retResponse',{error:'No search term provided', title:'Search Error'});
  // }

  try {
    const searchedChar = await searchData.getSearchResult(searchChar.searchTerm);
    res.render('characters/search',{searchedChar:searchedChar, header:searchChar.searchTerm, title:'Characters Found'});
  } catch (e) {
    res.status(400).render('characters/retResponse',{error:e, title:'Search Error'});
  }
});
 module.exports = router;