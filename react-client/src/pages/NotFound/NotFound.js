import React, { Component } from 'react';
import './NotFound.sass';

class NotFound extends Component {
    render() {
        return (
            <div className={'NotFound'}>
                <div className="content">
                    <div className="image"/>
                    <span className="text">404 Not found</span>
                </div>
            </div>
        );
    }
}

export default NotFound;
