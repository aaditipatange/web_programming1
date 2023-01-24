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
    if(!personId){
      throw "Please enter ID, Input is Required";
    }
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

async function sameStreet(streetName, streetSuffix)
{
//Error Handeling
    if (!streetName || !streetSuffix){
      throw "Input parameters are Required, Please enter valid StreetName and StreetSuffix.";
    }
    if(typeof streetName !== 'string' || typeof streetSuffix !== 'string'){
      throw "Input parameters need to be String.";
    }
    if(streetSuffix.trim().length === 0 || streetName.trim().length === 0){
      throw "Empty string cannot be passed as input parameters.";
    }

//Variables
  let axiosCallPeopleData = await getPeople();
  let objArray = [];

//Identify all people that live/work on the Street Name and Street Suffix provided
    for (let person of axiosCallPeopleData) { 
        let nameOfHomeStreet = person.address.home.street_name;
        let nameOfHomeSuffix = person.address.home.street_suffix;
        let nameOfWorkStreet = person.address.work.street_name;
        let nameOfWorkSuffix = person.address.work.street_suffix;
//To lower Case for making the Input Case insensitive
      if((nameOfHomeStreet.toLowerCase() === streetName.toLowerCase() && nameOfHomeSuffix.toLowerCase() === streetSuffix.toLowerCase())||
  (nameOfWorkStreet.toLowerCase() === streetName.toLowerCase() && nameOfWorkSuffix.toLowerCase() === streetSuffix.toLowerCase())){
          objArray.push(person);
      }
    }

//Checking Return Array length to indentify the count of people on the provided Street
      if(objArray.length > 1){
         return objArray;
      }
      if (objArray.length === 1){ //Only one person found on the Street
         throw "There aren't any people living on the same street for the given Street Name and Street Suffix";
      }
      else {
         throw "The provided Street Name and Street Suffix does not exist in the data set.";
      }
}

async function manipulateSsn(){
//Error Handeling
    if(arguments.length>0){
       throw "Arguments cannot be passed for this function.";
    }

//Variables
    let axiosCallPeopleData = await getPeople();
    let allSSN = [];
    let ssnObj = {};
    let avgSSNofDataSet = 0;

//Getting all SSN related data for Manipulation
    for (let element of axiosCallPeopleData) {
        let modifiedSSN = element.ssn;
        modifiedSSN = modifiedSSN.split('-').join('');
        modifiedSSN = modifiedSSN.split('').sort().join('');
        modifiedSSN = Number(modifiedSSN)
        allSSN.push(modifiedSSN);
    }

  let sortedSSN = allSSN.map((ele)=>ele);
  sortedSSN.sort((a, b) => a - b);
  let lowSSNindex = allSSN.indexOf(sortedSSN[0]);
  let highSSNindex = allSSN.indexOf(sortedSSN[sortedSSN.length-1]);
  let lfirstName = axiosCallPeopleData[lowSSNindex].first_name;
  let llastName = axiosCallPeopleData[lowSSNindex].last_name;
  let hfirstName = axiosCallPeopleData[highSSNindex].first_name;
  let hlastName = axiosCallPeopleData[highSSNindex].last_name;
  let highest = {'firstName' : hfirstName, 'lastName': hlastName};
  let lowest = {'firstName' : lfirstName, 'lastName': llastName};


    for(let ele=0; ele<allSSN.length; ele++){
       avgSSNofDataSet += allSSN[ele];
    }

    avgSSNofDataSet /= allSSN.length;
    ssnObj.highest = highest;
    ssnObj.lowest = lowest;
    ssnObj.average = Math.floor(avgSSNofDataSet);
    return ssnObj;
}

async function sameBirthday(month, day)
{
//Error Handeling
    if(!month || !day){
      throw "Input parameters are Required, Please enter valid Month and Day.";
    }
    if(typeof month === 'number'|| typeof month ==='string'){
      if(typeof month === 'string'){
        month = parseInt(month,10); //Convert String to Number
        if(isNaN(month)){
          throw "Please enter a number for month between 1 and 12, other input types cannot be passed.";
        }
      }
      if(month>12 || month<1){
        throw "Please enter a valid month between 1 and 12.";
      }
    }

    if(!(typeof month === 'number'|| typeof month === 'string')){
      throw "Only number and string between 1 and 12 can be passed for month.";
    }

    if(typeof day === 'number'|| typeof day === 'string'){
      if(typeof day === 'string'){
        day = parseInt(day,10); //Convert String to Number
          if(isNaN(day)){
            throw "Please enter valid day.";
          }
      }
      if(day<1){
        throw "Please enter a valid day, Day Out of bound.";
      }

     else if(month<=12 && month >=1){
        switch(month){
          case 1: 
            if (day>31){
              throw "Invalid Day for January";
            }
          case 2:
            if (day>28){
              throw "Invalid Day for February";
            }
          case 3:
           if (day>31){
              throw "Invalid Day for March";
            }
          case 4:
            if (day>30){
              throw "Invalid Day for April";
            }
          case 5:
            if (day>31){
              throw "Invalid Day for May";
            }
          case 6:
            if (day>30){
              throw "Invalid Day for June";
            }
          case 7:
            if (day>31){
              throw "Invalid Day for July";
            }
          case 8:
            if (day>31){
              throw "Invalid Day for August";
            }
          case 9:
            if (day>30){
              throw "Invalid Day for September";
          }
          case 10:
            if (day>31){
              throw "Invalid Day for October";
            }
          case 11:
            if (day>30){
              throw "Invalid Day for November";
            }
          case 12:
            if (day>31){
              throw "Invalid Day for December";
          }
        }
      }
    }
      if(!(typeof day === 'number'|| typeof day ==='string')){
        throw "Only valid number and string can be passed for Day.";
      }

//Variables
    let sameBirthdayArray =[];
    let axiosCallPeopleData = await getPeople();

//Logic of Same BirthDay function
    for (let val=0;val<axiosCallPeopleData.length;val++){
      let monthCheck = axiosCallPeopleData[val].date_of_birth.split('/')[0];
      let dayCheck = axiosCallPeopleData[val].date_of_birth.split('/')[1];
        if(month == monthCheck && day == dayCheck){
          let PersonFullname =  axiosCallPeopleData[val].first_name.concat(" ", axiosCallPeopleData[val].last_name);
          sameBirthdayArray.push(PersonFullname);
        }
    }

    if(sameBirthdayArray.length>0){
      return sameBirthdayArray;
    }

    else {
      throw "There are no People with given BirthDay.";
    }
}

// async function calls(){
//   try{
//   //console.log(await getPersonById('20035a09-3820-4f49-bb8f-d947cebee537'));
//   //console.log(await sameStreet('hill',123));
//   //console.log(await manipulateSsn());
//   //console.log(await sameBirthday(4,30));
//   }
//   catch (message){
//     console.log(message);
//   }
// }
// calls();

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday
}