const router = require('express').Router();
const { CartProduct, Product, Cart } = require('../db/models')
module.exports = router;

router.get('/add/:productId', (req, res, next) => {
    Cart.create()
        .then(cart => {
            Product.findById(req.params.productId)
                .then(product => {
                    cart.addProduct(product, { through: { quantity: product.quantity } })
                })
                .catch(next)
            window.localStorage.setItem(cart)
            console.log(localStorage.getItem(cart))
        })
        .catch(next)
});

router.get('/', (req, res, next) => {
    Cart.findAll({})
        .then(carts => {
            console.log(req.session)
            res.json(carts)
        })
})

router.get('/:cartId', (req, res, next) => {
    CartProduct.findAll({
            where: {
                cartId: req.params.cartId
            }
        })
        .then(cartProduct => {
            // let products = []
            // cartProduct.forEach(cp => {
            //     Product.findById(cp.productId)
            //         .then(product => products.push(product))
            //         .catch(next)
            // })
            res.json(cartProduct)
        })
})