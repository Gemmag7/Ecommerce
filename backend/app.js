const express = require ('express'); 
const bodyParser= require('body-parser');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');

require('dotenv/config'); 

const api = process.env.API_URL; 

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, (req, res) => {
  const product = {
    id:1, 
    name:'hair dresser  5', 
    image:'some_url',
  }
  res.send(product);
})

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
console.log(req.body);
  console.log(newProduct);
  res.send(newProduct);
})

mongoose.connect(process.env.CONNECTION_STRING).then(() =>{
  console.log('Database connection successful');
})
.catch((err) =>{
  console.log(err);
})

app.listen(3000, () => {
  
  console.log('Server is running http://localhost:3000');
})