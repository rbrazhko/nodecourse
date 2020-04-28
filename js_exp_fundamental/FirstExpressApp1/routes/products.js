var express = require('express');
var router = express.Router();
// var faker = require('faker');

var ProductModel = require('./../models/product.model');

// router.use((req, res, next) => {
const logger = (req, res, next) => {
    console.info(req.params);
    next();
};

router.get('/', logger, (req, res, next) => {
    ProductModel.find({}, (err, products) => {
        if (err) {
            // return res.status(500).json(err);
            return next(err);
        }

        return res.status(200).send(products);
    });

    // res.status(200)
    //     .send([
    //         {
    //             id: faker.random.number(),
    //             name: faker.commerce.product(),
    //             price: faker.commerce.price(),
    //             color: faker.commerce.color()
    //         }
    //     ]);
    // res.render('products');
});

router.get('/:id', logger, (req, res, next) => {
    let id = req.params.id;

    ProductModel.findOne({_id: id}, (err, product) => {
        if (err) {
            // return res.status(500).json(err);
            return next(err);
        }

        return res.status(200).send(product);
    });

    // res.status(200)
    //     .send({
    //         id: +id,
    //         name: faker.commerce.product(),
    //         price: faker.commerce.price(),
    //         color: faker.commerce.color()
    //     });
});

router.post('/', logger, (req, res, next) => {
    var product = new ProductModel(req.body);

    product.save((err) => {
        if (err) {
            // return res.status(500).json(err);
            return next(err);
        }

        return res.status(201).send(product);
    });
});

router.delete('/:id', (req, res, next) => {
    // The logger middleware is not used on delete request
    let id = req.params.id;

    ProductModel.deleteOne({_id: id}, (err) => {
        if (err) {
            // return res.status(500).json(err);
            return next(err);
        }

        // res.status(204).send(); // No Content
        return res.status(200).send({success: true});
    });



    // let id = req.params.id;
    //
    // res.status(200).send({
    //     id: +id,
    //     name: faker.commerce.product(),
    //     price: faker.commerce.price(),
    //     color: faker.commerce.color(),
    //     status: 'inactive'
    // });
});

// error handler
router.use(function (err, req, res, next) {
    console.info(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});

module.exports = router;