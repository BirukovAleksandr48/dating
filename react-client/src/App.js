import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import UserProfile from './pages/UserProfile/UserProfile'
import Users from './pages/Users/Users'
import EditProfile from './pages/EditProfile/EditProfile'
import Photo from './pages/Photo/Photo'
import Home from './pages/Home/Home'
import AdvertPage from './pages/AdvertPage/AdvertPage'
import AdminPage from './pages/AdminPage/AdminPage'
import NotFound from './pages/NotFound/NotFound'
import DefaultLayout from './layouts/DefaultLayout'
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./routers/PrivateRoute";
import HomeRoute from "./routers/HomeRoute";
import ErrorHandler from "./utils/ErrorHandler";

import './App.css';
import axios from "axios";

class App extends Component {

    constructor(props) {
        super(props);
        axios.defaults.headers.common['Authorization'] = `Bearer ${ localStorage.getItem('accessToken') }`;
    }

    render() {
        return (
            <Router>
                <>
                    <Route component={ErrorHandler}/>
                    <Switch>
                        <HomeRoute exact path="/"
                                   component={(props) => <Home {...props}/>}/>
                        <PrivateRoute exact path="/admin"
                                      component={(props) => <AdminPage {...props}/>}/>
                        <PrivateRoute exact path="/users"
                                      component={() => <DefaultLayout component={Users}/>}/>
                        <PrivateRoute exact path="/users/:id"
                                      component={() => <DefaultLayout component={UserProfile}/>}/>
                        <PrivateRoute exact path="/edit/:id"
                                      component={() => <DefaultLayout component={EditProfile}/>}/>
                        <PrivateRoute exact path="/photo/:id"
                                      component={() => <DefaultLayout component={Photo}/>}/>
                        <PrivateRoute exact path="/advert"
                                      component={() => <DefaultLayout component={AdvertPage}/>}/>
                        <PrivateRoute path="*"
                                      component={() => <DefaultLayout component={NotFound}
                                                                      withoutSidebar={true}/>}/>
                    </Switch>
                    <ToastContainer/>
                </>
            </Router>
        );
    }
}

export default App;
