import axios from 'axios';
import { userRequest } from '../urls/index';

export const Request = (userId, params) => {
	return axios.post(userRequest(userId), params)
	.then(res => {
		return res
	})
	.catch(e => {
		throw e;
	})
}
