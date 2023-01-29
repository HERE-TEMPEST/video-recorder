import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EnvSchema {
	@IsNotEmpty()
	@IsString()
	CLIENT_URL: string

	@IsString()
	@IsNotEmpty()
	SESSION_TOKEN_SECRET_KEY: string

	@IsString()
	@IsNotEmpty()
	GOOGLE_CALLBACK_URI: string

	@IsString()
	@IsNotEmpty()
	GOOGLE_CLIENT_ID: string

	@IsString()
	@IsNotEmpty()
	GOOGLE_CLIENT_SECRET: string

	@IsNumber()
	@IsNotEmpty()
	PORT: number
}
