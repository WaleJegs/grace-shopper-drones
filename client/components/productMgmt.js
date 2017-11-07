import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList} from '../store/product'


class productMgmt extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
      this.props.fetchProductList()
    }

    render(){
        return (
            <div>
            {
                this.props.listOfProducts.length && this.props.listOfProducts.map( product => {
                    return (
                    <div key= {product.id}>
                        <li >
                          {`Product Name: ${product.name}`} <br />
                        </li>
                        <Link to={`/products/edit/${product.id}`}>
                          <img src={product.picture} />
                        </Link> <br /> <br />
                    </div>)
                })
            }
        </div>
        )
    }
}


const mapStateToProps = state => {
   return { listOfProducts: state.product.products }
}

const mapDispatchToProps = ({fetchProductList})

export default connect(mapStateToProps, mapDispatchToProps)(productMgmt)
