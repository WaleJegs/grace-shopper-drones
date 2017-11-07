import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

function Review (props) {
    return (
    <div className='review'>
        <div className='review-stars'>
            Rating: {props.review.stars}
        </div>
        <div className='review-text'>
            Comments: {props.review.text}
        </div>
    </div>
    )
}

export default Review;
