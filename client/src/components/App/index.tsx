import * as React from 'react';
import * as style from './style.css';
import {BrowserRouter} from "react-router-dom";

export class App extends React.Component<{}, {}> {

  render() {

    return (
      <div className={style.normal}>
        <div id={style.content}>
          <BrowserRouter>
            <div>App</div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
