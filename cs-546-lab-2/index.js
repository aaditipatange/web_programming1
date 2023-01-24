const arrayUtils = require("./arrayUtils");
const objUtils = require("./objUtils");
const stringUtils = require("./stringUtils");

//Inputs for Object Test Cases
const first ={a:4,b:2,c:{x:1,y:2}};
const second ={};
const third = { x: 2, y: 3};
const fourth = { a: 70, x: 4, z: 5 };
const fifth = {a: 2, b: {x: 7,y:10},c:3};
const sixth = {a: 2, b: {x: 7, y: 10},d:10};


//Test Cases Start here

//Test cases for Array Utils
//Test for Average
try {
    // Positive Test Case
    const average  = arrayUtils.average([[1,2,3],[2]])
    console.log("Average value of provided inputs is ");
    console.log(average);
 } catch (e) {
    console.error('Average failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const average1  = arrayUtils.average([[1,2,3],[]])
    console.log("Average value of provided inputs is ");
    console.log(average1);
 } catch (e) {
    console.error('Average failed test case with Error: '+ e);
 }

 //Test for Mode Squared
 try {
     // Positive Test Case
    const modeSquared  = arrayUtils.modeSquared([5,4,6,6,7,1,1])
    console.log("ModeSquared value of provided inputs is ");
    console.log(modeSquared);
 } catch (e) {
    console.error('ModeSquare failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const modeSquared1  = arrayUtils.modeSquared()
    console.log("ModeSquared value of provided inputs is ");
    console.log(modeSquared1);
 } catch (e) {
    console.error('ModeSquare failed test case with Error: '+ e);
 }

 //Test for Median
 try {
     // Positive Test Case
    const median  = arrayUtils.medianElement([9,3,6,2,8,1,5])
    console.log("Median value of provided inputs is ");
    console.log(median); 
 } catch (e) {
    console.error('Median failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const median1  = arrayUtils.medianElement([5,3,'test',7,8])
    console.log("Median value of provided inputs is ");
    console.log(median1); 
 } catch (e) {
    console.error('Median failed test case with Error: '+ e);
 }

 //Test for Merge Array
 try {
     // Positive Test Case
    const mergeArray  = arrayUtils.merge(['Z','b',5,1,4,'k','A'],[5,4,1,'Z'])
    console.log("Merge value of provided inputs is ");
    console.log(mergeArray);
 } catch (e) {
    console.error('Merge failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const mergeArray1  = arrayUtils.merge([1,2,3,'hello'],[2])
    console.log("Merge value of provided inputs is ");
    console.log(mergeArray1);
 } catch (e) {
    console.error('Merge failed test case with Error: '+ e);
 }

//Test cases for String Utils
//Test for Sort String
try {
    // Positive Test Case
    const sortedString  = stringUtils.sortString('Hurray!!1 Function2 Worked3 :*');
    console.log("Sorted string value of provided inputs is ");
    console.log(sortedString);
 } catch (e) {
    console.error('Sort string failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const sortedString1  = stringUtils.sortString("    ");
    console.log("Sorted string value of provided inputs is ");
    console.log(sortedString1);
 } catch (e) {
    console.error('Sort string failed test case with Error: '+ e);
 }

 //Test for Character Replace
 try {
     // Positive Test Case
    const repChar  = stringUtils.replaceChar('cbdcbcc',3);
    console.log("Character Replaced value of provided inputs is ");
    console.log(repChar);
 } catch (e) {
    console.error('Character Replace failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const repChar1  = stringUtils.replaceChar('cbdcbcc',-3);
    console.log("Character Replaced value of provided inputs is ");
    console.log(repChar1);
 } catch (e) {
    console.error('Character Replace failed test case with Error: '+ e);
 }

 //Test for Mash Up String
 try {
     // Positive Test Case
    const mashUpStr  = stringUtils.mashUp('Aaditi','Patange','%');
    console.log("Mashed Up String value of provided inputs is ");
    console.log(mashUpStr);
 } catch (e) {
    console.error('Mash Up String failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const mashUpStr1  = stringUtils.mashUp('Aaditi','Patange', 6);
    console.log("Mashed Up String value of provided inputs is ");
    console.log(mashUpStr1);
 } catch (e) {
    console.error('Mash Up String failed test case with Error: '+ e);
 }

//Test cases for Object Utils
//Test for Compute Object
try {
    // Positive Test Case
    const compObj  = objUtils.comnputeObjects([third,fourth],(x)=>x*2);
    console.log("Computed Object value of provided inputs is ");
    console.log(compObj);
 } catch (e) {
    console.error('Compute Object failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const compObj1  = objUtils.comnputeObjects([],(x)=>x*2);
    console.log("Computed Object value of provided inputs is ");
    console.log(compObj1);
 } catch (e) {
    console.error('Compute Object failed test case with Error: '+ e);
 }

 //Test for Common Keys
 try {
     // Positive Test Case
    const comKey  = objUtils.commonKeys(fifth,sixth);
    console.log("Common Keys for the provided inputs is ");
    console.log(comKey);
 } catch (e) {
    console.error('Common Keys failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const comKey1  = objUtils.commonKeys('a',fifth);
    console.log("Common Keys for the provided inputs is ");
    console.log(comKey1);
 } catch (e) {
    console.error('Common Keys failed test case with Error: '+ e);
 }

 //Test for Flipped Object
 try {
     // Positive Test Case
    const flipObj  = objUtils.flipObject(first);
    console.log("Flipped Object of provided inputs is ");
    console.log(flipObj);
 } catch (e) {
    console.error('Flipped Object failed test case with Error: '+ e);
 }
 try {
     // Negative Test Case
    const flipObj1  = objUtils.flipObject(second);
    console.log("Flipped Object of provided inputs is ");
    console.log(flipObj1);
 } catch (e) {
    console.error('Flipped Object failed test case with Error: '+ e);
 }


 