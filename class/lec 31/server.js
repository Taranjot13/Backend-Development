const  {WebSocketServer} = require('ws');

const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(socket) {
//     console.log('A new client connected!');
//     socket.send('Welcome New Client!');
//     setInterval(() => {
//         socket.send("Reliance stock price: "+Math.random());
//     },1000);
// })

// wss.on('connection', function connection(socket) {
//     console.log('A new client connected!');
//     socket.send('Welcome New Client!');
//     socket.on('message', function message(data) {
//         console.log('received: %s', data);
//       });
//     setInterval(() => {
//         socket.send("Reliance stock price: "+Math.random());
//     },1000);   
// })


// express = require('express');
// app=express();
// app.listen(3000)


// app.get("/")
// app.post("/")


let allSockets = [];

wss.on('connection', function connection(socket) {
    console.log('A new client connected!');
    allSockets.push(socket);
    socket.send('Welcome New Client!');
    socket.on('message', function message(data) {
        allSockets.forEach(s => s.send(data));
        s.send(message.toString());
    });
})