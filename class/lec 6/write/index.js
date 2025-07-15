const fs=require("fs");


fs.writeFile("../demo.txt","hello g27",function(err,data){
    if(err) return console.log(err);
    console.log("success!!");
});
