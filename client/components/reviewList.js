import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import Review from './review'

class ReviewList extends Component{
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                <h1> Product Reviews </h1>
                {this.props.listOfReviews ? 
                this.props.listOfReviews.map(review => {
                    return (
                        <Review key={review.id} review={review} />
                    )
                }) 
                : 
                <div> No Reviews Yet </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { listOfReviews: state.product.singleProduct.reviews }
}

export default connect(mapStateToProps)(ReviewList);