function comnputeObjects(arr,func){
    if(!arr){
        throw "Input Array is Required."
    }
    if(!Array.isArray(arr)){
        throw "Input has to be an Array of objects";
    }
    if(arr.length===0){
        throw "Array must contain atleast 1 object";
    }
    if (!(typeof func === 'function')){
      throw "Second parameter has to be a function";
    }
    const computedObj = {};
    arr.forEach(element => {
        if(!(typeof element === 'object') || (Array.isArray(element))){
            throw "Array elements have to be Object.";
        }
        if (Object.keys(element).length === 0){
           throw "Empty object cannot be passed as Array element.";
        }
        for (const key1 in element) {
            let val = element[key1]
            if(!(typeof val === 'number')){
                throw "Value in object have to be Number";
            }
        }
        for (const key in element) {
            if(computedObj[key]=== undefined){
         computedObj[key] = func(element[key]);
            }
            else{
                let dupKeyVal = computedObj[key];
         dupKeyVal += func(element[key]);
         computedObj[key] = dupKeyVal;
            }
        }
    });
return computedObj;
}

function commonKeys(obj1,obj2){
    if(!obj1 || !obj2){
        throw "All Input parameters are Required";
    }
    if (!(typeof obj1 === 'object')||!(typeof obj2 ==='object')|| Array.isArray(obj1)|| Array.isArray(obj2)){
        throw "Input parameters have to be objects";
    }
const commonObj={};
let obj2Keys = Object.keys(obj2);
for (const key in obj1) {
    for (let i=0;i<obj2Keys.length;i++){
        let key1 = obj2Keys[i];
        if(key === key1){
            let valObj1 = obj1[key.valueOf()]
            let valObj2 = obj2[key1.valueOf()]
            if(valObj1===valObj2){
                commonObj[key]=valObj1;
            }
            else if(typeof valObj1==='object'&& typeof valObj2 ==='object'){
                let newCommonObj = {};
                let obj2ValKeys = Object.keys(valObj2);
                 for (const obj1Key in valObj1) {
                    for (let i=0;i<obj2ValKeys.length;i++){
                        let key2 = obj2ValKeys[i];
                        if(obj1Key === key2){
                            let val1Obj = valObj1[obj1Key.valueOf()]
                            let val2Obj = valObj2[key2.valueOf()]
                            if(val1Obj===val2Obj){
                                newCommonObj[obj1Key]=val1Obj;
                            }
                        }
                    }

                 }
                 commonObj[key]=newCommonObj;
            }
        }
    }

}
return commonObj
}

function flipObject(obj){
    if(!(typeof obj === 'object') || (Array.isArray(obj))){
        throw "Input has to be Object.";
    }
    if (Object.keys(obj).length === 0){
        throw "Empty object cannot be passed as Input.";
     }
    const flippedObj = {};   
    for (const key in obj) {
        if(typeof obj[key]=== 'object'){
            let ObjObj = obj[key.valueOf()];
            let obj1 = {};
            if(Array.isArray(ObjObj)){
            ObjObj.forEach(ele => {
            flippedObj[ele]= key;
          });
            }
           else{ 
            for (const key1 in ObjObj) {
                let val = key1;
                let flippedKey1 = ObjObj[key1.valueOf()]
                obj1[flippedKey1.valueOf()]=val;
                } 
                flippedObj[key]= obj1;
            } 
        }
        else{
    let val = key;
    let flippedKey = obj[key.valueOf()]
    flippedObj[flippedKey.valueOf()]=val
        }
    }
    return flippedObj
}

module.exports = {
    comnputeObjects,
    commonKeys,
    flipObject
};

//console.log(comnputeObjects([first,second],(x)=>x*2));
//console.log(commonKeys(second,[1,2,3,4]));
//console.log(commonKeys("",fourth));
//console.log(flipObject(third));
