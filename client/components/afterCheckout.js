import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

class AfterCheckout extends Component{
    constructor(props){
        super(props)
    }


    render(){
        console.log(this.props.newOrder)
        return(
            <div>
            <h1>Your Order Has Been Sucessully Placed!!!</h1>
            <div>order id: {}</div>
            <div>shipping address:{}</div>
            <div>purchased product:{}</div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {newOrder: state.propduct.newOrder}
}

export default connect(mapStateToProps)(AfterCheckout)