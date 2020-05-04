import environment from './environment';

export const requestModifier = (url, methodType, payload, type) => {
	const headers = Object.assign({
		'content-type': type ? 'multipart/form-data' : 'application/json'
	}, requestHeaders());

	if (!type) {
		const request = new Request(`${environment.apiBaseUrl}/${url}`, {
			method: methodType,
			headers: headers,
			body: payload ? JSON.stringify(payload) : null
		});
		return request;
	}
	// This request will be returned when to post byte object
	const fileTypeRequest = new Request(`${environment.apiBaseUrl}/${url}`, {
		method: methodType,
		body: payload
	});
	return fileTypeRequest;

}

export const httpService = (data) => {
	return fetch(data)
		.then(handleResponse)
		.then(response => {
			return response.json();
		}).catch(error => {
			throw error;
		});
}

const requestHeaders = () => {
	if (sessionStorage.token) {
		return {
			'Authorization': `Bearer ${sessionStorage.token}`
		};
	} else return
};

const handleResponse = async (response) => {
	if (!response.ok) {
		const error = await response.json().then((err) => {
			return err.message
		})
		throw error
	}
	return response;
}

export default { requestHeaders, httpService };