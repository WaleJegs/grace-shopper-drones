import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import {auth} from '../store/user'
import {connect} from 'react-redux'
import { checkoutCart,placeOrder } from '../store/product'

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
        function totalQuantity(arr){
          let quantity=0
          arr.map((product)=>{
            quantity+=parseInt(product.split('/')[1])
          })
          return quantity
        }

        function totalPrice(arr){
          let total=0
          arr.map((product)=>{
            total+=parseInt(product.split("-")[2])*parseInt(product.split('/')[1])
          })
          return total
        }

        let finalCart =turnToArray(objcart)
        let quantity = totalQuantity(finalCart)
        let finalPrice= totalPrice(finalCart)

        let street;
        let city;
        let state;
        let zipcode;
 
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
            <div>Quantity:{quantity}</div>
            <div>Total:{finalPrice}</div>

            {
              this.props.user.email ? 
              
              (<div>
                <div>
                  <h2>Shipping Address</h2>
                  <div><label>Street address: </label></div>
                  <div><input onChange = {(e)=> { street = e.target.value }} /></div>
                  <div><label>City : </label></div>
                  <div><input  onChange={(e)=> { city = e.target.value}} /></div>
                  <div><label>State : </label></div>
                  <div> <input onChange={(e)=> { state = e.target.value}} /></div>
                  <div><label>Zip code : </label></div>
                  <div> <input onChange={(e)=> { zipcode = e.target.value 
                  console.log(street,city,state,zipcode)}}  /></div>
                </div>
                <Link to="/afterCheckout">
                <button onClick ={ (e) => {
                window.localStorage.setItem("cart", "");
                let address = street + "/" + city + "/" + state +"/"+zipcode
                let newOrder ={"address":address,"cart":finalCart}
                this.props.placeOrder(newOrder)
                this.props.checkoutCart(finalCart, this.props.user.id, address)
                
              }} >Checkout</button>
              </Link>
              </div>)
              :
              (<form >
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

 const mapDispatchToProps = ({ checkoutCart,placeOrder })


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
