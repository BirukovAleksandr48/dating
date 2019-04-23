import axios from "axios";
import { REST_URL } from '../../constants'

export const getPhotos = (userId) => axios.get(REST_URL + '/photos/' + userId);

export const getPhotoById = (photoId) => axios.get(REST_URL + '/photo/' + photoId);

export const deletePhotoById = (photoId) => axios.delete(REST_URL + '/photo/' + photoId);

/*export const uploadPhotos = (files, userId) => {
    const formData = new FormData()
    for( var i = 0; i < files.length; i++ ){
        let file = files[i];
        formData.append('photos[' + i + ']', file);
    }
    return axios.post(REST_URL + '/photo/uploadPhotos/' + userId, formData, {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'multipart/form-data' }})
}*/

export const uploadPhoto = (file, userId) => {
    const formData = new FormData()
    formData.append('photo', file)
    return axios.post(REST_URL + '/photo/uploadPhoto/' + userId, formData, {headers: {'Content-Type': 'multipart/form-data' }})
};