import axios from 'axios';
import { userUpdate } from '../urls/index';

export const UserUpdate = (accessToken, params) => {
	return axios.put(userUpdate, params, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
