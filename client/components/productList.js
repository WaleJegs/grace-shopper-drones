import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList,fetchUserCartThunk} from '../store/product'


class productList extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        console.log("useridd",this.props.id)
      this.props.fetchProductList()   
    //   this.props.fetchUserCartThunk(this.props.id)
    }

    render(){
        return (
            <div>
            {
                this.props.listOfProducts.length && this.props.listOfProducts.map( product => {
                    return (
                    <div key= {product.id}>
                      <Link to={`/products/${product.id}`}>
                        <li >
                        {"Product Name: " + product.name + ' ' +"Product Price: " +product.price}
                        </li>
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
