const router = require('express').Router()
const { User, Product, Cart } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    User.findAll({
            // explicitly select only the id and email fields - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            attributes: ['id', 'email']
        })
        .then(users => {
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

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.json(user.id)
        })
        .catch(next);
});

router.post('/cart',(req,res,next)=>{
    console.log(req.body)
    User.findOrCreate(req.body)
    .spread((user, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
    .catch(next)
})

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

// router.post('/:userId/cart/:productId', (req, res, next) => {
//     let cart = [Product.findById(req.params.productId), User.findById(req.params.userId)]
//     Cart.create({
//       where: {
//         sessionId: this.id
//       }
//     })
//     .then(cart => {
//       req.session.id = cart.id
//     })
//     .then
//     Promise.all(cart)
//       .then([product, user] => {

//         })
//       })
// })