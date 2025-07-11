let p= new Promise((resolve, reject) => {
})

//console.log(p);
p.then((data) => {
    console.log(data);
    console.log("promise completed")
})
.catch((err) => {
    console.log(err);
    console.log("promise failed")
})