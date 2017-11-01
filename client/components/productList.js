import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList} from '../store/product'


function productList(props){
    const {listOfProducts} = props
    return (
        <div>
            {
                listOfProducts.length && listOfProducts.map( product => {
                    return (
                    <div key= {product.id}>
                      <Link to={`/product/${id}`}>
                        <li style={{backgroundImage: `url(${product.picture && product.picture})`}}>
                        {product.name + ' ' + product.price}
                        </li>
                      </Link>
                    </div>)
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
   return { listOfProducts: state.listOfProducts }
}

const mapDispatchToProps = dispatch => {
    dispatch(fetchProductList)
}

export default connect(mapStateToProps, mapDispatchToProps)(productList)
