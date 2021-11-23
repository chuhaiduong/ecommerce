import express from 'express';
import {list,create,productById,read,remove,update,photo}from '../controllers/product';
import{categoryById } from '../controllers/category';
const router = express.Router();

//add product
router.post('/addproducts',create);
router.get('/products', list);
router.put('/updateproduct/:productId',update);
router.get('/product/:productId', read);
router.delete('/delete/:productId',remove);
router.param('productId', productById);
router.get("/product/photo/:productId", photo);
// router.put('/editproduct/:id',update)
//category
// router.post('/category',create);
// router.get('/category',list);
// router.param("categoryId", categoryById)

module.exports = router;