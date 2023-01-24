const restRoutes = require('./restaurants');
const revRoutes = require('./reviews');

const constructorMethod = (app) => {
  app.use('/restaurants', restRoutes);
  app.use('/reviews', revRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;