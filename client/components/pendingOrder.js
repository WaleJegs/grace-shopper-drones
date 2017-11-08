import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/product'


class pendingOrder extends Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
      this.props.fetchOrderHistory(this.props.user.id)
    }
    render(){
      let orders = this.props.orderHistory.filter(order => order.status === 'pending')
        return (
            <div>
            {   orders.length && orders.map( order => {
                  let products = order.products.map(pro => pro.name).join(', ')
                  let addy = order.address.split('/')
                  let total = order.products.reduce((prev, next) => {
                    return prev + (Number(next.price) * Number(next.quantity))
                  }, 0)
                    return (
                    <div key= {order.id}>
                        <li >
                          {`Order ID : ${order.id}`} <br />
                          {`Date : ${order.createdAt.slice(0, 10)}`} <br />
                          {`Items: \n${products}`} <br />
                          {`Address:`} <br />
                          {`  Street:                     ${addy[0]}`} <br />
                          {`  City:                       ${addy[1]}`} <br />
                          {`  State:                      ${addy[2]}`} <br />
                          {`  Zipcode:                    ${addy[3]}`} <br />
                          {`Total:                        $${total}`}
                        </li>
                    </div>)
                })
            }
              <div>
                <Link to ={'/orders/complete'}>Completed Orders </Link>
              </div>
        </div>
        )
    }
}


const mapStateToProps = state => {
   return { orderHistory: state.product.orderHistory, user: state.user}
}

const mapDispatchToProps = ({fetchOrderHistory})

export default connect(mapStateToProps, mapDispatchToProps)(pendingOrder)
