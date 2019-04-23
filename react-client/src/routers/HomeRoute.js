import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";

export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(!localStorage.getItem('accessToken')){
                return <Component {...props} />;
            } else {
                const to = {
                    pathname: "/users",
                    state: { from: props.location }
                };
                return <Redirect to={to}/>
            }
        }}
    />
);