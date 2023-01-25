const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const signIn = `${DEFAULT_API_LOCALHOST}/registration`
export const userRequest = (userId) =>
	`${DEFAULT_API_LOCALHOST}/users/${userId}/requests`
