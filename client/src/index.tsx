import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { App } from './containers/App';

export function init(rootElementId: string) {
    const store = configureStore();
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById(rootElementId)
    );
}
