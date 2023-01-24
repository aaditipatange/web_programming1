//const axios = require('axios');
require('util').inspect.defaultOptions.depth = null;
const people = require("./people");
const stocks = require("./stocks");

async function main(){

// Test Cases for People functions
    try{
        const personID = await people.getPersonById('9573b4d0-1666-4bff-ac03-6f0b7b5b99ca');
        console.log("\nDetails of the person ID are as below: ")
        console.log (personID);
    }catch(e){
        console.log (e);
    }
    try{
        const personID1 = await people.getPersonById('  ');
        console.log("\nDetails of the person ID are as below: ")
        console.log (personID1);
    }catch(e){
        console.log (e);
    }
    try{
        const sameStreet = await people.sameStreet("sutherland", "point");
        console.log("\nDetails of the people on the same street are as below: ")
        console.log (sameStreet);
    }catch(e){
        console.log (e);
    }
    try{
        const sameStreet = await people.sameStreet("Crownhardt","Park");
        console.log("\nDetails of the people on the same street are as below: ")
        console.log (sameStreet);
    }catch(e){
        console.log (e);
    }
    try{
        const ssnData = await people.manipulateSsn();
        console.log("\nDetails of the manipulated SSN for data set are as below: ")
        console.log (ssnData);
    }catch(e){
        console.log (e);
    }
    try{
            const ssnData = await people.manipulateSsn('input passed');
            console.log("\nDetails of the manipulated SSN for data set are as below: ")
            console.log (ssnData);
        }catch(e){
            console.log (e);
        }
    try{
        const peopleBirthday = await people.sameBirthday('09','25');
        console.log("\nDetails of the people with same Birthday are as below: ")
        console.log (peopleBirthday);
    }catch(e){
        console.log (e);
    }
    try{
        const peopleBirthday = await people.sameBirthday("  ",31);
        console.log("\nDetails of the people with same Birthday are as below: ")
        console.log (peopleBirthday);
    }catch(e){
        console.log (e);
    }

// Test Cases for Stocks functions
    try{
        const allShareHolders = await stocks.listShareholders();
        console.log("\nList of all the ShareHolders in the Data set are as below: ")
        console.log (allShareHolders);
    }catch(e){
        console.log (e);
    }
    try{
        const allShareHolders = await stocks.listShareholders('7283e5d6-7481-41cb-83b3-5a4a2da34717');
        console.log("\nList of all the ShareHolders in the Data set are as below: ")
        console.log (allShareHolders);
    }catch(e){
        console.log (e);
    }
    try{
        const topSharePerson = await stocks.topShareholder('Powell Industries, Inc.');
        console.log("\n")
        console.log (topSharePerson);
    }catch(e){
        console.log (e);
    }
    try{
        const topSharePerson = await stocks.topShareholder('Foobar Inc');
        console.log("\n")
        console.log (topSharePerson);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksDetails = await stocks.listStocks("Grenville", "Pawelke");
        console.log("\nList of stocks that the provided person owns are as below: ")
        console.log (stocksDetails);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksDetails = await stocks.listStocks('  ','  ');
        console.log("\nList of stocks that the provided person owns are as below: ")
        console.log (stocksDetails);
    }catch(e){
        console.log (e);
    }
    try{
        const stockByID = await stocks.getStockById('f652f797-7ca0-4382-befb-2ab8be914ff0');
        console.log("\nDetails of the stock ID are as below: ")
        console.log (stockByID);
    }catch(e){
        console.log (e);
    }
    try{
        const stockByID = await stocks.getStockById(-1);
        console.log("\nDetails of the stock ID are as below: ")
        console.log (stockByID);
    }catch(e){
        console.log (e);
    }
}

//call main
main();