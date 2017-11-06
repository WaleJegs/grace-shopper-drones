import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk,addToCartAction} from '../store/product'

class SingleProduct extends Component{
    constructor(props){
        super(props)
        this.handleClick=this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.getSingleProductThunk(parseInt(this.props.match.params.productId))
      }

    handleClick(e){
        if (!window.localStorage.getItem("cart")){
            window.localStorage.setItem("cart", "next-"+this.props.singleProduct.id+"-"+this.props.singleProduct.price+"-"+this.props.singleProduct.name)
            this.props.addToCartAction(window.localStorage.getItem('cart'))
            console.log(window.localStorage.getItem("cart"))
        } else {
            let currentCart = window.localStorage.getItem("cart");
            window.localStorage.setItem("cart", "next"+"-"+this.props.singleProduct.id+"-"+this.props.singleProduct.price+"-"+this.props.singleProduct.name+"/" + currentCart)
            this.props.addToCartAction(window.localStorage.getItem('cart').split('/')[0])
        }
    }
    render(){

        const product = this.props.singleProduct


        return (
        <div>
            {
              "name: " + product.name + " price: "+product.price + " description :"+ product.description
            }
              <img src={product.picture} />
              <button onClick={this.handleClick}>Add To Cart </button>

        </div>
        )
    }
}



const mapStateToProps = state => {
    return { singleProduct: state.product.singleProduct, cart: state.product.cart}
 }

 const mapDispatchToProps = ({getSingleProductThunk, addToCartAction})

 export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
