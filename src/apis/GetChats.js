import axios from 'axios';
import { chats } from '../urls/index';

export const getChats = (accessToken) => {
	return axios.get(chats, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
