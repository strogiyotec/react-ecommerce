import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/postModel.js';



const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find();
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', products.length)
        res.send(products);
    })
);
productRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            description: req.body.description,
        });
        const createdProduct = await product.save();
        res.send(createdProduct);
    })
);
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({message: 'User Not Found'});
        }
    })
);
productRouter.put(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name
            product.image = req.body.image
            product.price = req.body.price
            product.category = req.body.category
            product.brand = req.body.brand
            product.countInStock = req.body.countInStock
            product.rating = req.body.rating
            product.description = req.body.description
            const savedProduct = await product.save();
            res.send({
                id: savedProduct._id,
                name: savedProduct.name,
                image: savedProduct.image,
                price: savedProduct.price,
                category: savedProduct.category,
                brand: savedProduct.brand,
                countInStock: savedProduct.countInStock,
                rating: savedProduct.rating,
                description: savedProduct.description,
            });
        } else {
            res.status(404).send({message: 'User Not Found'});
        }
    })
);
export default productRouter
