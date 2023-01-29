import { call } from 'redux-saga/effects'

export const refreshTokenProtection = function* (callback: any): any {
	const data = yield call(callback)

	if (data && data.response) {
		return null
	}

	return yield data
}
