const axios = require('axios');
require('util').inspect.defaultOptions.depth = null;

async function getStocks()
{
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

const getStockById = async function getStockById(id)
{
//Error Handeling
    // if(!id){
    //   throw "Please enter Stock ID, Input is Required";
    // }

    if(!(typeof id ==='string')){
      throw "Input Stock ID must be a String.";
    }

    if(id.trim().length===0){
      throw "Empty string cannot be passed as Stock ID";
    }

//Variables
    let axiosCallStocksData = await getStocks();  
    let arrayID = [];

// //Logic for getting Stock by ID
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

module.exports={
    getStocks,
    getStockById
};