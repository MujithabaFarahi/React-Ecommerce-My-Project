import express from "express";
import Product from '../models/productModel.js';
import {isAdmin, isAuth} from "../Utils.js";
import expressAsyncHandler from "express-async-handler";

const productRouter =
    express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.slug = req.body.slug;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            await product.save();
            res.send({ message: 'Product Updated' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: 'sample name ' + Date.now(),
            slug: 'sample-name-' + Date.now(),
            image: '/images/sample.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
        });
        const product = await newProduct.save();
        res.send({ message: 'Product Created', product });
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.send({ message: 'Product Deleted' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);


productRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find();
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page: 1,
            pages: 1,
        });
    })
);



productRouter.get('/slug/:slug', async(req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

productRouter.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

export default productRouter;

    