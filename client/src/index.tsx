import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import {Command} from "./models/Command";

export function init(rootElementId: string, initialCommands: Command[]) {
    ReactDOM.render(
        <App initialCommands={initialCommands} />,
        document.getElementById(rootElementId)
    );
}
