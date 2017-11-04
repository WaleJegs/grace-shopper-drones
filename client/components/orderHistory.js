import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/product'

class orderHistory extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        this.props.fetchOrderHistory(4);
    }

    render () {
        return (
            <div>
                <h1> Order History </h1>
                <div> 
                { 
                    this.props.orderHistory.map(order => {
                        return (
                            <div key={order.id}> {"Order Id: " + order.id}
                                <ul>
                                    {order.products.map(item => {
                                       return ( <li key={item.id}> {item.name}
                                        </li>
                                       )
                                    })}
                                </ul>
                            </div>
                        )
                    })
                } 
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { orderHistory: state.product.orderHistory }
}

const mapDispatchToProps = ({fetchOrderHistory});

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory)