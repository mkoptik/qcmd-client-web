import * as React from 'react';
import * as style from './style.css';
import {BrowserRouter} from "react-router-dom";
import {Command} from "../../models/Command";
import Axios from "axios";

interface AppProps {
    initialCommands: Command[]
}

interface AppState {
    search: string,
    foundCommands: Command[]
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            foundCommands: []
        }
    }

    inputTextChanged = (value) => {
        Axios.get<Command[]>("https://qcmd.koptik.eu/api/search", { params: { search: value} })
            .then(response => {
                this.setState({
                    foundCommands: response.data
                })
            })
    };

    render() {
        const commands = this.state.foundCommands.length > 0 ? this.state.foundCommands : this.props.initialCommands;
        return (
            <div className={style.normal}>
                <div id={style.content}>
                    <BrowserRouter>
                        <div>
                            <input className="search-input" type="text" onChange={e => this.inputTextChanged(e.currentTarget.value)} placeholder="Search for command" />
                            <div className="commands-list">
                                {commands.map(c => this.renderCommand(c))}
                            </div>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }

    renderCommand = (command: Command) => <div key={command.label} className="command">
        {command.label}
        <div className="command-text">{command.commandText}</div>
    </div>
}
