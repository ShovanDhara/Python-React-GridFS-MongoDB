import { requestModifier, httpService } from './apiUtility'

class UserApi {

	static createUser(user) {
		const request = requestModifier('register', 'POST', user);
		return httpService(request);
	};

	static loginUser(user) {
		const request = requestModifier('login', 'POST', user);
		return httpService(request);
	};

	static loadUser(user) {
		const request = requestModifier('refresh', 'GET');
		return httpService(request);
	};

	// static updateUser(user) {
	// 	const headers = Object.assign({
	// 		'Content-Type': 'application/json'
	// 	}, this.requestHeaders());

	// 	const request = new Request(`${environment.apiBaseUrl}/login`, {
	// 		method: 'PUT',
	// 		headers: headers,
	// 		body: JSON.stringify({
	// 			user: user
	// 		})
	// 	});

	// 	return fetch(request)
	// 		.then(response => {
	// 			return response.json();
	// 		}).catch(error => {
	// 			return error;
	// 		});
	// };

	// static deleteUser(user) {
	// 	const headers = Object.assign({
	// 		'Content-Type': 'application/json'
	// 	}, this.requestHeaders());

	// 	const request = new Request(`${process.env.API_HOST}/users/${user.id}`, {
	// 		method: 'DELETE',
	// 		headers: headers
	// 	});

	// 	return fetch(request)
	// 		.then(response => {
	// 			return response.json();
	// 		}).catch(error => {
	// 			return error;
	// 		});
	// };
}

export default UserApi;