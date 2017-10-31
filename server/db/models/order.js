const Sequelize = require('sequelize');
const db = require('../db');

const Order= db.define('order', {
    receipt: {
      type:Sequelize.ARRAY(Sequelize.JSON)
  }
})

module.exports= Order