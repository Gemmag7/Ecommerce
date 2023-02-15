const Product = require('../models/product');
const express = require('express');
//const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async(req, res) => {
  const productList = await Product.find();

 if(!productList){
   res.status(500).json({
     sucess: false
   })
 }
 res.send(productList);
})

router.post('/', (req, res) => {
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

module.exports =router;