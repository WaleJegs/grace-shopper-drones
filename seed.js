const db = require('./server/db');
const crypto = require('crypto')
const { Product } = require('./server/db/models')
const { User } = require('./server/db/models')
const { Order } = require('./server/db/models')
const { OrderProduct } = require('./server/db/models')
const { Review } = require('./server/db/models')

db.sync({ force: true })
    .then(() => {
        console.log('Seeding database')
        return User.bulkCreate([{
            email: 'Bob.Billups@yahoo.com',
            password: 'password'
        }, {
            email: 'LarryLawrence@gmail.com',
            password: 'asdf'
        }, {
            email: 'PeterPauslon@aol.com',
            password: 'qwer'
        }, {
            email: 'Admin@Admin.com',
            password: 'Admin',
            isAdmin: true
        }])
    })
    .then(() => {
        return Product.bulkCreate([{
            name: 'RTF Drone',
            price: 1000,
            picture: 'http://drones.oofind.com/wp-content/uploads/sites/3/2015/11/Storm-Racing-Drone-RTF-Type-A-v2.jpg',
            description: ' Ready to fly drone. Comes completely assembled and sufficiently charged to fly for one hour. Charging before flying is highly recommended.',
            quantity: 1000
        }, {
            name: 'GPS Drone',
            price: 1800,
            picture: 'http://www.dronesglobe.com/wp-content/uploads/2017/04/hubsan_h501s_web-1.jpg',
            description: 'Equipped with GPS and surveillance system. Can be fitted with a camera if being used for surveillance.',
            quantity: 1000
        }, {
            name: 'Delivery Drone',
            price: 2500,
            picture: 'https://cdn.technologyreview.com/i/images/deliverydrone.jpg?sw=1400',
            description: 'Heavy duty helicopter drone. Carries packages up to 15 kg.',
            quantity: 1000
        }, {
            name: 'Endurance Drone',
            price: 5000,
            picture: 'https://skyfront.com/wp-content/uploads/2017/09/Tailwind-Iso-1030x469.pnghttps://cdn.technologyreview.com/i/images/deliverydrone.jpg?sw=1400',
            description: 'Tailwind hybrid electric drone with 4.5 hours endurance and 3 kg payload capacity',
            quantity: 1000
        }, {
            name: 'Racing Drone',
            price: 900,
            picture: 'https://hobbyking.com/media/catalog/product/cache/1/image/565x414/9df78eab33525d08d6e5fb8d27136e95/legacy/catalog/82905_6__5.jpg',
            description: 'The RTF (Ready to Fly) Lumenier Carbon Fiber QAV-R FPV Racing Quadcopter (5"). Fully built and professionally tuned. Includes FrSky X4R receiver.',
            quantity: 1000
        }, {
            name: 'Photography Drone',
            price: 550,
            picture: 'https://op-cdn-madavor.netdna-ssl.com/2017/08/Karma_0_HERO5_Black_master-600x287.jpg',
            description: '35.5 ounce drone measuring 14.4 inches long by 8.5 inches wide by 3.5 inches tall. Easy to transport with up to 20 minutes runtime',
            quantity: 1000
        }])
    })
    .then(() => {
        return Order.bulkCreate([{
            userId: 1,
            status: 'complete'
        }, {
            userId: 2,
            status: 'complete'
        }, {
            userId: 3,
            status: 'complete'
        }, {
            userId: 1,
            status: 'complete'
        }])
    })
    .then(() => {
        return OrderProduct.bulkCreate([{
            price: 15,
            quantity: 2,
            productId: 1,
            orderId: 1 
        }, {
            price: 30,
            quantity: 4,
            productId: 3,
            orderId: 1
        }, {
            price: 20,
            quantity: 1,
            productId: 3,
            orderId: 2
        }, {
            price: 50,
            quantity: 5,
            productId: 4,
            orderId: 2
        }])
    })
    .then(() => {
        return Review.bulkCreate([{
            text: 'Great drone! Getting a bunch for Christmas!',
            stars: 5,
            userId: 1,
            productId: 2
        }, {
            text: 'Mediocre, not super impressed by it\'s navigating abilities',
            stars: 3,
            userId: 2,
            productId: 2
        }, {
            text: 'The worst ever!!!!!! Never get this thing!',
            stars: 1,
            userId: 3,
            productId: 2
        }])
    })
    .then(() => {
        console.log('database seeded')
        db.close();
        return null;
    })