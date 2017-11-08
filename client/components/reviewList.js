import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import Review from './review'
import WriteReview from './writeReview'

class ReviewList extends Component{
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                <h1> Reviews </h1>
                {this.props.listOfReviews && this.props.listOfReviews.length > 0 ? 
                this.props.listOfReviews.map(review => {
                    return (
                        <Review key={review.id} review={review} />
                    )
                }) 
                : 
                <div> No reviews for this product yet. </div>
                }
                {console.log('adminstate?---', this.props.isAdmin)}
                <WriteReview />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { listOfReviews: state.product.singleProduct.reviews }
}

export default connect(mapStateToProps)(ReviewList);