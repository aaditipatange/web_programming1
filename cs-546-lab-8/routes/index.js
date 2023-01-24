const charsRoutes = require('./characters');
const searchRoutes = require('./search');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/characters', charsRoutes);
  app.use('/search', searchRoutes);
  app.get('/', (req, res) => {
  res.sendFile(path.resolve('static/about.html'));
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;