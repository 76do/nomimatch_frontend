import axios from 'axios';
import { logIn } from '../urls/index';

export const LogInRequest = (params) => {
	return axios.post(logIn, params)
	.then(res => {
		return res
	})
	.catch(e => {
		throw e;
	})
}
