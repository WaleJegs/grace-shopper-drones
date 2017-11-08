const router = require('express').Router()
module.exports = router;

const { OrderProduct, Order, Product } = require('../db/models');

router.get('/', (req, res, next) => {
    Order.findAll({})
        .then(orders => {
            res.json(orders)
        })
        .catch(next)
})

router.get('/getcart',(req,res,next=>{
    Order.findAll({})
    .then(orders => {
        res.json(orders)
    })
    .catch(next)
}))

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            OrderProduct.findAll({
                where: {
                    orderId: order.id
                }
            })
        })
        .catch(next);
})

router.post('/:checkout', (req, res, next) => {
    Order.create({
            userId: req.user.id
        })
        .then(order => {
            res.json(order)
        })
        .catch(next)
});

router.get('/user/:userId', (req, res, next) => {
    Order.findAll({
            where: {
                userId: req.params.userId
            }
        })
        .then(orders => {
            res.json(orders)
        })
        .catch(next)
});