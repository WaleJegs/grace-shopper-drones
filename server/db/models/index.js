const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const OrderProduct = require('./orderProduct')
    /**
     * If we had any associations to make, this would be a great place to put them!
     * ex. if we had another model called BlogPost, we might say:
     *
     *    BlogPost.belongsTo(User)
     */

User.hasMany(Order, { onDelete: 'CASCADE', hooks: true })

Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

User.hasMany(Review, { onDelete: 'CASCADE' });
Product.hasMany(Review, { onDelete: 'CASCADE' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
    User,
    Order,
    Product,
    OrderProduct
}