import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
// import {loadUser} from './actions/userActions';

const store = configureStore();
if (sessionStorage.token) {
//     this.props.actions.userActions.loadUser()
//             .then((data) => {
//                 if (data) {
//                     this.context.router.history.push('/productList');
//                 }
//             })
//             .catch(error => {
//                console.log(error)
//             });
//    store.dispatch(loadUser())
}
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
