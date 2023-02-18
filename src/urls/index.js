const DEFAULT_API_LOCALHOST = 'https://api.nomimatch.com/api/v1'

export const signIn = `${DEFAULT_API_LOCALHOST}/registration`
export const authentication = `${DEFAULT_API_LOCALHOST}/authentication`
export const userRequest = (userId) =>
	`${DEFAULT_API_LOCALHOST}/users/${userId}/requests`
export const receiverName = (userId) =>
	`${DEFAULT_API_LOCALHOST}/users/${userId}/name`
export const requests = `${DEFAULT_API_LOCALHOST}/user/requests`
export const currentUser = `${DEFAULT_API_LOCALHOST}/current_user`
