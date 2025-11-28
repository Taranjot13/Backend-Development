const express = require('express');
const sum = require('./sum');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT =3000;
app.post('/sum', (req, res) => {
  let {a,b}=req.body;
  if(!a||!b){
    return res.json({
      result:"invalid argument"
    })
  }
  res.json({
    result: sum(a,b)
  });
});

module.exports = app;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
