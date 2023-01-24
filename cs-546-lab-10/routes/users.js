const express = require('express');
const router = express.Router();
const userData = require('../data/users');

router.get('/', async (request, response) => {
  if(request.session.user){
    response.redirect('/private');
  }
   else{
    response.render('user/login', {title:'Login'});
  }
});

router.get('/signup', async (request, response) => {
  if(request.session.user){
    response.redirect('/private');
  }
   else{
    response.render('user/signup', {title:'Signup'});
  }
});

router.post('/signup', async (request, response) => {
  if(!request.body.username||!request.body.password){
    response.status(400).render('user/signup',{title:'Signup',error: 'Username and Password must be passed'});
     return;
  }
  if(/\s/g.test(request.body.username)){
    response.status(400).render('user/signup',{title:'Signup',error: 'Username cannot contain spaces!!'}) ;
     return;
  }
    if (!request.body.username.toLowerCase().match(/^[0-9a-z]+$/)){
      response.status(400).render('user/signup',{title:'Signup',error: 'Username cannot contain Special Characters.'}) ;
        return;
    }
    if(request.body.username.length<4){
      response.status(400).render('user/signup',{title:'Signup',error: 'Username must be atleast 4 characters long.'}) ;
       return;
    }
    if(/\s/g.test(request.body.password)){
      response.status(400).render('user/signup',{title:'Signup',error: 'Password cannot contain spaces!!'}) ;
       return;
    }
    if(request.body.password.length<6){
      response.status(400).render('user/signup',{title:'Signup',error: 'Password must be atleast 6 characters long.'}) ;
       return;
    }
try{
    const user = await userData.createUser(request.body.username.toLowerCase(),request.body.password);
    if(user['userInserted']){
      response.redirect('/')
    }
    else{
      response.status(500).json({error:'Internal Server Error'});
    }
  }catch(e){
    response.status(400).render('user/signup',{title:'Signup',error: e});
  } 
   });

router.post('/login', async (request, response) => {
  if(!request.body.username||!request.body.password){
    response.status(400).render('user/login',{title:'Login',error: 'Username and Password must be passed'});
    return;
  }
  if(/\s/g.test(request.body.username)){
    response.status(400).render('user/login',{title:'Login',error: 'Username cannot contain spaces!!'}) ;
     return
  }
    if (!request.body.username.toLowerCase().match(/^[0-9a-z]+$/)){
      response.status(400).render('user/login',{title:'Login',error: 'Username cannot contain Special Characters.'}) ;
       return
    }
    if(request.body.username.length<4){
      response.status(400).render('user/login',{title:'Login',error: 'Username must be atleast 4 characters long.'}) ;
       return
    }
    if(/\s/g.test(request.body.password)){
      response.status(400).render('user/login',{title:'Login',error: 'Password cannot contain spaces!!'}) ;
       return
    }
    if(request.body.password.length<6){
      response.status(400).render('user/login',{title:'Login',error: 'Password must be atleast 6 characters long.'}) ;
       return
    }

  try{
      const user = await userData.checkUser(request.body.username.toLowerCase(),request.body.password);
    if(user['authenticated']){
      request.session.user = { username: request.body.username.toLowerCase() }
      response.redirect('/private')
    }
  }catch(e){
    response.status(400).render('user/login',{title:'Login',error: e});
    }
});

router.get('/private', async (request, response) => {
  response.render('user/private', {username:request.session.user['username'].toLowerCase(),title:'Private'});
  });

router.get('/logout', async (request, response) => {
  request.session.destroy();
  response.clearCookie('AuthCookie');
  response.render("user/logout",{title:'Logout'});
});

module.exports = router;