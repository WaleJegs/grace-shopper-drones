import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk, editProductThunk, deleteProductThunk} from '../store/product';

class editProduct extends Component{

    constructor(props){
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
      this.props.getSingleProductThunk(parseInt(this.props.match.params.productId))
    }

    handleSubmit(evt, oldProduct){
      evt.preventDefault();
      let update = { id: this.props.singleProduct.id,
                     name: evt.target.productName.value,
                     price: evt.target.price.value,
                     picture: evt.target.picture.value,
                     description: evt.target.description.value,
                     quantity: evt.target.quantity.value
                    }
        if (this.props.singleProduct !== update){
          console.log(update)
          this.props.editProductThunk(this.props.singleProduct.id, update)
        }
      }

    handleClick(evt){
      evt.preventDefault();
      this.props.deleteProductThunk(this.props.singleProduct.id)
    }

    render(){
       const product = this.props.singleProduct
        return (
          <div>
              {`Product Name: ${product.name}`} <br />
              {`Product Price: ${product.price}`}<br />
              {`Stock: ${product.quantity}`} <br />
              {`Description: ${product.description}`} <br />
              <img src= {product.picture} /> <br />

            <form onSubmit = {(event) => { this.handleSubmit(event, product)} }>
              <div>
                <label> Product Name </label>
                <input defaultValue = {product.name && product.name} name="productName" type="text" />
              </div>
              <div>
                <label> Price </label>
                <input defaultValue = {product.price && product.price } name="price" type="text" />
              </div>
              <div>
                <label> Picture </label>
                <input defaultValue = {product.picture && product.picture} name="picture" type="text" />
              </div>
              <div>
                <label> Description </label>
                <input defaultValue = {product.description && product.description} name="description" type="text" />
              </div>
              <div>
                <label> Stock </label>
                <input defaultValue = {product.quantity && product.quantity} name="quantity" type="text" />
              </div>
              <div>
                <button type = "submit"> Change Product </button>
              </div>
              <div>
                <button onClick={this.handleClick}> Delete Product> </button>
              </div>
            </form>
          </div>
        )
    }
}


const mapStateToProps = state => {
  return { singleProduct: state.product.singleProduct }
}

const mapDispatchToProps = ({getSingleProductThunk, editProductThunk, deleteProductThunk})

export default connect(mapStateToProps, mapDispatchToProps)(editProduct)
