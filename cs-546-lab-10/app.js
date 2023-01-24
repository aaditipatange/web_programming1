const express = require('express');
const session = require('express-session');
const app = express();

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(async (req, res, next) => {
let date = new Date().toUTCString()
let method = req.method
let path = req.originalUrl
let auth;
  if(req.session.user == "" || req.session.user == undefined || req.session.user.length == 0)
  {
    auth = "(Non-Authenticated User)"
  }
  else auth = "(Authenticated User)"
  console.log(`[${date}]: `, method, path, auth); 
  next();
});

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('user/error',{title:'Error'});
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});