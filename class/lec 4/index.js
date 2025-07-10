function buyproduct(product_name,cb){
    setTimeout(() => {
        console.log("order complete");
        cb();
    })
}

buyproduct("Iphone 16",function(){
    console.log("product is purchased");
});
// console.log("product is purchased");
function buyproduct(product_name,cb){
    let isproduct=null;
}