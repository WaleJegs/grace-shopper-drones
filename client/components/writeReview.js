import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

export default class WriteReview extends Component {
    constructor (props) {
        super (props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
    }

    render () {
        return (
        <div className='write-review'>
            <form onSubmit={this.handleSubmit}>
                <div className='write-review-text'>
                    <span className='label'> Your Comments: </span>
                    <textarea name='text-box' />
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

const mapStateToProps = state => {
    return {}
}