const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    userId: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
    },
    address: {
        type: Sequelize.STRING
    }
})

module.exports = Order;
