const express = require('express');
const router = express.Router();
const data = require('../data');
const restData = data.restaurants;

router.get('/:id', async (req, res) => {
  try {
    const hotel = await restData.get(req.params.id);
    res.status(200).json(hotel);
  } catch (e) {
    res.status(404).json({error : 'Restaurant not found.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const listRest = await restData.getAll();
    res.status(200).json(listRest);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
    const restDataList = req.body;
    if (!restDataList.name) {
      res.status(400).json({ error: 'You must provide Name of Restaurant' });
      return;
    }
    if (!restDataList.location) {
      res.status(400).json({ error: 'You must provide Location of Restaurant' });
      return;
    }
    if (!restDataList.phoneNumber) {
      res.status(400).json({ error: 'You must provide Phone Number of Restaurant' });
      return;
    }
    if (!restDataList.website) {
        res.status(400).json({ error: 'You must provide Website of Restaurant' });
        return;
      }
      if (!restDataList.priceRange) {
        res.status(400).json({ error: 'You must provide PriceRange of Restaurant' });
        return;
      }
      if (!restDataList.cuisines) {
        res.status(400).json({ error: 'You must provide Cuisines of Restaurant' });
        return;
      }
      if (!restDataList.serviceOptions) {
        res.status(400).json({ error: 'You must provide Serviceoptions of Restaurant' });
        return;
      }
    try {
      const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = restDataList;
      const newRest = await restData.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
      res.status(200).json(newRest);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
  
  router.put('/:id', async (req, res) => {
    const updatedData = req.body;  //id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions
    if (!updatedData.name || !updatedData.location || !updatedData.phoneNumber || !updatedData.website || !updatedData.priceRange ||
        !updatedData.cuisines || !updatedData.serviceOptions) {
      res.status(400).json({ error: 'You must Supply All fields' });
      return;
    }
    try {
      await restData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
  
    try {
      const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = updatedData;
      const updatedRest = await restData.update(req.params.id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
      res.status(200).json(updatedRest);
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
      await restData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    try {
      const delrest = await restData.remove(req.params.id);
      res.status(200).json(delrest);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

module.exports = router;