const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

module.exports = {
  //Functions Start here

async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions)
{
  //Error Handeling
  if (!name||!location||!phoneNumber||!website||!priceRange||!cuisines||!overallRating||!serviceOptions) {
    throw new Error('One or more Input parameter missing. Please provide valid input for all fields.');
  }
  if (typeof name !== 'string' || name.trim().length === 0){
    throw new Error('Please enter Valid (String) Name for Restaurant'); 
  }
  if (typeof location !== 'string' || location.trim().length === 0){
    throw new Error('Please enter Valid (String) location for Restaurant'); 
  }
  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0){
    throw new Error ('Please enter Valid (String) phone number for Restaurant'); 
  }
  if (typeof website !== 'string' || website.trim().length === 0){
    throw new Error('Please enter Valid (String) website for Restaurant'); 
  }
  if (typeof priceRange !== 'string' || priceRange.trim().length === 0){
    throw new Error('Please enter Valid (String) price range for Restaurant'); 
  }
    let restNumber = phoneNumber.split("-");
  if(restNumber.length!==3||
      restNumber[0].length!==3||
      restNumber[1].length!==3||
      restNumber[2].length!==4){
    throw new Error ("Invalid Phone Number has been passed.");
  }
    let siteURL = website.split(".");
  if(!(siteURL[0].localeCompare('http://www') === 0) || 
     !(siteURL[siteURL.length-1].localeCompare('com') === 0 ) || 
     siteURL[1].length < 5){
    throw new Error ("Please enter a valid Website For the Restaurant");
  }

  if(!(priceRange.localeCompare('$') === 0 ||
    priceRange.localeCompare('$$') === 0 || 
    priceRange.localeCompare('$$$') === 0 || 
    priceRange.localeCompare('$$$$') === 0)){
    throw new Error('Price Range has to be between "$" and "$$$$" other input cannot be passed.');
  }
    
  if(!Array.isArray(cuisines)|| 
    cuisines.length === 0){
    throw new Error('Cuisines must be Array with atleast 1 cusine.');
  }

  for (let elements of cuisines) {
    if(typeof elements !== 'string' || 
      elements.trim().length === 0){
        throw new Error('Cuisine have to be of type String.');
    }
  }

  if(typeof serviceOptions !== 'object'|| 
    Array.isArray(serviceOptions)){
    throw new Error ('Service Options has to be of type Object');
  }

  for (const key in serviceOptions) {
    if(typeof serviceOptions[key] !== 'boolean'){
       throw new Error('Service Options value have to be Boolean type.');
    }
  }

  if(typeof overallRating !== 'number'|| 
    overallRating > 5 || 
    overallRating < 0){
    throw new Error("Overall Rating can only be between 0-5.")
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
        overallRating: overallRating,
        serviceOptions: serviceOptions 
    };

    const restaurantInserted = await collectionOfRestaurants.insertOne(restaurantDetails);

    if (restaurantInserted.insertedCount === 0) {
      throw new Error('Restaurant could not be added');
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
    throw new Error("Arguments cannot be passed for this function call.");
  }

  //Get list of data in DB
  
    const collectionOfRestaurants = await restaurants();
  
    const listOfAllRestaurants = await collectionOfRestaurants.find({}).toArray();
  
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
      throw new Error('Input Id field is required.');
    }
    
    if(typeof id !=='string'||id.trim().length===0){
      throw new Error('Id can only be of type String.');
    }

    //Converting String ID to ObjectID
    let objParseID = ObjectId(id);

    const collectionOfRestaurants = await restaurants();
    const hotel = await collectionOfRestaurants.findOne({ _id: objParseID });
    if (hotel === null) {
      throw new Error('Restaurant could not be found with the supplied ID.');
    }
    let getIndex = hotel._id.toString();
    hotel._id = getIndex;
    return hotel;
},

async remove(id){
  //Error Handeling
    if (!id){
      throw new Error('Input id must be provided.');
    } 

    if(typeof id !=='string'||id.trim().length===0){
      throw new Error('Id can only be of type String.');
    }

    //Converting String ID to ObjectID
    let objParseID = ObjectId(id);
    let delrest = await this.get(id);
    const collectionOfRestaurants = await restaurants();
    //Delete Supplied Data ID object
    const restaurantToBeDeleted = await collectionOfRestaurants.deleteOne({ _id: objParseID });

    if (restaurantToBeDeleted.deletedCount === 0) {
      throw new Error('Restaurant with the supplied id could not be deleted/ does not Exist.');
    }
    return `${delrest.name} has been successfully deleted!`;
},

async rename(id, newWebsite){
  //Error Handeling
    if (!id|| ! newWebsite){
       throw new Error('Input parameters are Required. Please pass valid id and updated Website.');
    }

    if(typeof id !=='string'||id.trim().length===0){
      throw new Error('Id can only be of type String.');
    }

  //Converting String ID to ObjectID
    let objParseID = ObjectId(id);
    let renameRest = await this.get(id);

    if(typeof newWebsite !=='string'||newWebsite.trim().length===0){
      throw new Error('Id can only be of type String.');
    }

    let siteURL = newWebsite.split(".");
    if(!(siteURL[0].localeCompare('http://www') === 0) || !(siteURL[siteURL.length-1].localeCompare('com') === 0 ) || 
    siteURL[1].length < 5){
      throw new Error("Please enter a valid Website for the Restaurant");
    }

    if(renameRest.website === newWebsite){
      throw new Error('New website value is same as stored value.');
    }

    //Update Data
    const collectionOfRestaurants = await restaurants();
    const webUpdated = {
      website: newWebsite
    };

    const webUpdateInfo = await collectionOfRestaurants.updateOne(
      { _id: objParseID },
      { $set: webUpdated }
    );
    if (webUpdateInfo.modifiedCount === 0) {
      throw new Error('Restaurant website could not be updated.');
    }
    return await this.get(id);
}
};