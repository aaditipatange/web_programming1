const express = require('express');
const router = express.Router();
const data = require('../data');
const revData = data.reviews;
const restData = data.restaurants;

router.get('/review/:id', async (req, res) => {
    try {
      const revId = await revData.get(req.params.id);
      res.status(200).json(revId);
    } catch (e) {
      res.status(404).json({ message: 'Review not found' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const listRev = await revData.getAll(req.params.id);
      res.status(200).json(listRev);
    }catch (e) {
      res.status(404).json({ error: e });
      return;
    }
  });

  router.post('/:id', async (req, res) => {
    const revDataList = req.body;  //restaurantId, title, reviewer, rating, dateOfReview, review
    if (!revDataList.title) {
      res.status(400).json({ error: 'You must title for the review.' });
      return;
    }
    if (!revDataList.reviewer) {
      res.status(400).json({ error: 'You must reviewer for the review.' });
      return;
    }
    if (!revDataList.rating) {
      res.status(400).json({ error: 'You must rating for the review.' });
      return;
    }
    if (!revDataList.dateOfReview) {
        res.status(400).json({ error: 'You must dateOfReview for the review.' });
        return;
      }
      if (!revDataList.review) {
        res.status(400).json({ error: 'You must review for the review.' });
        return;
      }
     
      try {
        await restData.get(req.params.id);
      } catch (e) {
        res.status(400).json({ error: 'Restaurant not found' });
        return;
      }
    try {
      const { title, reviewer, rating, dateOfReview, review} = revDataList;
      const newRest = await revData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
      res.json(newRest);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({ error: 'You must Supply and ID to delete' });
      return;
    }
    try {
      await revData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    try {
      const delrev = await revData.remove(req.params.id);
      res.status(200).json(delrev);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  module.exports = router;