import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, isAdmin} = props
console.log("isadmin:",isAdmin)
  return (
    <div>
      <h1>Drone Shop</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              { isAdmin
              ?
              <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
              <Link to ="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/userManagement"> Manage Users </Link>
               <Link to="/productManagement"> Manage Products </Link>
              </div>
              :
              <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
              <Link to ="/products">Products</Link>
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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
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
