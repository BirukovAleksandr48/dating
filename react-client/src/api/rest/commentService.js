import axios from "axios";
import { REST_URL } from '../../constants'

export const getComments = (photoId) => axios.get(REST_URL + '/comment/' + photoId);

export const addComment = (photoId, commentText) => axios.post(REST_URL + '/comment/' + photoId, { commentText });

export const editComment = (commentId, commentText) => axios.put(REST_URL + '/comment/' + commentId, { commentText });

export const deleteComment = (commentId) => axios.delete(REST_URL + '/comment/' + commentId);
