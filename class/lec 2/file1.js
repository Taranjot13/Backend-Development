let file3=require("./file3.js");
console.log(file3) ;
let res=file3.mul(2,3);

function sub(a,b){
    return a - b;
}

module.exports.sub = sub;