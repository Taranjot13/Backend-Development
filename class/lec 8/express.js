const express = require('express');
const app = express();
const port = 3000;

// Route to output "Hello World"
app.get('/', (req, res) => {
    // res.send('Hello World');
    res.json({
        name: 'Taranjot Singh',
        age: 20,
        isLogin: true
    })
});

app.get('/blogs', (req, res) => {
    console.log(req.query.title);
    res.send("got it")
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
