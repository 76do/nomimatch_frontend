import axios from 'axios';
import { authentication } from '../urls/index';

export const LogOut = (accessToken) => {
	return axios.delete(authentication, {headers: { Authorization: `Bearer ${accessToken}`, }})
	.then(res => {
		return res
	})
	.catch(e => {
		throw e;
	})
}
