const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const signIn = `${DEFAULT_API_LOCALHOST}/registration`
export const logIn = `${DEFAULT_API_LOCALHOST}/authentication`
export const userRequest = (userId) =>
	`${DEFAULT_API_LOCALHOST}/users/${userId}/requests`
export const receiverName = (userId) =>
	`${DEFAULT_API_LOCALHOST}/users/${userId}/name`
export const requests = `${DEFAULT_API_LOCALHOST}/user/requests`