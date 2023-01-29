import { JwtConfig } from './jwt-config.type'

export const loadJwtConfig = (): JwtConfig => {
	return {
		jwt: {
			sessionTokenSecretKey: process.env.SESSION_TOKEN_SECRET_KEY
		}
	}
}
