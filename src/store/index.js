// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import sagas from './sagas';
import reducer from './modules';
import apiMiddleware from './middleware/api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        apiMiddleware,
        sagaMiddleware,
    )),
);

sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
