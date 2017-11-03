import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/product'

class SingleProduct extends Component{
    constructor(props){
        super(props)
        this.handleClick=this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.getSingleProductThunk(parseInt(this.props.match.params.productId))  
      }

    handleClick(e){

        window.localStorage.setItem("cart",this.props.singleProduct.id+"-"+this.props.singleProduct.name+"-"+this.props.singleProduct.price)
        console.log(window.localStorage.getItem("cart"))
    }
    render(){
        
        const product=this.props.singleProduct

        return(
        <div>
            {
              "name: "+ product.name + " price: "+product.price + " description :"+ product.description 
            }
              <img src={product.picture} />
              <button onClick={this.handleClick}>Add To Cart </button>

        </div>
        )
    }
}



const mapStateToProps = state => {
    return { singleProduct: state.product.singleProduct }
 }
 
 const mapDispatchToProps = ({getSingleProductThunk})
 
 export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
 