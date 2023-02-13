// Requiring the Model 
const Product = require('../models/product');

/* Testing */
const getAllProductsStatic = async (req, res) => {

    try {
        // getting query parameters
        // const params = req.query; /* not good as anything can be passed through query parameters and this can result in a security flaw */
        // const products = await Product.find(params);

        // if user requested featured only products 
        const { featured, company, name, sort, select, limit, numericFilters } = req.query;
        const queryObject = {};

        // setting up query parameters
        /* Conditional */
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }

        /* Plain */
        if (company) {
            queryObject.company = company;
        }

        /* Using Regex while Querying based on a document attribute for searching */
        if (name) {
            queryObject.name = { $regex: `${name}`, $options: 'i' }
        }



        /* Numeric Values Filtering */

        /* Mongoose Operators for
           
           less-than ($lt),less-than-equal ($lte), 
           greater-than ($gt), greater-than-equal ($gte), 
           equal ($e).
        */
        if (numericFilters) {

            const mongooseOperators = {
                '<': '$lt',
                '<=': '$lte',
                '>': '$gt',
                '>=': '$gte',
                '=': '$e',
            }

            /* Swapping query operators with the mongoose operators */
            const regex = /\b(<|>|<=|>=|=)\b/g; /* got from searching online (debuggex.com) */
            let filters = numericFilters.replace(regex, (match) => `-${mongooseOperators[ match ]}-`);

            // console.log(`Filters: ${filters}`);
            /* Preparing to query the mongodb through mongoose api */
            const options = [ 'price', 'rating' ]; /* representing the available numeric filters */
            filters = filters.split(',').forEach(op => {
                const [ field, operator, value ] = op.split('-');

                if (options.includes(field)) {
                    queryObject[ field ] = { [ operator ]: Number(value) };
                }
            });

            console.log(queryObject);


        }


        /* We can also do sorting using query string parameters
         
         e.g - 

            {{URL}}?sort=name (sorts items in ascending order based on name)
            {{URL}}?sort=-name (sorts items in descending order based on name)

            * Chaining (sorting based on multiple parameters)
            {{URL}}?sort=name,price 
            (sorts items first based on name (ascending) and then price (ascending))
       
            * and on the Server Side we can use the mongoose provided api for sorting
            which is
            Model.find(</>).sort('') // where sort takes a string with syntax 'Opt1 Opt2'
            has options for sorting where each option belongs to the set of document values
            (which in our case are {name, price, company etc...}).
       
        */

        // making a query to the database to get all products
        // const products = await Product.find(queryObject);

        /* One difference would be that we do not resolve the Query Object immediatly but after sorting */
        let result = Product.find(queryObject);

        /* Limiting the documents queried from the collection */
        if (limit) {
            result = result.limit(Number(limit));
        }

        /* Selecting only some fields from a document/collection */
        if (select) {
            const selectingOptions = select.split(',').join(' ');
            console.log(selectingOptions);
            result = result.select(selectingOptions);
        }

        // Sorting only rearranges the data so it does not matter if we get data before or after
        if (sort) {
            const sortingOptions = sort.split(',').join(' ');
            result = result.sort(sortingOptions);
        }


        // and now resolving the query object gives us
        const products = await result;

        res.status(200).json({ status: 'success', data: { count: products.length, products } });

    } catch (err) {

        res.status(500).json({ status: 'failure', msg: err });
    }
}

/* Query All Products */
const getAllProducts = async (req, res) => {

    try {
        /* Setting up a query object from the query string params 
        
            Implementing Pagination: a mechanism to obtain a documents after
            a fixed amount of documents (like page to page from a book.)
        */
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        console.log(`Page: ${page}, Limit: ${limit}`);

        /* if we have a limit on how much products to get */
        let result = Product.find();

        if (limit) {
            result = result.limit(Number(limit));
        }

        if (page) {
            result = result.skip(skip);
        }

        // making a query to the database to get all products
        const products = await result;

        res.status(200).json({ status: 'success', data: { count: products.length, products } });
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