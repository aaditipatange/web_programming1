const express = require('express');
const app = express();
const configRoutes = require('./routes');

//const routeFile = require('./routes');
const dataFile = require('./data');

app.use(express.json());
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});