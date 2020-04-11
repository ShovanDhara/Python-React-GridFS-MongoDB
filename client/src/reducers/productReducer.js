import * as types from '../actions/actionTypes';

const initialState = { products: [] };

const products = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_PRODUCT_SUCCESS:
            return state
        case types.UPDATE_PRODUCT_SUCCESS:
            return state
        case types.LOAD_PRODUCT_SUCCESS:
            return action.products;
        case types.PRODUCT_CRUD_ERROR:
            return state;
        case types.LOG_OUT_SUCCESS:
            return [];
        default:
            return state;
    }
}

export default products