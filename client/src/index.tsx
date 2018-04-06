import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';

export function init(rootElementId: string) {
    ReactDOM.render(
        <App />,
        document.getElementById(rootElementId)
    );
}
