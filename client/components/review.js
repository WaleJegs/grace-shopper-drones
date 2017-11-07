import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

function Review (props) {
    return (
    <div className='review'>
        <div className='review-stars'>
            <span className='label'> Rating: </span>
            <span> {props.review.stars} </span>
        </div>
        <div className='review-text'>
            <span className='label'> Comments: </span>
            <span> {props.review.text} </span>
        </div>
    </div>
    )
}

export default Review;
