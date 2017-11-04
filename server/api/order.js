const router = require('express').Router()
module.exports = router

const { OrderProduct, Order }=require( '../db/models');

router.get('/', (req, res, next) => {
    Order.findAll({})
        .then(orders => {
            res.json(orders)
        })
        .catch(next)
})

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