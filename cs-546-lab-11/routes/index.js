const constructorMethod = (app) => {

  app.get('/', function (request, response) {
    response.render('home', {
      pageTitle: 'Show Buzz',
    });
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;