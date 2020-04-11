import environment from './environment';

export const requestModifier = (url, methodType, payload) => {
	const headers = Object.assign({
		'Content-Type': 'application/json'
	}, requestHeaders());

	const request = new Request(`${environment.apiBaseUrl}/${url}`, {
		method: methodType,
		headers: headers,
		body: payload ? JSON.stringify(payload) : null
	});
	return request;
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