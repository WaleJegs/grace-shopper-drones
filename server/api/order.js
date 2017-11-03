const router = require('express').Router()
module.exports = router

import { OrderProduct, Order } from '../db/models';

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