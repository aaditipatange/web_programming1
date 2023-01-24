const axios = require('axios');
require('util').inspect.defaultOptions.depth = null;

async function getPeople()
{
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data;
}

async function getStocks()
{
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}

const listShareholders = async function listShareholders()
{
//Error Handeling
  if(arguments.length>0){
    throw "Arguments cannot be passed for this function.";
  }
//Variables
    let axiosCallPeopleData = await getPeople();
    let axiosCallStocksData = await getStocks();
    let shareHolderListArray = [];
    let shareholdersObj = {};

//Logic for getting all the object of Stocks data
    for (let stocksObj of axiosCallStocksData) {
      let shareholdersArray = [];
        for (const person of stocksObj.shareholders) {
          if(person === null){
            shareholdersArray = [];
          }
          else{
            for(let ppl=0; ppl<axiosCallPeopleData.length; ppl++){
              if(person.userId === axiosCallPeopleData[ppl].id){
                shareholdersObj = {'first_name': axiosCallPeopleData[ppl].first_name, 'last_name': axiosCallPeopleData[ppl].last_name, 'number_of_shares': person.number_of_shares};
                shareholdersArray.push(shareholdersObj);
                }
            }
          }
        }
          delete stocksObj.shareholders;
          stocksObj.shareholders = shareholdersArray;
          shareHolderListArray.push(stocksObj);
    }
  return shareHolderListArray;
}

const topShareholder = async function topShareholder(stockName)
{
//Error Handeling
  if(!stockName){
    throw "Please enter stockName, Input is Required";
  }

  if(!(typeof stockName ==='string')){
    throw "Input must be a String.";
  }

  if(stockName.trim().length===0){
    throw "Empty string cannot be passed as Stock Name.";
  }

//Variables  
    let axiosCallPeopleData = await getPeople();
    let axiosCallStocksData = await getStocks(); 
    let numberOfShare = [];
    let maxShare = 0;
    let returnString = '';
    let shareholdersName = '';

//Logic to get Top Share Holder of a given Stock
    for (let stocks of axiosCallStocksData) {
      if(stocks.stock_name === stockName.trim()){
        if(stocks.shareholders.length === 0){
          returnString = `${stocks.stock_name} currently has no shareholders.`;
          break;
        }
        for (const shareHolder of stocks.shareholders) {
          numberOfShare.push(shareHolder.number_of_shares);
        }
            numberOfShare.sort((a,b)=>b-a);
            maxShare = numberOfShare[0];

          for (let shareHolder of stocks.shareholders) {
            if(shareHolder.number_of_shares === maxShare){
              for(let pt=0; pt<axiosCallPeopleData.length; pt++){
                if(shareHolder.userId === axiosCallPeopleData[pt].id){
                  shareholdersName = axiosCallPeopleData[pt].first_name.concat(' ',axiosCallPeopleData[pt].last_name);
                }
              }
            }
          }

returnString = `With ${maxShare} shares in ${stocks.stock_name}, ${shareholdersName} is the top shareholder.`;
      }
    } 
    
  if(returnString.length>0){
    return returnString;
  }
  else {
    throw "Stock Name not found in the Data set";
  }
    
}

const listStocks = async function listStocks(firstName, lastName)
{
//Error Handeling
  if (!firstName || !lastName){
    throw "Input parameters are Required, Please enter First and Last name of the Person.";
  }
  if(typeof firstName !== 'string' || typeof lastName !== 'string'){
    throw "Input parameters need to be String."
  }
  if(firstName.trim().length === 0 || lastName.trim().length === 0){
    throw "Empty string cannot be passed as input parameters."
  }

//Variables
    let axiosCallPeopleData = await getPeople();
    let axiosCallStocksData = await getStocks(); 
    let personID = '';
    let listStocksArray = [];
    let listStocksPerson = {};

//Logic to get List of Stocks for the provided Person
  for (let person of axiosCallPeopleData) {
    if(person.first_name === firstName.trim() && person.last_name === lastName.trim()){
      personID = person.id;
      break;
    }
  }

  if (personID.length === 0){
    throw "Person not found."
  }

  for (const stocks of axiosCallStocksData) {
    for (const holder of stocks.shareholders) {
      if(holder.userId === personID) {
        listStocksPerson = {'stock_name':stocks.stock_name,'number_of_shares':holder.number_of_shares};
        listStocksArray.push(listStocksPerson);
        }
    }
  }

  if(listStocksArray.length>0){
    return listStocksArray;
    }

  else {
    throw `${firstName} ${lastName} does not own any stocks.`;
    }  
}

const getStockById = async function getStockById(id)
{
//Error Handeling
    if(!id){
      throw "Please enter Stock ID, Input is Required";
    }

    if(!(typeof id ==='string')){
      throw "Input Stock ID must be a String.";
    }

    if(id.trim().length===0){
      throw "Empty string cannot be passed as Stock ID";
    }

//Variables
    let axiosCallStocksData = await getStocks();  
    let arrayID = [];

//Logic for getting Stock by ID
    for (let ele of axiosCallStocksData) {
      arrayID.push(ele.id)
    }
        
    for (let indID = 0; indID < arrayID.length; indID++){
      if(arrayID[indID] === id){
        break;
      }

      if(indID === arrayID.length - 1){
        throw "Stock not found.";
      }
    }

    for (let ele of axiosCallStocksData) {
      if(ele.id === id){
        return ele;
        }
    }
}

// async function calls(){
//     try{
//     //console.log(await listShareholders());
//     //console.log(await topShareholder('Just Energy Group, Inc.'));
//     //console.log(await getStockById(1001));
//     //console.log(await listStocks(1,2));
    
//     }
//     catch (message){
//       console.log(message);
//     }
//   }
  
//   calls();

module.exports = {
    listShareholders,
    topShareholder,
    getStockById,
    listStocks
}
