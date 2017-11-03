import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/product'

class SingleProduct extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getSingleProductThunk(parseInt(this.props.match.params.productId))  
      }

    render(){
        console.log("in product",this.props)
        const product=this.props.singleProduct

        return(
        <div>
            {
              "name: "+ product.name + " price: "+product.price + " description :"+ product.description 
            }
              <img src={product.picture} />

        </div>
        )
    }
}



const mapStateToProps = state => {
    return { singleProduct: state.product.singleProduct }
 }
 
 const mapDispatchToProps = ({getSingleProductThunk})
 
 export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
 