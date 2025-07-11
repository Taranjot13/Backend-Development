let p = new Promise((resolve, reject) => {
    let age =18;
    if (age >= 18) return resolve("You are eligible to vote");
        reject("You are not eligible to vote");
});

p
.then((data)=> {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})

console.log("hi");
console.log("ok");


function add(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a === 'number' && typeof b === 'number') {
            resolve(a + b);
        } else {
            reject("Both arguments must be numbers");
        }
    });
}
