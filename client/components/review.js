import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
// import {fetchProductList} from '../store/product'


class Review extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
    
    }


    render(){

        return (
            <div>
                
        </div>
        )
    }
}


const mapStateToProps = state => {
   return {  }
}

const mapDispatchToProps = ({})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
