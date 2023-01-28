import axios from 'axios';
import { signIn } from '../urls/index';

export const signInRequest = (params) => {
	return axios.post(signIn, params)
	.then(res => {
		return res
	})
	.catch(e => {
		throw e;
	})
}
