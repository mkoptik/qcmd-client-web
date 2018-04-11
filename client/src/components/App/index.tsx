import * as React from 'react';
import * as style from './style.css';
import {BrowserRouter} from "react-router-dom";
import {Command} from "../../models/Command";
import Autosuggest = require("react-autosuggest");
import {
    ChangeEvent,
    GetSuggestionValue,
    InputProps, OnSuggestionsClearRequested,
    SuggestionsFetchRequested
} from "react-autosuggest";
import Axios from "axios";

const theme = {
    container:                'autosuggest-container',
    containerOpen:            'autosuggest-container-open',
    input:                    'input',
    inputOpen:                'input-open',
    inputFocused:             'input-focused',
    suggestionsContainer:     'suggestions-container',
    suggestionsContainerOpen: 'suggestions-container--open',
    suggestionsList:          'suggestions-list',
    suggestion:               'suggestion',
    suggestionFirst:          'suggestion--first',
    suggestionHighlighted:    'suggestion--highlighted',
    sectionContainer:         'section-container',
    sectionContainerFirst:    'section-container--first',
    sectionTitle:             'section-title'
};

interface AppProps {
    initialCommands: Command[]
}

interface AppState {
    search: string,
    suggestions: Command[]
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            suggestions: []
        }
    }

    getSuggestionValue: GetSuggestionValue<Command> = command => command.label;

    suggestionFetchRequested: SuggestionsFetchRequested = request => {
        Axios.get<Command[]>("http://qcmd.koptik.eu/api/search", { params: { search: request.value} })
            .then(response => {
                this.setState({
                    suggestions: response.data
                })
            })
    };

    suggestionClearRequested: OnSuggestionsClearRequested = () => null;

    renderSuggestion(command: Command) {
        return <div>
            {command.label}
            <div className="command-text">{command.commandText}</div>
        </div>
    }

    searchBoxOnChange = (e, params: ChangeEvent) => {
        this.setState({
            search: params.newValue
        })
    };

    render() {

        const initialSuggestions = this.state.suggestions;

        const inputProps: InputProps<Command> = {
            value: this.state.search,
            onBlur: e => { },
            onChange: this.searchBoxOnChange,
            placeholder: "Type command to search"
        };

        return (
            <div className={style.normal}>
                <div id={style.content}>
                    <BrowserRouter>
                        <Autosuggest
                            getSuggestionValue={this.getSuggestionValue}
                            onSuggestionsFetchRequested={this.suggestionFetchRequested}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionsClearRequested={this.suggestionClearRequested}
                            suggestions={initialSuggestions}
                            theme={theme}
                        />
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
