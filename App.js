import React from 'react';
import MemoApp from 'containers/MemoApp'
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

const initialState = {};
const store = configureStore(initialState);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MemoApp />
            </Provider>
        )
    }
}