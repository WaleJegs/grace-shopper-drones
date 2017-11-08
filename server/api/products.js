const router = require('express').Router()
const { Product } = require('../db/models')
const { Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll({})
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId, {include:[{all:true}]})
        .then((product) => {
            res.json(product)
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    if (req.user.isAdmin) {
        Product.create(req.body)
            .then(product => {
                res.json(product)
            })
            .catch(next);
    }
});

router.post('/review/:productId', (req, res, next) => {
    if (req.session.passport.user){
        Review.create({
            text: req.body.text,
            stars: Number(req.body.stars)/20,
            userId: Number(req.session.passport.user),
            productId: Number(req.params.productId)
        })
    } else {
        res.sendStatus(403);
    }
    res.sendStatus(200);
})

router.put('/:productId', (req, res, next) => {
    if (req.user.isAdmin) {
        Product.findById(req.params.productId)
            .then(product => {
                product.update(req.body)
                res.send(200)
            })
            .catch(next)
    }
})

router.delete('/:productId', (req, res, next) => {
    if (req.user.isAdmin) {
        Product.findById(req.params.productId)
            .then(product => {
                product.destroy({});
                res.send(201)
            })
            .catch(next);
    }
});