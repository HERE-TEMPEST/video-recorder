import { Auth2Config } from './auth2-config.type'

export const loadAuth2Config = (): Auth2Config => {
	return {
		auth2: {
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: process.env.GOOGLE_CALLBACK_URI
			}
		}
	}
}
