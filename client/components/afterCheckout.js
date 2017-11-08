import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

class AfterCheckout extends Component{
    constructor(props){
        super(props)
    }


    render(){
        let address = ''
        let products = ['']
        let quantity = ''
        let total = ''
        console.log('new order', this.props.newOrder)
        if (this.props.newOrder.address){
        address = this.props.newOrder.address.split('/')
        products = this.props.newOrder.cart
        quantity = this.props.newOrder.quantity
        total = this.props.newOrder.total
        }

        return (
            <div>
            <h1>Your Order Has Been Placed!!!</h1>
            <div>shipping address:
                <div>{address[0]}</div>
                <div>{address[1]}   </div>
                <div>{address[2]}</div>
                <div>{address[3]}</div>
            </div>
            <div>Order Summary:
            <tr>
              <th> Product name </th>
              <th> Price </th>
              <th> Quantity </th>
            </tr>
            {
                products.map((product) => {
                    return (<tr key={product.id}>
                        <th>{product.split('/')[0].split('-')[3]}</th>
                        <th>{product.split('/')[0].split('-')[2]}</th>
                        <th>{product.split('/')[1]}</th>
                      </tr>)
                })
            }
            </div>
            <div>Total :{total}</div>
            <div>Quantity: {quantity}</div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {newOrder: state.product.newOrder}
}

export default connect(mapStateToProps)(AfterCheckout)
