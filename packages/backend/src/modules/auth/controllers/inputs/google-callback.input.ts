/* eslint-disable sort-keys */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleAuth2CallbackInput {
	@ApiProperty({ type: String, required: true })
	@IsString()
	@IsNotEmpty()
	code: string
}
