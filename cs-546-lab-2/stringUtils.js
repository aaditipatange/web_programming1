function sortString(str){
    if(!str){
        throw "Input String is Required.";
    }
    if(str.length===0){
        throw "Empty String cannot be passed as input.";
    }
    if(!(typeof str === 'string')){
        throw "Input has to be String.";
    }
    if(!str.replace(/\s/g, '').length){
        throw "String that contains only empty spaces cannot be passed";
    }
    let sortStr='';
    let strUpper='';
    let strLower='';
    let strNum='';
    let strSpace='';
    let strSplChar=''; 
for(let i=0;i<str.length;i++){
    let s = str.charAt(i);
if(str.charAt(i) === ' '){
    strSpace +=s;
    }
 else if(!isNaN(s*1)){
    strNum +=s;
    }
        else if (/[^A-Z a-z0-9]/.test(s)){
            strSplChar +=s;
            }
 else if(str.charAt(i) === s.toLowerCase()){
    strLower +=s;
    }  
    else if(str.charAt(i) === s.toUpperCase()){
        strUpper +=s;
        }                   
}
strUpper = strUpper.split('');
strUpper = strUpper.sort();
strUpper = strUpper.join('');

strNum = strNum.split('');
strNum = strNum.sort();
strNum = strNum.join('');

strLower = strLower.split('');
strLower = strLower.sort();
strLower = strLower.join('');

sortStr = strUpper+strLower+strSplChar+strNum+strSpace
//console.log('Original str length: '+str.length)
//console.log('Sorted str length: '+sortStr.length)
return sortStr
}

function replaceChar(str,idx){
    if(!str){
        throw "Input String is Required.";
    }
    if(str.length===0){
        throw "Empty String cannot be passed as input.";
    }
    if(!(typeof str === 'string')){
        throw "Input has to be String.";
    }
    if(!str.replace(/\s/g, '').length){
        throw "String that contains only empty spaces cannot be passed";
    }
    if(idx<0 || idx > str.length){
        throw "Index out of Bound";
    }
    if(idx === 0||idx === str.length-1){
        throw "The first and last Character of the String cannot be used for Replace function.";
    }
    if(!(typeof idx === 'number')){
        throw "Index has to be Number";
    }
let s = str.charAt(idx);
let a1 = str.charAt(idx-1);
let a2 = str.charAt(idx+1);
let count = 1;
for(let i=0;i<str.length;i++){
if(i!==idx && str.charAt(i)===s && count%2 === 1){
    str = str.split('');
    str[i] = a1;
    str = str.join('');
    count ++
}
if(i!==idx && str.charAt(i)===s && count%2 === 0){
    str = str.split('');
    str[i] = a2;
    str = str.join('');
    count ++
}
}
return str
}

function mashUp(str1,str2,char){
    if(!str1||!str2||!char){
        throw "All input parameters are Required.";
    }
    if(!(typeof str1 === 'string') || !(typeof str2 === 'string')|| !(typeof char === 'string')){
        throw "All Input have to be of Type String.";
    }
    if(!str1.replace(/\s/g, '').length|| !str2.replace(/\s/g, '').length||!char.replace(/\s/g, '').length){
        throw "String that contains only empty spaces cannot be passed";
    }
    if(char.length>1){
        throw "String has been passed instead of Character.";
    }
let i = str1.length;
let j = str2.length;
let a=0;
let conStr='';
if(i>j){ 
    for (let padValue = i-j;padValue>0;padValue--){
    str2+= char
    j = str2.length;
    }
}
if(i<j){
    for (let padValue = j-i;padValue>0;padValue--){
    str1+= char
    i = str1.length;
    }
}
while(i>0){
    conStr += str1.charAt(a)+str2.charAt(a);
    a++
    i--;
}
return conStr;
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}; 

//console.log(sortString('!132 Fooarde BAR!'))
//console.log(replaceChar("cbcdccc", 2))
//console.log(mashUp("hello", "world", "#"))
