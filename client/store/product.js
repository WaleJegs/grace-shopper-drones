import axios from 'axios'

//ACTION TYPES
const GET_PRODUCT_LIST="GET_PRODUCT_LIST"

//ACTION CREATORS
export function getProductList(productList){
    const action = {type: GET_PRODUCT_LIST, productList };
    return action;
}

//THUNK CREATORS
export function fetchProductList(){
    return function thunk(dispatch){
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
              
                const action = getProductList(products)
                dispatch(action)
            });
    }
}

//REDUCER

export default function reducer(state=[], action){

    switch (action.type){

        case GET_PRODUCT_LIST:
            return action.productList;

        default:
            return state
    }
}

