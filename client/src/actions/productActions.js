import * as types from './actionTypes';
import ProductApi from '../api/productApi';
import { beginAjaxCall, ajaxCallError, ajaxCallSuccess } from './ajaxCallStatusAction';
import { statusIsError, statusIsSuccess } from './statusAction';

export function createProductSuccess(product) {
    return { type: types.CREATE_PRODUCT_SUCCESS, product };
}
export function updateProductSuccess(product) {
    return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}
export function loadProductSuccess(products) {
    return { type: types.LOAD_PRODUCT_SUCCESS, products };
}
export function fetchProductSuccess() {
    return { type: types.FETCH_PRODUCT_SUCCESS };
}
export function productError() {
    return { type: types.PRODUCT_CRUD_ERROR };
}

export const loadProducts = () => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.getAllProducts().then(products => {
            dispatch(loadProductSuccess(products.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(productError());
            dispatch(statusIsError(error));
        });
    };
};

export const findProduct = (id) => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.findProduct(id).then(product => {
            dispatch(fetchProductSuccess());
            dispatch(statusIsSuccess('Product fetched successfully'));
            if (product.data) {
                return product.data
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(productError());
            dispatch(statusIsError(error));
        });
    };
};

export const createProduct = product => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.createNewProduct(product).then(product => {
            dispatch(createProductSuccess(product.data));
            dispatch(statusIsSuccess('Product created successfully'));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(productError());
            dispatch(statusIsError(error));
        });
    };
};

export const createProductImage = imagedata => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.createNewProductImage(imagedata).then(response => {
            dispatch(statusIsSuccess('Image created successfully'));
            return response  
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(statusIsError(error));
        });
    };
};

export const deleteProduct = product => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.deleteProduct(product).then(res => {
            dispatch(ajaxCallSuccess());
            if (res) {
                dispatch(statusIsSuccess('Product deleted successfully'));
                return res;
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(productError());
            dispatch(statusIsError(error));
        });
    };
};

export const updateProduct = (updatedProduct, product_id) => {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return ProductApi.updateProduct(updatedProduct, product_id).then(product => {
            if (product) {
                dispatch(updateProductSuccess(product));
                dispatch(statusIsSuccess('Product updated successfully'));
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            dispatch(productError());
            dispatch(statusIsError(error));
        });
    };
};