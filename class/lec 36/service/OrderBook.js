class OrderBook {
    constructor(symbol) {
        this.symbol = symbol;
        this.bids = [];
        this.asks = [];
        this.currentPrice = null;
        this.trades = [];
    }

    _sort(side) {
        if (side === 'BUY') {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price; // Descending, high first
                }
                return a.timeStamp - b.timeStamp; // Earlier first
            });
        }
        if (side === 'SELL') {
            this.asks.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price; // Ascending, low first
                }
                return a.timeStamp - b.timeStamp;
            });
        }
    }

    placeOrder(price, quantity, type, side, userName) {
        let newOrder = {
            symbol: this.symbol,
            orderId: Math.floor(Math.random() * 1000000),
            type: type,
            side: side,
            price: price !== null ? Number(price) : null,
            originalQuantity: quantity,
            executedQty: 0,
            remainingQty: quantity,
            user: userName,
            timeStamp: Date.now()
        };

        let result;
        if (newOrder.type === 'LIMIT') {
            if (side === 'BUY') {
                this.bids.push(newOrder);
                this._sort('BUY');
            } else if (side === 'SELL') {
                this.asks.push(newOrder);
                this._sort('SELL');
            }
            result = this._LIMITMatch(newOrder);
            return result;
        } else {
            result = this._MARKETMATCH(newOrder);
            if (result && result.remainingQty > 0) {
                console.log("order complete " + result.executedQty + ", orderCancel " + result.remainingQty);
            } else if (result) {
                console.log("order completed " + result.executedQty);
            }
            return result;
        }
    }

    _LIMITMatch(order) {
        if (order.side === "BUY") {
            let askArr = this.asks;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                if (top.price <= order.price) {
                    let fillQty = Math.min(top.remainingQty, order.remainingQty);
                    order.executedQty += fillQty;
                    order.remainingQty -= fillQty;
                    top.executedQty += fillQty;
                    top.remainingQty -= fillQty;
                    this.currentPrice = top.price; // Update price after a match
                    if (top.remainingQty === 0) {
                        askArr.shift();
                    }
                } else {
                    break;
                }
            }
            return order;
        } else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                if (top.price >= order.price) {
                    let fillQty = Math.min(top.remainingQty, order.remainingQty);
                    order.executedQty += fillQty;
                    order.remainingQty -= fillQty;
                    top.executedQty += fillQty;
                    top.remainingQty -= fillQty;
                    this.currentPrice = top.price; // Update price after a match
                    if (top.remainingQty === 0) {
                        bidArr.shift();
                    }
                } else {
                    break;
                }
            }
            return order;
        }
        return order;
    }

    _MARKETMATCH(order) {
        if (order.side === "BUY") {
            let askArr = this.asks;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                let fillQty = Math.min(top.remainingQty, order.remainingQty);
                order.executedQty += fillQty;
                order.remainingQty -= fillQty;
                top.executedQty += fillQty;
                top.remainingQty -= fillQty;
                this.currentPrice = top.price; // Update price after a market match
                if (top.remainingQty === 0) {
                    askArr.shift();
                }
            }
            return order;
        } else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                let fillQty = Math.min(top.remainingQty, order.remainingQty);
                order.executedQty += fillQty;
                order.remainingQty -= fillQty;
                top.executedQty += fillQty;
                top.remainingQty -= fillQty;
                this.currentPrice = top.price;
                if (top.remainingQty === 0) {
                    bidArr.shift();
                }
            }
            return order;
        }
        return order;
    }

    getPrice() {
        return this.currentPrice;
    }

    getBookSnapShot() {
        return {
            "asks": this.asks.map(a => [a.price, a.remainingQty]),
            "bids": this.bids.map(b => [b.price, b.remainingQty])
        };
    }
}


// Usage Example
let BTCUSDOrderBook = new OrderBook('BTCUSD');

BTCUSDOrderBook.placeOrder("100", 5, "LIMIT", "BUY", "Nitesh");
BTCUSDOrderBook.placeOrder("101", 10, "LIMIT", "BUY", "Nitesh");
BTCUSDOrderBook.placeOrder("99", 5, "LIMIT", "BUY", "Nitesh");
console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("102", 5, "LIMIT", "SELL", "Nitesh");
BTCUSDOrderBook.placeOrder("103", 5, "LIMIT", "SELL", "Nitesh");
BTCUSDOrderBook.placeOrder("104", 5, "LIMIT", "SELL", "Nitesh");
console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("101", 3, "LIMIT", "SELL", "Nitesh");
console.log(BTCUSDOrderBook.getPrice());
BTCUSDOrderBook.placeOrder(null,10,"MARKET","BUY","Nitesh");
console.log(BTCUSDOrderBook.getPrice());
console.log(BTCUSDOrderBook);
