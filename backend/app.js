const express = require ('express'); 
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');

require('dotenv/config'); 

//Routes 
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const userssRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const api = process.env.API_URL; 

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, userssRouter);

const Product = require('./models/product')



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