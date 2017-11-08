import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchProductList, addProductThunk} from '../store/product'


class productMgmt extends Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
      this.props.fetchProductList()
    }

    handleSubmit(evt){
      evt.preventDefault()
      let product = {
        name: evt.target.productName.value,
        price: evt.target.price.value,
        picture: evt.target.picture.value,
        description: evt.target.description.value,
        quantity: evt.target.quantity.value
      }
      let check = true
      for (var attr in product){
        if (product[attr] === '') check = false;
      }
      if (check) this.props.addProductThunk(product)
    }

    render(){
        return (
            <div>
             <form onSubmit={this.handleSubmit} >
              <div>
                <label> Product Name </label>
                <input placeholder = "name" type = "text" name ="productName" />
              </div>
              <div>
                <label> Price </label>
                <input placeholder = "price" type = "text" name ="price" />
              </div>
              <div>
                <label> Picture </label>
                <input placeholder = "picture" type = "text" name ="picture" />
              </div>
              <div>
                <label> Description </label>
                <input placeholder = "description" type = "text" name ="description" />
              </div>
              <div>
                <label> Quantity </label>
                <input placeholder = "quantity" type = "text" name ="quantity" />
              </div>
              <div>
                <button type = "submit" > Add Product </button>
              </div>
            </form>
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

const mapDispatchToProps = ({fetchProductList, addProductThunk})

export default connect(mapStateToProps, mapDispatchToProps)(productMgmt)
