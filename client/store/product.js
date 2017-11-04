import axios from 'axios'

//ACTION TYPES
const GET_PRODUCT_LIST = "GET_PRODUCT_LIST"
const ADD_PRODUCT="ADD_PRODUCT"
const DELETE_PRODUCT="DELETE_PRODUCT"
const GET_SINGLE_PRODUCT="GET_SINGLE_PRODUCT"
const GET_ORDER_HISTORY="GET_ORDER_HISTORY"
const ADD_TO_CART="ADD_TO_CART"


const initialState = {
    products: [],
    singleProduct: {},
    newProduct: {},
    cart: [],
    orderHistory: []
}

//ACTION CREATORS
export function getProductList(productList){
    const action = {type: GET_PRODUCT_LIST, productList };
    return action;
}

export function getSingleProduct(product){
    const action = { type: GET_SINGLE_PRODUCT, product}
    return action;
}

export function addProduct(newProduct){
    const action = { type: ADD_PRODUCT, newProduct}
    return action;
}

export function deleteProduct(product){
    const action = { type: DELETE_PRODUCT, product }
    return action;
}

export function addToCart(product){
    const action = { type: ADD_TO_CART, product }
    return action;
}

export function getOrderHistory(orders){
    const action = { type: GET_ORDER_HISTORY, orders}
    return action;
}

//THUNK CREATORS
export function fetchProductList(){
    return function thunk(dispatch){
        return axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
                const action = getProductList(products)
                dispatch(action)
            });
    }
}

export function addToCartAction(product){
    return function (dispatch){
        const action = addToCart(product)
        dispatch(action)
    }
}

export function getSingleProductThunk(productId){
    return function thunk(dispatch){
        return axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(singleProduct => {
                const action = getSingleProduct(singleProduct)
                dispatch(action)
            })
    }
}

export function addProductThunk(product){
    return function thunk(dispatch){
        return axios.post('/api/products/', product)
            .then(res => res.data)
            .then(newProduct => {
                const action = addProduct(newProduct)
                dispatch(action);
            })
    }
}

export function deleteProductThunk(productId){
    return function thunk(dispatch){
        return axios.delete(`/api/products/${productId}`)
        .then(res => res.data)
        .then(deletedProduct => {
            const action = deleteProduct(deletedProduct)
            dispatch(action)
        })
    }
}

export function fetchOrderHistory (userId){
    return function thunk(dispatch){
        return axios.get(`/api/users/${userId}/orderHistory`)
            .then(res => res.data)
            .then(orders => {
                const action = getOrderHistory(orders)
                dispatch(action);
            })
    }
}

//REDUCER
const intialState={
    products:[],
    singleProduct:{},
    newProduct:{},
    orderHistory: []
}

export default function reducer( state = initialState, action){

    switch (action.type){

        case ADD_TO_CART:
        return Object.assign({}, state, {cart: [...state.cart, action.product]} );

        case GET_PRODUCT_LIST:
            return Object.assign({}, state, {products: action.productList});
        
        case ADD_PRODUCT:
            return Object.assign({}, state, {newProduct: action.newProduct})

        case GET_SINGLE_PRODUCT:
            return Object.assign({}, state, {singleProduct: action.product})
        
        case GET_ORDER_HISTORY:
            return Object.assign({}, state, {orderHistory: action.orders})

        default:
            return state
    }
}

