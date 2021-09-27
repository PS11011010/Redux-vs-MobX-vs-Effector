import React from 'react';
import { Provider } from 'react-redux';
import App from './Redux/App'
import store from './Redux/store'

const Redux = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default Redux;
