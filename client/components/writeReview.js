import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { getSingleProductThunk } from '../store/product'
import axios from 'axios';

class WriteReview extends Component {
    constructor (props) {
        super (props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        //post review to database, then retireve the product to update the store
        event.preventDefault();
        axios.post(`/api/products/review/${this.props.currentProduct.id}`, {text: event.target.textbox.value, stars: event.target.stars.value})
        .then(
            this.props.getSingleProductThunk(parseInt(this.props.currentProduct.id))
        )
    }

    render () {
        return (
        <div className='write-review'>
            <form onSubmit={this.handleSubmit}>
                <div className='write-review-text'>
                    <span className='label'> Your Comments: </span>
                    <textarea name='textbox' />
                </div>
                <div className='write-review-stars'>
                    <span className='label'> Your Rating: </span>
                    <input name='stars' type='range' min='1' max='100' />
                </div>
                <input type='submit' value='Submit Review' />
            </form>
        </div>
        )
    }
}

const mapDispatchToProps = ({getSingleProductThunk})

const mapStateToProps = state => {
    return {currentProduct: state.product.singleProduct}
};

export default connect (mapStateToProps, mapDispatchToProps)(WriteReview); 