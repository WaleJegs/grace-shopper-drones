import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCT_LIST = "GET_PRODUCT_LIST"
const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"
const GET_ORDER_HISTORY = "GET_ORDER_HISTORY"
const ADD_TO_CART = "ADD_TO_CART"
const CHECKOUT = 'CHECKOUT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

const initialState = {
    products: [],
    singleProduct: {},
    newProduct: {},
    cart: [],
    orderHistory: []
}

//ACTION CREATORS
export function checkout(cart) {
    const action = { type: CHECKOUT, cart }
    return action;
}
export function getProductList(productList) {
    const action = { type: GET_PRODUCT_LIST, productList };
    return action;
}

export function getSingleProduct(product) {
    const action = { type: GET_SINGLE_PRODUCT, product }
    return action;
}

export function addProduct(newProduct) {
    const action = { type: ADD_PRODUCT, newProduct }
    return action;
}

export function deleteProduct(product) {
    const action = { type: DELETE_PRODUCT, product }
    return action;
}

export function addToCart(product) {
    const action = { type: ADD_TO_CART, product }
    return action;
}

export function getOrderHistory(orders) {
    const action = { type: GET_ORDER_HISTORY, orders }
    return action;
}

export function editProduct(product) {
    const action = { type: EDIT_PRODUCT, product }
    return action;
}

//THUNK CREATORS
export function checkoutCart(cart, userId) {
    var result = {}
    cart.map(product => result[parseInt(product.split("/")[0].split('-')[1])] = product.split("/")[1])

    return function thunk(dispatch) {
        return axios.post(`/api/users/${userId}/cart`, result)
            .then(res => res.data)
            .then(() => {
                const action = checkout([]);
                dispatch(action)
            });
    }
}

export function editProductThunk(productId, update) {
    return function thunk(dispatch) {
        return axios.put(`/api/products/${productId}`, update)
            .then(res => res.data)
            .then(newProduct => {
                const action = editProduct(newProduct)
                dispatch(action)
            })
            .then(() => {
                history.push('/productManagement')
            })
    }
}

export function fetchProductList() {
    return function thunk(dispatch) {
        return axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
                const action = getProductList(products)
                dispatch(action)
            });
    }
}

export function addToCartAction(product) {
    return function(dispatch) {
        const action = addToCart(product)
        dispatch(action)
    }
}

export function getSingleProductThunk(productId) {
    return function thunk(dispatch) {
        return axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(singleProduct => {
                const action = getSingleProduct(singleProduct)
                dispatch(action)
            })
    }
}

export function addProductThunk(product) {
    return function thunk(dispatch) {
        return axios.post('/api/products/', product)
            .then(res => res.data)
            .then(newProduct => {
                const action = addProduct(newProduct)
                dispatch(action);
            })
    }
}

export function deleteProductThunk(productId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/products/${productId}`)
            .then(res => res.data)
            .then(deletedProduct => {
                const action = deleteProduct(deletedProduct)
                dispatch(action)
            })
            .then(() => {
                history.push('/productManagement')
            })
    }
}

export function fetchOrderHistory(userId) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${userId}/orderHistory`)
            .then(res => res.data)
            .then(orders => {
                const action = getOrderHistory(orders)
                dispatch(action);
            })
    }
}

//REDUCER

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case CHECKOUT:
            return Object.assign({}, state, { cart: action.cart })

        case ADD_TO_CART:
            return Object.assign({}, state, { cart: [...state.cart, action.product] });

        case GET_PRODUCT_LIST:
            return Object.assign({}, state, { products: action.productList });

        case ADD_PRODUCT:
            return Object.assign({}, state, { newProduct: action.newProduct })

        case GET_SINGLE_PRODUCT:
            return Object.assign({}, state, { singleProduct: action.product })

        case GET_ORDER_HISTORY:
            return Object.assign({}, state, { orderHistory: action.orders })

        default:
            return state
    }
}