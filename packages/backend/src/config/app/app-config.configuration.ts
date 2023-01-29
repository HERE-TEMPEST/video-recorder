import { AppConfig } from './app-config.type'

export const loadAppConfig = (): AppConfig => {
	return {
		app: {
			clientUrl: process.env.CLIENT_URL,
			port: parseInt(process.env.PORT, 10)
		}
	}
}
