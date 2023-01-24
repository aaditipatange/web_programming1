const axios = require('axios');
//require('util').inspect.defaultOptions.depth = null;

//Compose the URL with API key, a ts (time stamp) and a hash
const md5 = require('blueimp-md5');
const publickey = '646c22ad868b1200b3d7197c31274da1';
const privatekey = '7b81ba2ba9c789b92452003d492daec9553f4dd4';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

const exportedMethods = {
async getCharacterId(charId)
{
  //Error Handeling 
    if(!charId){
      throw "Please enter ID, Input is Required";
    }
    if(!(typeof charId === 'string')){
      throw "Input ID must be a String.";
    }
    if(charId.trim().length === 0){
      throw "Empty string cannot be passed as ID";
    }
    const {data} = await axios.get(baseUrl+'/'+charId+'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
    return data;
},
};

module.exports = exportedMethods;