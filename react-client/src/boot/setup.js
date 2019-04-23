import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import App from '../App'
import { initSocket } from "../api/ws/wsService";

class Setup extends Component {

    constructor (props) {
        super(props);
        this.state = {
            store: initSocket(configureStore())
        }
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App/>
            </Provider>
        );
    }
}

export default Setup;
