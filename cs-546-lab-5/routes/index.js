const pplRoutes = require('./people');
const stkRoutes = require('./stocks');

const constructorMethod = (webApp) => {
    webApp.use('/people', pplRoutes);
    webApp.use('/stocks', stkRoutes);

    webApp.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;