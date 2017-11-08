const router = require('express').Router()
const { User, Product, Order, orderProducts } = require('../db/models')
module.exports = router




router.get('/', (req, res, next) => {
    User.findAll({
            // explicitly select only the id and email fields - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            attributes: ['id', 'email']
        })
        .then(users => {
            console.log("logged in",users)
            res.json(users)
        })
        .catch(next)
})


router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, {
            attributes: ['id', 'email']
        })
        .then((user) => {
            res.json(user)
        })
        .catch(next);
});


//get all orders if user is admin, otherwise get just orders for the logged in user
router.get('/:userId/orderHistory', (req, res, next) => {
    User.findById(req.params.userId)
        .then(foundUser => {
            if (Number(req.session.passport.user) === Number(req.params.userId) && foundUser.dataValues.isAdmin) {
                console.log('admin user');
                Order.findAll({
                    include: [{ all: true }]
                })
                .then(orders => res.send(orders))
                .catch(next);
            }
            else if (Number(req.session.passport.user) === Number(req.params.userId)) {
                console.log('reulgar user');
                Order.findAll({
                    where: {
                        userId: Number(req.params.userId)
                    }, 
                    include: [{ all: true }]
                })
                .then(orders => res.send(orders))
                .catch(next);
            } else {
                res.send([]);
            }
        })
})

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.json(user.id)
        })
        .catch(next);
});

router.put('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            user.update(req.body)
            res.send(200)
        })
        .catch(next)
})

router.delete('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            user.destroy({});
            res.send(201)
        })
        .catch(next);
});

router.post('/saveCart',(req,res,next)=>{
    Order.create({  
        userId: req.session.passport.user,
        status: 'pending'
    })
    .then(order => {
        return Product.findAll({
                where: {
                    id: {
                        $in: Object.keys(req.body.products).map(key => parseInt(key))
                    }
                }
            })
            .then(products => {
                return products.map(pro => order.addProduct(pro, { through: { quantity: req.body.products[pro.id], price: pro.price, userId: req.params.userId } }))
            })
            .then(ops => {
                return Promise.all(ops)
            })
    })
    .then(orderProducts => {
        res.json(orderProducts)
    })
    .catch(next)
})


router.post('/:userId/cart', (req, res, next) => {
    Order.create({
            userId: req.params.userId,
            status: 'complete',
            address: req.body.userInfo.address
        })
        .then(order => {
            return Product.findAll({
                    where: {
                        id: {
                            $in: Object.keys(req.body.products).map(key => parseInt(key))
                        }
                    }
                })
                .then(products => {
                    return products.map(pro => order.addProduct(pro, { through: { quantity: req.body.products[pro.id], price: pro.price, userId: req.params.userId } }))
                })
                .then(ops => {
                    return Promise.all(ops)
                })
        })
        .then(orderProducts => {
            res.json(orderProducts)
        })
})

