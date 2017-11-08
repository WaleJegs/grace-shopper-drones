/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
        beforeEach(() => {
            return db.sync({ force: true })
        })

        describe('instanceMethods', () => {
                describe('attributes', () => {
                        let drone

                        beforeEach(() => {
                            return Product.create({
                                    name: 'A Drone That Drones Man',
                                    price: 100,
                                    picture: 'thisisnotreallyapicture=)',
                                    description: 'please refer to name',
                                    quantity: 1000
                                })
                                .then(product => {
                                    drone = product
                                })
                        })

                        it('returns true if the price is correct', () => {
                            expect(drone.price).to.equal(100)
                        })

                        it('returns true if the quantity is correct', () => {
                            expect(drone.quantity).to.be.equal(1000)
                        })

                        it('returns true if the name is correct', () => {
                            expect(drone.name).to.be.equal('A Drone That Drones Man')
                        })

                        it('returns true if the description is correct', () => {
                            expect(drone.description).to.be.equal('please refer to name')
                        })

                    }) // end describe('correctPrice')
            }) // end describe('instanceMethods')
    }) // end describe('Product model')