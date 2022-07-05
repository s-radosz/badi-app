import React, {Component} from 'react';
import AppContainer from './app/routes';

import {Provider} from 'react-redux';
import store from './app/store/index';

if (__DEV__) {
    import('./ReactotronConfig').then(() =>
        console.log('Reactotron Configured'),
    );
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
