import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as sessions from 'express-session'

import { AppModule } from './modules'
import { Config } from './config'
import { SocketWithSessionIoAdapter } from './socket-adapter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// cors
	app.enableCors({
		origin: '*'
	})

	app.use(cookieParser())

	const sessionMiddleware = sessions({
		store: new sessions.MemoryStore(),
		secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
		saveUninitialized: true,
		cookie: { maxAge: 600000, httpOnly: true },
		resave: false
	})

	app.use(sessionMiddleware)

	app.useWebSocketAdapter(new SocketWithSessionIoAdapter(app, sessionMiddleware))

	app.setGlobalPrefix('/api')

	// pipes
	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: false,
			skipUndefinedProperties: false,
			transform: true,
			whitelist: true
		})
	)

	// swagger
	const builder = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('Video Reader')
		.setDescription('Some description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, builder)

	SwaggerModule.setup('/docs', app, document)

	const configService = app.get<ConfigService<Config>>(ConfigService)
	const { port } = configService.get('app')

	await app.listen(port)

	const url = await app.getUrl()

	console.log(`[SERVER STARTING] server listens to ${url}`)
}

bootstrap()
