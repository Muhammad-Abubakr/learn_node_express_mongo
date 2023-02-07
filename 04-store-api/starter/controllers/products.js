// Requiring the Model 
const { findByIdAndDelete } = require('../models/product');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: "products testing route" });
}

/* Query All Products */
const getAllProducts = async (req, res) => {

    try {
        // making a query to the database to get all products
        const products = await Product.find();

        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({ status: 'failure', msg: err });
    }
}

/* Query Single Product */
const getProduct = async (req, res) => {

    try {

        const id = req.params.id;

        // making a query to the database to get the product with the specified id
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ status: 'failure', msg: `Product with the specified ID: ${id} not found.` });
        }

        res.status(200).json({ status: 'success', data: product });
    } catch (err) {
        res.status(500).json({ status: 'failure', msg: err });
    }
}

/* Delete a product using ID */
const deleteProduct = async (req, res) => {

    try {
        const id = req.params.id;

        // find by id and delete
        const result = await Product.findByIdAndDelete(id);

        console.log(id);
        console.log(result);

        if (!result) {
            return res.status(404).json({ status: 'failure', msg: `Product with the specified ID: ${id} not found.` })
        }

        res.status(200).json({ status: 'success', data: result });

    } catch (err) {
        res.status(500).json({ status: 'failure', msg: err });
    }
}



module.exports = {
    getAllProducts,
    getAllProductsStatic,
    getProduct,
    deleteProduct
}