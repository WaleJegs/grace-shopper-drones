import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import {auth} from '../store/user'
import {connect} from 'react-redux'

 class Cart extends Component{
   constructor(props){
       super(props)
  
   }

   componentDidMount(){

   }


    render(){
        console.log(this.props.user)
        let arr=window.localStorage.getItem('cart').split('-')
        console.log(arr)
        return(
           <div>
            <div>{"name "+arr[0]+ "price:"+ arr[1]+arr[2]}</div>
            { 
              this.props.user.email ? (<button>Checkout</button>) :
            (<form onSubmit={this.handleSubmit}>
              <label> Email:
                <input type="text" ref={(input)=>this.input=input} />
              </label>
                <input type="submit" value="Check Out" />
             </form >)
               
            }
            
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {user: state.user}
 }


export default connect(mapStateToProps)(Cart)