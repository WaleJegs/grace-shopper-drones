import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList} from '../store/product'


class productList extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        console.log("mounting")
      this.props.fetchProductList()   
    }


    render(){
        console.log("fectch:",this.props.fetchProductList,"this.props:",this.props)
        return (
            <div>
            {
                this.props.listOfProducts.length && this.props.listOfProducts.map( product => {
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
}


const mapStateToProps = state => {
   return { listOfProducts: state.listOfProducts }
}

const mapDispatchToProps = ({fetchProductList})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
