import axios from 'axios'
import { REST_URL } from '../../constants'

export const getConversations = () =>
    axios.get(REST_URL + '/conversation');

export const getConversationById = (id) =>
    axios.get(REST_URL + '/conversation/' + id);

export const createConversation = (recipient, message) =>
    axios.post(REST_URL + '/conversation/' + recipient, { message });

export const createMessage = (message) =>
    axios.post(REST_URL + '/message', message);
