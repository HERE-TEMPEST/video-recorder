import {} from '../config'

declare global {
	namespace Express {
		interface Request {
			refresh?: {
				userId: number
			}
			userCredentials?: {
				userId: number
				role?: string
			}
		}
	}
}

declare module '@nestjs/config' {
	class ConfigService<Config extends Record<unknown, Record<string, unknown>>> {
		public get<ConfigKey extends keyof Config>(parameter: ConfigKey): Config[ConfigKey]
	}
}
