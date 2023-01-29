import { Module } from '@nestjs/common'

import { GoogleAuth20Controller } from './controllers'
import { GoogleAuth20Service } from './services'

@Module({
	controllers: [GoogleAuth20Controller],
	providers: [GoogleAuth20Service]
})
export class Auth2Module {}
