const OrderBook = require("../service/OrderBook");
;
const ob = new OrderBook("BTCUSD");
let {publisher} = require("../../shared");
module.exports.postPlaceOrder=async (req, res) => {
    //user,quantity,type,price,side,symbol
    let{type,side,price,quantity,username}
    =req.body;
    //basic validation
    //
    let response=ob.placeOrder(price,quantity,type,side,username);
    console.log(response);
    await publisher.publish("trades",JSON.stringify(response.trades));
    res.json(response);
}