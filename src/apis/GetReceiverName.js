import axios from 'axios';
import { receiverName } from '../urls/index';

export const receiverNameRequest = (userId) => {
	return axios.get(receiverName(userId))
	.then(res => {
		return res.data
	})
	.catch(e => {
		throw e;
	})
}
