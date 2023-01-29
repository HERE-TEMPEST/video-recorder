import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { google } from 'googleapis'
// import axios from 'axios'

import { Config } from '../../../config'

@Injectable()
export class GoogleAuth20Service {
	private readonly client: any

	constructor(private readonly configService: ConfigService<Config>) {
		const {
			google: { clientId, clientSecret, redirect_uri }
		} = this.configService.get('auth2')

		this.client = new google.auth.OAuth2(clientId, clientSecret, redirect_uri)
	}

	public getGoogleAuthUrl(): string {
		return this.client.generateAuthUrl({
			access_type: 'offline',
			prompt: 'consent',
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/drive'
			]
		})
	}

	public async handleUser(code: string) {
		const { tokens } = await this.client.getToken(code)

		// const { data: user } = await axios.get(
		// 	`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${tokens.id_token}`
		// 		}
		// 	}
		// )

		return tokens

		// tokens.refresh_token
		// tokens.access_token
		// Bearer tokens.id_token
	}
}
