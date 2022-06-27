// src/store/index.js

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import ReactotronConfig from './../../ReactotronConfig';
import Reactotron from 'reactotron-react-native';

const sagaMonitor = Reactotron.createSagaMonitor;
//@ts-ignore
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(
    rootReducer,
    compose(middleware, ReactotronConfig.createEnhancer()),
);

sagaMiddleware.run(rootSaga);

export default store;
