import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const getUserById = async () => {
	return {}
}
export const getAllUser = async () => {
	return {}
}
export const getUserInfo = async ({ token }: { token: string }): Promise<any> => {
	const { data } = await apiInstance.get(`/${uris.gets.userInfo}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return data
}
