const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
    user: {
        type: Sequelize.STRING,
        defaultValue: 'unauthenticated'
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'has items'
    }
})

module.exports = Cart;