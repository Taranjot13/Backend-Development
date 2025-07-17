const fs = require("fs");
let users=[
    {
        id:1,
        name:"Nitesh",
        age:"20"
    },
     {
        id:2,
        name:"Taran",
        age:"20"
    }
]
fs.writeFile("../users2.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("users written!!");
})
