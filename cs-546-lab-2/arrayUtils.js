function average(arr){
    if(!arr){
        throw "Input Parameter is REQUIRED.";
    }
    if(!(Array.isArray(arr))){
throw "Input has to be an ARRAY.";
    }
    if(arr.length === 0){
        throw "Empty Array cannot be Passed.";
    }
    let avg = 0;
    let count = 0;
    arr.forEach(element => {
        if(!(Array.isArray(element))){
           throw "All elements of Array need to be of Type ARRAY";
        }
        if(element.length === 0){
            throw "Empty Array cannot be Passed as element of Array.";
        }
        for (val of element){
            if(!(typeof val === 'number')){
             throw "Array of Array Elements have to be Number";
            }
           avg +=val;
           count ++;
        }
    });
    avg /= count;
return Math.round(avg);
}

function modeSquared(arr){
    if(!arr){
        throw "Input Parameter is REQUIRED.";
    }
    if(!(Array.isArray(arr))){
        throw "Input has to be an ARRAY.";
    }
    if(arr.length === 0){
        throw "Empty Array cannot be Passed.";
    }
let mode = 0;
let index = [];
let count = 0;
let maxcount = 0;
arr.sort(function(a, b){return a - b});
for (let i=0; i<arr.length; i++){
    if(!(typeof arr[i] === 'number')){
        throw "Array of Array Elements have to be Number";
        }
if(arr[i] == arr[i+1]){
count++
}
else {
    if(count>maxcount){
        maxcount = count;
    }
    if(count>=1){
    if(count === maxcount){
        index.push(i);
    }
    count = 0;  
}
}
}
if(index.length > 0){
    index.forEach(element => {   
        mode += Math.pow(arr[element],2);
    });
}
else if (index.length=0){
mode = 0;
}
return mode;
}

function medianElement(arr){
    if(!arr){
        throw "Input Parameter is REQUIRED.";
    }
    if(!(Array.isArray(arr))){
        throw "Input has to be an ARRAY.";
    }
    if(arr.length === 0){
        throw "Empty Array cannot be Passed.";
    }
    for (const ele of arr) {
        if(!(typeof ele === 'number')){
            throw "Array of Array Elements have to be Number";
        }  
    }
const medianObj = {};
let sortedArray = arr.map((x)=>x);
sortedArray = sortedArray.sort(function(a, b){return a - b});
let index;
let key;
if(sortedArray.length%2 === 0){
    index = Math.floor((sortedArray.length-1)/2);
    key = (sortedArray[index]+sortedArray[index+1])/2; 
    let val = sortedArray[index+1];
    medianObj[key.valueOf()] = arr.indexOf(val);
}
else if(sortedArray.length%2 === 1){
index = (sortedArray.length - 1)/2;
key = sortedArray[index];
let val = arr.indexOf(key);
medianObj[key.valueOf()] = val;
}
return medianObj;
}

function merge(arr1, arr2){
    if(!arr1 || !arr2){
        throw "Input Parameters are REQUIRED.";
    }
    if(!(Array.isArray(arr1))||!((Array.isArray(arr2)))){
        throw "Both inputs have to be ARRAYS.";
    }
    if(arr1.length === 0 || arr2.length === 0){
        throw "Empty Array cannot be Passed.";
    }
    for (const ele of arr1) {
        if(!(typeof ele === 'number'||(typeof ele ==='string' && ele.length === 1))){
            throw "Array of Array Elements have to be Number or Character";
            }  
    }
    for (const ele of arr2) {
        if(!(typeof ele === 'number'||(typeof ele ==='string' && ele.length === 1))){
            throw "Array of Array Elements have to be Number or Character";
            }  
    }
    let mergeArray = arr1.concat(arr2);
    let upperArray=[];
    let lowerArray=[];
    let numberArray=[];
    for (let i=0;i<mergeArray.length;i++){
        let ele = mergeArray[i]
        if(typeof mergeArray[i]=== 'string' && mergeArray[i] === ele.toUpperCase()){
            upperArray.push(mergeArray[i]);
        }
        if(typeof mergeArray[i]=== 'string' && mergeArray[i] === ele.toLowerCase()){
           lowerArray.push(mergeArray[i]);
        }
        if(typeof mergeArray[i]==='number'){
            numberArray.push(mergeArray[i]);
        }
    }
    upperArray.sort()
    lowerArray.sort()
    numberArray.sort(function(a, b){return a - b})
    mergeArray = lowerArray.concat(upperArray,numberArray)
    return mergeArray
}


module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}; 

//console.log(average([[1,2,3],[4,5,6],[7,8,9]]));
//console.log(modeSquared([3,5,4,1,2,3]));
//console.log(medianElement([5,6,7,6,11,10,8]))
//console.log(merge(['H','h',5,'S'],['a','B',1,'Z',10]))
