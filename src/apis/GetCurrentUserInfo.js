import axios from 'axios';
import { currentUser } from '../urls/index';

export const getCurrentUser = (accessToken) => {
	return axios.get(currentUser, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
