const path = require('path');

const constructorMethod = (app) => {
  app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/html/home.html'));
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;