import axios from 'axios';
import { requests } from '../urls/index';

export const getUserRequests = (accessToken) => {
	console.log(`Bearer ${accessToken}`)
	return axios.get(requests, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
