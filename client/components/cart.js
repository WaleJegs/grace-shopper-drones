import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import {auth} from '../store/user'
import {connect} from 'react-redux'
import { checkoutCart } from '../store/product'

 class Cart extends Component{
   constructor(props){
       super(props)

   }

    render(){
        console.log("cart:",this.props.cart)
        let arr=window.localStorage.getItem('cart').split('-')

        const cart=this.props.cart
        const newcart= function newcart(arg){
          let obj={}
          for(var i=0;i<arg.length;i++){
            if(obj[arg[i]]) obj[arg[i]]=obj[arg[i]]+1
            else obj[arg[i]]=1
          }
          return obj
        }
        let objcart=newcart(cart)

        function turnToArray(obj){
          let final=[]
          for(let i in obj){
            final.push(i+"/"+obj[i])
          }
          return final
        }

        let finalCart =turnToArray(objcart)
        console.log("finalcart:",finalCart)

        return(
           <div>
             <tr>
              <th> Product name </th>
              <th> Price </th>
              <th> Quantity </th>
            </tr>

            <div>
            {
            finalCart.length>0 &&finalCart.map((item)=>{
              return (<tr key={item.id}>
                      <th>{item.split("/")[0].split('-')[3]}</th>
                      <th>{item.split("/")[0].split('-')[2]}</th>
                      <th>{item.split('/')[1]}</th>
                    </tr>)
            })
            }
            </div>

            {
              this.props.user.email ? (<button onClick ={ (e) => {
                window.localStorage.setItem("cart", "");
                this.props.checkoutCart(finalCart, this.props.user.id)
              }} >Checkout</button>) :
            (<form onSubmit={this.handleSubmit}>
              <h1>Please login inorder to checkout </h1>

             </form >)

            }

           </div>
        )

    }

}

const mapStateToProps = state => {
    return {user: state.user, cart: state.product.cart}
 }

 const mapDispatchToProps = ({ checkoutCart })


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
