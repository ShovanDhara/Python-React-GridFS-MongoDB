import { requestModifier, httpService } from './apiUtility'

class ProductApi {

	static getAllProducts() {
		const request = requestModifier('products', 'GET');
		return httpService(request);
	};
	static createNewProduct(product) {
		const request = requestModifier('add_product', 'POST', product);
		return httpService(request);
	};
	static deleteProduct(product) {
		const request = requestModifier(`product/${product.id}`, 'DELETE');
		return httpService(request);
	};
	static updateProduct(updatedData, id) {
		const request = requestModifier(`product/${id}`, 'PUT', updatedData);
		return httpService(request);
	};
	static findProduct(id) {
		const request = requestModifier(`product/${id}`, 'GET');
		return httpService(request);
	};

}

export default ProductApi;