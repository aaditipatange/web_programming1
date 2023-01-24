const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const restaurantsFunc = require('./restaurants');
let { ObjectId } = require('mongodb');

module.exports = {
async create(restaurantId, title, reviewer, rating, dateOfReview, review){
      if (!restaurantId||!title||!reviewer||!rating||!dateOfReview||!review) {
        throw 'One or more Input parameter missing. Please provide valid input for all fields of Review.';
      }
      if (typeof restaurantId !== 'string' || restaurantId.trim().length === 0){
        throw 'Please enter Valid (String) Restaurant ID.'; 
      }
      if (typeof title !== 'string' || title.trim().length === 0){
        throw 'Please enter Valid (String) Review Title.'; 
      }
      if (typeof reviewer !== 'string' || reviewer.trim().length === 0){
        throw 'Please enter Valid (String) Name for Reviewer.'; 
      }
      if (typeof dateOfReview !== 'string' || dateOfReview.trim().length === 0){
        throw 'Please enter Valid (String) Date for Review.'; 
      }
      if (typeof review !== 'string' || review.trim().length === 0){
        throw 'Please enter Valid (String) Review.'; 
      }

      if(typeof rating !== 'number'|| 
      rating > 5 || 
      rating < 1){
      throw "Rating can only be between 1-5.";
  }

  let todayDate = new Date();
  todayDate = todayDate.toDateString();
  if(!new Date(dateOfReview)){
   throw "Invalid Date has been inputed";
  }
 let stringDate = new Date(dateOfReview);
 stringDate = stringDate.toDateString();
  if(stringDate.localeCompare(todayDate)!==0){
   throw "Only current date can be supplied.";
  }

  let objParseID = ObjectId(restaurantId);
    const restaurant = await restaurantsFunc.get(restaurantId);
    if(!restaurant) throw 'Restaurant does not exist.'
    let newRev = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review,
      };
      let rate = 0;
      let overallRate = 0;
      if(restaurant.reviews.length>0){
        let ratingArray = restaurant.reviews;
      ratingArray.forEach(element => {  
          let eleRate = element.rating; 
           rate += eleRate
      });
      overallRate = (rate+rating)/(ratingArray.length + 1);
    }
    else {
      overallRate = rating;
    }  
      restaurant.reviews.push(newRev);
      const ratingUpdated = {
        overallRating: overallRate,
        reviews: restaurant.reviews
      };
      
      const collectionOfRestaurants = await restaurants();
      const restaurantInserted = await collectionOfRestaurants.updateOne(
        { _id: objParseID },
        { $set: ratingUpdated }
      );
      if (restaurantInserted.modifiedCount === 0) {
        throw 'Review could not be added';
      }
    const getRest = await restaurantsFunc.get(restaurantId)
    if(!getRest) throw 'Restaurant does not exist';
    getRest.reviews.forEach(hotel => {
      let getIndex = hotel._id.toString();
      hotel._id = getIndex;
    });

    return getRest;
    //return listOfAllRestaurants;
    //return this.get(newRev._id.toString());
    //return restaurantsFunc.get(restaurantId);
},

async getAll(restaurantId){
    if (!restaurantId) {
        throw 'Restaurant ID is required input field.';
      }
      if (typeof restaurantId !== 'string' || restaurantId.trim().length === 0){
        throw 'Please enter Valid (String) Reataurant ID'; 
      }

    const restaurant = await restaurantsFunc.get(restaurantId)
    if(!restaurant) throw 'Restaurant does not exist';
    if(restaurant.reviews.length>0){
    restaurant.reviews.forEach(hotel => {
      let getIndex = hotel._id.toString();
      hotel._id = getIndex;
    });
    return restaurant.reviews;
  }
    else{
      throw 'No reviews for this Restaurant.'
    }
    
},

async get(reviewId){
    if (!reviewId) {
        throw 'Review ID is required input field.';
      }
      if (typeof reviewId !== 'string' || reviewId.trim().length === 0){
        throw 'Please enter Valid (String) Review ID'; 
      }
      let review =[];
      let objParseID = ObjectId(reviewId);
      const revCollection = await restaurants();
      const rest = await revCollection.findOne({'reviews._id': objParseID});
      if (!rest) throw 'Review not found';
      rest.reviews.forEach(hotel => {
        let getIndex = hotel._id.toString();
        if(getIndex===reviewId){
        hotel._id = getIndex;
      review.push(hotel);
      }
      });
    //if (!review) throw 'Review not found';
    return review[0];
},

async remove(reviewId){
    if (!reviewId) {
        throw 'Review ID is required input field.';
      }
      if (typeof reviewId !== 'string' || reviewId.trim().length === 0){
        throw 'Please enter Valid (String) Review ID'; 
      }
     const revCollection = await restaurants();
    let objParseID = ObjectId(reviewId);
    const deletionRestRev = await revCollection.findOne({ 'reviews._id': objParseID });
    if (!deletionRestRev) {
      throw `Could not delete review with id of ${reviewId}`;
    }

    let rate = 0;
      let overallRate = 0;
      if(deletionRestRev.reviews.length>0){
        let ratingArray = deletionRestRev.reviews;
      ratingArray.forEach(element => { 
        let getIndex = element._id.toString();
      if(!(getIndex===reviewId)){ 
          let eleRate = element.rating; 
           rate += eleRate
      }
      });
      if(deletionRestRev.reviews.length == 1){
        overallRate = rate/(ratingArray.length);
      }
      else{
      overallRate = rate/(ratingArray.length-1);
      }
    }
     
    const ratingUpdated = {
      overallRating: overallRate,
    };
    const restDetails = await revCollection.updateOne({ _id: deletionRestRev._id }, { $set: ratingUpdated , $pull: { reviews: { _id: objParseID } } })
    
    if (restDetails.modifiedCount === 0) {
      throw 'Restaurant review could not be Deleted.';
    }

    const hotelRet = await restaurantsFunc.get(deletionRestRev._id.toString());
    hotelRet.reviews.forEach(hotel => {
      let getIndex = hotel._id.toString();
      hotel._id = getIndex;
    });

    let retObj ={};
    retObj['reviewId']= reviewId,
    retObj['deleted']= true
    return retObj;   
}
};
