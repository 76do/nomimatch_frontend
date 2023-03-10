import axios from 'axios';
import { authentication } from '../urls/index';

export const LogInRequest = (params) => {
	return axios.post(authentication, params)
	.then(res => {
		return res
	})
	.catch(e => {
		throw e;
	})
}
