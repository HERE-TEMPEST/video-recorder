import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { configLoader, envValidator } from '../config'
import { Auth2Module } from './auth'
import { VideoModule } from './video/video.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: configLoader,
			validate: envValidator
		}),
		Auth2Module,
		VideoModule
	]
})
export class AppModule {
	// public configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(
	// 			session({
	// 				secret: 'asdas21esdad',
	// 				cookie: {
	// 					maxAge: 600000
	// 				},
	// 				resave: false,
	// 				saveUninitialized: true
	// 			})
	// 		)
	// 		.forRoutes('*')
	// }
}
