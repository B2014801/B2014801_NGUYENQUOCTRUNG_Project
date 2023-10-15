const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const ProductService = require('../../services/product.service');

exports.home = async (req, res, next) => {
    res.send('wheo come home');
};

exports.createProduct = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the product' + error));
    }
};

exports.getAllProduct = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        documents = await productService.find({});
    } catch (error) {
        return next(new ApiError(500, 'Error when get all product'));
    }
    return res.send(documents);
};
