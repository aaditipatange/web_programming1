const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

module.exports = {
  //Functions Start here

async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)
{
  //Error Handeling
  if (!name||!location||!phoneNumber||!website||!priceRange||!cuisines||!serviceOptions) {
    throw 'One or more Input parameter missing. Please provide valid input for all fields for Restaurant.';
  }
  if (typeof name !== 'string' || name.trim().length === 0){
    throw 'Please enter Valid (String) Name for Restaurant'; 
  }
  if (typeof location !== 'string' || location.trim().length === 0){
    throw 'Please enter Valid (String) location for Restaurant'; 
  }
  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0){
    throw 'Please enter Valid (String) phone number for Restaurant'; 
  }
  if (typeof website !== 'string' || website.trim().length === 0){
    throw 'Please enter Valid (String) website for Restaurant'; 
  }
  if (typeof priceRange !== 'string' || priceRange.trim().length === 0){
    throw 'Please enter Valid (String) price range for Restaurant'; 
  }
    let restNumber = phoneNumber.split("-");
  if(restNumber.length!==3||
      restNumber[0].length!==3||
      restNumber[1].length!==3||
      restNumber[2].length!==4){
    throw "Invalid Phone Number has been passed.";
  }
    let siteURL = website.split(".");
  if(!(siteURL[0].localeCompare('http://www') === 0) || 
     !(siteURL[siteURL.length-1].localeCompare('com') === 0 ) || 
     siteURL[1].length < 5){
    throw "Please enter a valid Website For the Restaurant";
  }

  if(!(priceRange.localeCompare('$') === 0 ||
    priceRange.localeCompare('$$') === 0 || 
    priceRange.localeCompare('$$$') === 0 || 
    priceRange.localeCompare('$$$$') === 0)){
    throw 'Price Range has to be between "$" and "$$$$" other input cannot be passed.';
  }
    
  if(!Array.isArray(cuisines)|| 
    cuisines.length === 0){
    throw 'Cuisines must be Array with atleast 1 cusine.';
  }

  for (let elements of cuisines) {
    if(typeof elements !== 'string' || 
      elements.trim().length === 0){
        throw 'Cuisine have to be of type String.';
    }
  }

  if(typeof serviceOptions !== 'object'|| 
    Array.isArray(serviceOptions)){
    throw 'Service Options has to be of type Object';
  }
  
  if(Object.keys(serviceOptions).length !== 3){
    throw "Service Option missing."
  }
  for (const key in serviceOptions) {
    if(!(key ==='dineIn')){
      if(!(key ==='takeOut')){
        if(!(key==='delivery')){
      throw 'Service Options require dineIn, takeOut, delivery';
        }
      }
    }
    if(typeof serviceOptions[key] !== 'boolean'){
       throw 'Service Options value have to be Boolean type.';
    }
  }

  //Insert data into Database
    const collectionOfRestaurants = await restaurants();

    let restaurantDetails = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews:[]
    };

    const restaurantInserted = await collectionOfRestaurants.insertOne(restaurantDetails);

    if (restaurantInserted.insertedCount === 0) {
      throw 'Restaurant could not be added';
    }
    let restId = restaurantInserted.insertedId;
    
    //convert ObjectID to String
    restId = restId.toString();

    const restaurant = await this.get(restId);
    return restaurant;
},

async getAll(){
  //Error Handeling
  if(arguments.length!==0){
    throw "Arguments cannot be passed for this function call.";
  }
  //Get list of data in DB
    const collectionOfRestaurants = await restaurants();
    const listOfAllRestaurants = await collectionOfRestaurants.find({},{projection:{_id:1,name:1}}).toArray();
    //convert ObjectID to String
    listOfAllRestaurants.forEach(hotel => {
      let getIndex = hotel._id.toString();
      hotel._id = getIndex;
    });
    return listOfAllRestaurants;
},

async get(id){

  //Error Handeling
    if (!id) {
      throw 'Input Id field is required.';
    }
    
    if(typeof id !=='string'||id.trim().length===0){
      throw 'Id can only be of type String.';
    }

    //Converting String ID to ObjectID
    let objParseID = ObjectId(id);

    const collectionOfRestaurants = await restaurants();
    const hotel = await collectionOfRestaurants.findOne({ _id: objParseID });
    if (!hotel) {
      throw 'Restaurant could not be found with the supplied ID.';
    }
    let getIndex = hotel._id.toString();
    hotel._id = getIndex;
    return hotel;
},

async remove(id){
  //Error Handeling
    if (!id){
      throw 'Input id must be provided.';
    } 

    if(typeof id !=='string'||id.trim().length===0){
      throw new 'Id can only be of type String.';
    }

    //Converting String ID to ObjectID
    let objParseID = ObjectId(id);
    //let delrest = await this.get(id);
    const collectionOfRestaurants = await restaurants();
    //Delete Supplied Data ID object
    const restaurantToBeDeleted = await collectionOfRestaurants.deleteOne({ _id: objParseID });

    if (restaurantToBeDeleted.deletedCount === 0) {
      throw 'Restaurant with the supplied id could not be deleted/ does not Exist.';
    }

    let retObj ={};
    retObj['restaurantId']= id,
    retObj['deleted'] = true
    return retObj;
},

async update (id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){

    if (!id||!name||!location||!phoneNumber||!website||!priceRange||!cuisines||!serviceOptions) {
        throw 'One or more Input parameter missing. Please provide valid input for all fields.';
      }
      if (typeof id !== 'string' || id.trim().length === 0){
        throw 'Please enter Valid (String) Name for Restaurant'; 
      }
      if (typeof name !== 'string' || name.trim().length === 0){
        throw 'Please enter Valid (String) Name for Restaurant'; 
      }
      if (typeof location !== 'string' || location.trim().length === 0){
        throw 'Please enter Valid (String) location for Restaurant'; 
      }
      if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0){
        throw 'Please enter Valid (String) phone number for Restaurant'; 
      }
      if (typeof website !== 'string' || website.trim().length === 0){
        throw 'Please enter Valid (String) website for Restaurant'; 
      }
      if (typeof priceRange !== 'string' || priceRange.trim().length === 0){
        throw 'Please enter Valid (String) price range for Restaurant'; 
      }
        let restNumber = phoneNumber.split("-");
      if(restNumber.length!==3||
          restNumber[0].length!==3||
          restNumber[1].length!==3||
          restNumber[2].length!==4){
        throw "Invalid Phone Number has been passed.";
      }
        let siteURL = website.split(".");
      if(!(siteURL[0].localeCompare('http://www') === 0) || 
         !(siteURL[siteURL.length-1].localeCompare('com') === 0 ) || 
         siteURL[1].length < 5){
        throw "Please enter a valid Website For the Restaurant";
      }
    
      if(!(priceRange.localeCompare('$') === 0 ||
        priceRange.localeCompare('$$') === 0 || 
        priceRange.localeCompare('$$$') === 0 || 
        priceRange.localeCompare('$$$$') === 0)){
        throw 'Price Range has to be between "$" and "$$$$" other input cannot be passed.';
      }
        
      if(!Array.isArray(cuisines)|| 
        cuisines.length === 0){
        throw 'Cuisines must be Array with atleast 1 cusine.';
      }
    
      for (let elements of cuisines) {
        if(typeof elements !== 'string' || 
          elements.trim().length === 0){
            throw 'Cuisine have to be of type String.';
        }
      }
    
      if(typeof serviceOptions !== 'object'|| 
        Array.isArray(serviceOptions)){
        throw 'Service Options has to be of type Object';
      }
    //let keyLen = Object.keys(serviceOptions).length; //Object.keys(element).length 
      if(Object.keys(serviceOptions).length !== 3){
        throw "Service Option missing."
      }

      for (const key in serviceOptions) {
          if(!(key ==='dineIn')){
            if(!(key ==='takeOut')){
              if(!(key==='delivery')){
            throw 'Service Options require dineIn, takeOut, delivery';
              }
            }
          }
          if(typeof serviceOptions[key] !== 'boolean'){
           throw 'Service Options value have to be Boolean type.';
        }
      }

      const fieldValOfRest = await this.get(id);
      if(!fieldValOfRest) throw 'Restaurant does not exist.';
      //Update Data
    const collectionOfRestaurants = await restaurants();
    const updateAllRest = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        serviceOptions: serviceOptions,
        overallRating: fieldValOfRest.overallRating,
        reviews: fieldValOfRest.reviews
    };
    let objParseID = ObjectId(id);
    const restDataUpdate = await collectionOfRestaurants.updateOne(
      { _id: objParseID },
      { $set: updateAllRest }
    );
    if (restDataUpdate.modifiedCount === 0) {
      throw 'Restaurant details could not be updated.';
    }
    return await this.get(id);
    
}
};
