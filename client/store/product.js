import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCT_LIST = "GET_PRODUCT_LIST"
const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"
const GET_ORDER_HISTORY = "GET_ORDER_HISTORY"
const ADD_TO_CART = "ADD_TO_CART"
const CHECKOUT = "CHECKOUT"
const PLACE_NEW_ORDER = "PLACE_NEW_ORDER"
const INCREASE_QUANTITY="INCREASE_QUANTITY"
const DECREASE_QUANTITY="DECREASE_QUANTITY"
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const GET_USER_CART= 'GET_USER_CART'
const SAVE_CART= 'SAVE_CART'

const initialState = {
    products: [],
    singleProduct: {},
    newProduct: {},
    cart: [],
    orderHistory: [],
    newOrder: {}
}

//ACTION CREATORS
export function saveCart(cart){
    const action = { type: SAVE_CART, cart}
    return action
}

export function getUserCart(cart){
    const action = { type: GET_USER_CART, cart}
    return action
}

export function decreaseQuantity(item){
    const action = { type : DECREASE_QUANTITY, item }
    return action
}
export function increaseQuantity(item){
    const action = { type : INCREASE_QUANTITY, item }
    return action
}
export function placeNewOrder(order){
    const action = { type: PLACE_NEW_ORDER, order }
    return action
}
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
export function saveCartThunk(cart,userId){
    var result = {"products" : {} }
    cart.map(product => result.products[parseInt(product.split("/")[0].split('-')[1])] = product.split("/")[1])
    return function(dispatch){
        return axios.post('/api/users/saveCart',result)
        .then(res=>res.data)
        .then(() => {           
            const action = checkout([]);
            dispatch(action)
        });
    }
}

// export function fetchUserCartThunk(userId){
//     return function(dispatch){
//         return axios.get('/api/order')
//         .then(res => res.data)
//         .then(cart=>{
//             cart=cart.filter((order)=> order.userId===userId && order.status==='pending')
//             return cart
//         }) 
//         .then((cart)=>{
//             axios.get()
//         })      
//     }
// }
export function decreaseByOne(item){
    return function(dispatch){
        const action = decreaseQuantity(item)
        dispatch(action)
    }
}
export function increaseByOne(item){
    return function(dispatch){
        const action = increaseQuantity(item)
        dispatch(action)
    }
}
export function placeOrder(order){
    return function(dispatch){
        const action = placeNewOrder(order)
        dispatch(action)
    }
}

export function checkoutCart(cart, userId,address) {
    var result = {"userInfo" : { 'address': address},
                "products" : {}}
    cart.map(product => result.products[parseInt(product.split("/")[0].split('-')[1])] = product.split("/")[1])
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
                history.push('/products')
                history.push('/productManagement')
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
        case GET_USER_CART:
        return Object.assign({},state,{cart :action.cart})

        case DECREASE_QUANTITY:
        return Object.assign({},state,{cart :state.cart.slice(0,state.cart.indexOf(action.item)).concat(state.cart.slice(state.cart.indexOf(action.item)+1))})

        case INCREASE_QUANTITY:
            return Object.assign({},state,{cart :[...state.cart, action.item]})

        case PLACE_NEW_ORDER:
            return Object.assign({}, state, { newOrder: action.order })

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