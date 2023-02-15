const express = require ('express'); 
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');

require('dotenv/config'); 

const api = process.env.API_URL; 

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('tiny'));


const productSchema = mongoose.Schema({
  name: String, 
  image: String, 
  countInStock:  Number
   
})

const Product = mongoose.model('Product', productSchema); 

app.get(`${api}/products`, async(req, res) => {
   const productList = await Product.find();
 
  if(!productList){
    res.status(500).json({
      sucess: false
    })
  }
  res.send(productList);
})

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name, 
    image: req.body.image, 
    countInStock: req.body.countInStock
  })
  

  console.log(JSON.stringify(req.body));
  product.save().then((createdProduct => {
    res.status(201).json(createdProduct)
    console.log(JSON.stringify(createdProduct));
  })).catch((err) => {
    res.status(500).json({
      error: err, 
      success: false
    })
    console.log(err);
  })
})

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'eshop-database'
}).then(() =>{
  console.log('Database connection successful');
})
.catch((err) =>{
  console.log(err);
})

app.listen(3000, () => {
  
  console.log('Server is running http://localhost:3000');
})