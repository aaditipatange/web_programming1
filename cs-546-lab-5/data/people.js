const axios = require('axios');
require('util').inspect.defaultOptions.depth = null;

async function getPeople()
{
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async function getPersonById(personId)
{
//Variables
  let arrayOfPersonID = [];
  let axiosCallPeopleData = await getPeople(); // get people data

//Error Handeling 
    // if(!personId){
    //   throw "Please enter ID, Input is Required";
    // }
    if(!(typeof personId === 'string')){
      throw "Input ID must be a String.";
    }
    if(personId.trim().length === 0){
      throw "Empty string cannot be passed as ID";
    }
    for (let obj of axiosCallPeopleData) {
      arrayOfPersonID.push(obj.id);
    }
    for (let ind = 0; ind < arrayOfPersonID.length; ind++){
      if(arrayOfPersonID[ind] === personId){
        break;
      }
    if(ind === arrayOfPersonID.length - 1){
      throw "Person not found.";
      }
    }

//Compare each person obj with provided ID in people Data Set
    for (let peopleObj of axiosCallPeopleData) {
      if(peopleObj.id === personId){
        return peopleObj;
      }   
    }
}

module.exports={
    getPeople,
    getPersonById
};