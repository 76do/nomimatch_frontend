import axios from 'axios';
import { twitterAuth } from '../urls/index';

export const TwitterAuth = (accessToken) => {
	return axios.get(twitterAuth, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
