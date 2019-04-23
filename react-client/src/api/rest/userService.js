import axios from "axios";
import { REST_URL } from '../../constants'

export const getAllUsers = (query = '') => axios.get(REST_URL + '/user' + query);

export const getUserById = (userId) => axios.get(REST_URL + '/user/' + userId);

export const createUser = (userData) => axios.post(REST_URL + '/user', userData);

export const updateUser = (userId, updatedFields) => axios.put(REST_URL + '/user/' + userId, updatedFields);

export const uploadUserAvatar = (userId, file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return axios.put(REST_URL + '/user/uploadAvatar/' + userId, formData, {headers: {'Content-Type': 'multipart/form-data' }})
};
