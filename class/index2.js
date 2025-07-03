const fs= require("fs");
console.log(fs);
console.log("start");
setImmediate(()=>{
    console.log("set Immediate");
}); 
setTimeout(()=>{
    console.log("set Timeout ");
}, 0);
fs.readFile("demo.txt", (data) => {
console.log("File read complete");
setTimeout(() => {
        console.log("Timer 2");
    }, 0);
    setImmediate(() => {
        console.log("Immediate 2");
    }); 
}   );  
function someTask() {
    return new Promise((resolve, reject) => {
        resolve("promise resolved");
    });     
}
someTask().then((data) => {
    console.log(data);  
})
.catch((err) => {
    console.log(err);
}); 
console.log("End"); 
