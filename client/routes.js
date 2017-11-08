import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch,Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome} from './components'
import {me} from './store'
import  ProductList  from "./components/productList"
import ProductMgmt from './components/productMgmt'
import SingleProduct from './components/singleProduct'
import EditProduct from './components/editProduct'
import Cart from './components/cart'
import OrderHistory from './components/orderHistory'
import AfterCheckout from './components/afterCheckout'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin } = this.props

    return (
      <div>
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:productId" component={ SingleProduct} />
            <Route path="/cart" component={Cart} />
           
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route path="/orderHistory" component={OrderHistory} />
                  <Route path="/afterCheckout" component={AfterCheckout} />
                  { isAdmin &&
                      <Switch>
                        <Route path ="/userManagement" component = {ProductList} />
                        <Route path ="/productManagement" component = {ProductMgmt} />
                        <Route path ="/products/edit/:productId" component = {EditProduct} />
                      </Switch>
                  }
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
