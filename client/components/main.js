import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {saveCartThunk,fetchUserCartThunk} from '../store/product'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const {children, handleClick, isLoggedIn, isAdmin,id,cart} = props
 
  return (
    <div className='main'>
      <h1>! Drone Zone !</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              { isAdmin
              ?
              <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={(event) => handleClick(event, cart, id)}>Logout</a>
              <Link to ="/products">Products</Link>
              <Link to="/orderHistory">Orders</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/productManagement"> Manage Products </Link>
              <Link to="/orderManagement"> Manage Orders </Link>
              </div>
              :
              <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={(event) => handleClick(event, cart, id)}>Logout</a>
              <Link to ="/products">Products</Link>
              <Link to="/orderHistory">Orders</Link>
              <Link to="/cart">Cart</Link>
              </div> }
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to ="/products">Products</Link>
              <Link to="/cart">Cart</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
   isAdmin: state.user.isAdmin || false,
    cart: state.product.cart,
    id: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (event,cart,id) {
      dispatch(saveCartThunk(cart,id))
      dispatch(logout())
      
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.array,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
