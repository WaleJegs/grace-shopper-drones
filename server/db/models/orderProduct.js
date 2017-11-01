const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('orderProduct', {
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
})

module.exports = OrderProduct;