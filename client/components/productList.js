import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList,fetchUserCartThunk} from '../store/product'


class productList extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div className='productList'>
            {
                this.props.listOfProducts.length && this.props.listOfProducts.map( product => {
                    return (
                    <div className='productList-product' key= {product.id}>
                      <Link to={`/products/${product.id}`}>
                        <div>
                            <div>
                                <span className='label'> Name: </span>
                                <span> {product.name} </span>
                            </div>
                            <div>
                                <span className='label'> Price: </span>
                                <span> {product.price} </span>
                            </div>
                        </div>
                        <img src={product.picture} />
                      </Link>
                     
                    </div>)
                })
            }
        </div>
        )
    }
}


const mapStateToProps = state => {
   return { listOfProducts: state.product.products,id:state.user.id }
}

const mapDispatchToProps = ({fetchProductList,fetchUserCartThunk})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
