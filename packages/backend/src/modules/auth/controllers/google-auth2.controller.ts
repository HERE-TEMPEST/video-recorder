import { Controller, Get, Query, Redirect, Session } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'

import { Config } from '../../../config'
import { GoogleAuth20Service } from '../services'
import { GoogleAuth2CallbackInput } from './inputs'

@ApiTags('OAuth2 Google')
@Controller('auth20/google')
export class GoogleAuth20Controller {
	constructor(private readonly auth2service: GoogleAuth20Service, private readonly configService: ConfigService<Config>) {}

	@Get('/sign-in')
	@Redirect()
	public async googleSignIn() {
		return { url: this.auth2service.getGoogleAuthUrl() }
	}

	@ApiExcludeEndpoint()
	@Get('callback')
	@Redirect()
	public async handleCallback(@Query() input: GoogleAuth2CallbackInput, @Session() session: any) {
		const { code } = input

		const sessionData = await this.auth2service.handleUser(code)

		session.data = sessionData

		console.dir({ where: 'Auth', id: session.id }, { depth: 10 })

		return { url: this.getClientUri() }
	}

	private getClientUri(): string {
		const { clientUrl } = this.configService.get('app')

		const uri = new URL(clientUrl)

		return uri.toString()
	}
}
