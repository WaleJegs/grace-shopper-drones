const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll({})
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId)
        .then((product) => {
            res.json(product)
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => {
            res.json(product)
        })
        .catch(next);
});

router.put('/:productId', (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            product.update(req.body)
            res.send(200)
        })
        .catch(next)
})

router.delete('/:productId', (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            product.destroy({});
            res.send(201)
        })
        .catch(next);
});