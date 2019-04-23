import axios from 'axios'
import { REST_URL } from '../../constants'

export const login = (loginData) => axios.post(REST_URL + '/login', loginData);

export const signUp = (signUpData) => axios.post(REST_URL + '/signUp', signUpData);

export const logout = (refreshToken) => axios.post(REST_URL + '/logout', refreshToken);

export const getCurrentUser = () => axios.get(REST_URL + '/user/current');

export const refreshTokens = (refreshToken) => axios.post(REST_URL + '/refreshTokens', { token: refreshToken });