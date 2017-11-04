import React,{Component} from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom';
export default class PList extends Component{
 constructor(){
     super()
     this.state={
        listOfProducts: []
    }
 }

 componentDidMount(){
    axios.get('/api/products')
    .then(res => res.data)
    .then(listOfProducts => {
        this.setState({listOfProducts})
    });
 }
 render(){
    console.log(this.state)
     return(
        
        <div>
        {
            this.state.listOfProducts.length && this.state.listOfProducts.map( product => {
                return (
                <div key= {product.id}>
                  <Link to={`/product/${product.id}`}>
                    <li style={{backgroundImage: `url(${product.picture && product.picture})`, height: '612px', width: '860px'}}>
                    {'Item Name: ' + product.name + ' ' + 'Item Price: '+ product.price}
                    </li>
                  </Link>
                </div>)
            })
        }
    </div>
     )
 }

}