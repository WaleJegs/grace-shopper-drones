const Sequelize = require('sequelize');
const db = require('../db');

const CartProduct = db.define('cartProduct', {
    quantity: Sequelize.INTEGER
})

module.exports = CartProduct;