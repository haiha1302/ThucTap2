import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,

    document.getElementById('root'),
);
