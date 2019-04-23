import axios from "axios";
import React, {Component} from 'react';
import {refreshTokens} from "../api/rest/authService";

class ErrorHandler extends Component {

    render() {
        const { history } = this.props;
        axios.interceptors.response.use(
            (response) => {
                return Promise.resolve(response)
            },
            async (err) => {
                let originalRequest = err.config;
                const statusCode = err.response.status;
                if (statusCode === 401 && !originalRequest._retry) {
                    try {
                        originalRequest._retry = true;

                        const refreshToken = localStorage.getItem('refreshToken');
                        const { data } = await refreshTokens(refreshToken);

                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${ data.accessToken }`;

                        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
                        return axios(originalRequest)
                    } catch (err) {
                        localStorage.clear();
                        history.push('/');
                        return Promise.reject(err)
                    }
                } else if(statusCode === 404) {
                    history.push('/404');
                }
                return Promise.reject(err)
            }
        );
        return null
    }
}

export default ErrorHandler;
