import React from 'react';
import { Provider } from "mobx-react"
import { store } from './MobX/Store'
import App from './MobX/App'

const Mobx = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Mobx;
