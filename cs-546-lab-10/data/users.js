const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;

module.exports = {
  //Functions Start here

async createUser(username, password){
  //Error Handelling
  if (!username||!password) {
        throw 'Username and Password are REQUIRED.';
      }
  if(/\s/g.test(username)){
    throw 'Username cannot contain spaces!!';
  }
  if (!username.toLowerCase().match(/^[0-9a-z]+$/)){
    throw 'Username cannot contain Special Characters.';
  }
  if(username.length<4){
    throw 'Username must be atleast 4 characters long.'
  }
  const collectionOfUsers = await users();
  const user = await collectionOfUsers.findOne({ username: username.toLowerCase() });
  if (user) {
    throw 'Username already exists. Please try again with a different username.';
  }
  if(/\s/g.test(password)){
    throw 'Password cannot contain spaces!!';
  }
  if(password.length<6){
    throw 'Password must be atleast 6 characters long.'
  }
  
//Data insertion in DB
  const hash = await bcrypt.hash(password, saltRounds);

    let userDetails = {
        username:username.toLowerCase(),
        password:hash
    };

    const userInserted = await collectionOfUsers.insertOne(userDetails);

    if (userInserted.insertedCount === 0) {
      throw 'User could not be added';
    }else{
      let retObj = {}
      retObj['userInserted']= true;
      return retObj;
    }
  
},

async checkUser(username, password){
//Error Handelling
if (!username||!password) {
  throw 'Username and Password are REQUIRED.';
}
if(/\s/g.test(username)){
throw 'Username cannot contain spaces!!';
}
if (!username.toLowerCase().match(/^[0-9a-z]+$/)){
throw 'Username cannot contain Special Characters.';
}
if(username.length<4){
throw 'Username must be atleast 4 characters long.'
}
if(/\s/g.test(password)){
throw 'Password cannot contain spaces!!';
}
if(password.length<6){
throw 'Password must be atleast 6 characters long.'
}
//Check user in DB
const collectionOfUsers = await users();
const user = await collectionOfUsers.findOne({ username: username.toLowerCase()});
  if (!user) {
    throw 'Either the username or password is invalid';
  }else{
    if(await bcrypt.compare(password, user.password)){
      let retObj = {}
      retObj['authenticated']= true;
      return retObj;
    }
    else{
      throw 'Either the username or password is invalid';
    } 
  }
}
};
