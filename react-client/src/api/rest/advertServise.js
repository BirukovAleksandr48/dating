import axios from "axios";
import { REST_URL } from '../../constants'

export const getAdvert = (query) => axios.get(REST_URL + '/advert' + query);

export const getAdvertById = (advertId) =>
    axios.get(REST_URL + '/advert/' + advertId);

export const getAdvertByUserId = (userId) =>
    axios.get(REST_URL + '/advert/user/' + userId);

export const addAdvert = (advert) =>
    axios.post(REST_URL + '/advert', { advert });

export const editAdvert = (advertId, updatedAdvert) =>
    axios.put(REST_URL + '/advert/' + advertId, { updatedAdvert });

export const deleteAdvert = (advertId) =>
    axios.delete(REST_URL + '/advert/' + advertId);
