import { Logger } from '@nestjs/common'
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UserSession } from './user-decorator'

@WebSocketGateway({
	cors: {
		origin: ['http://127.0.0.1:3001'],
		credentials: true
	}
})
export class VideoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server

	private readonly logger: Logger

	constructor() {
		this.logger = new Logger('Video')
	}

	@SubscribeMessage('message')
	public onMessage(@UserSession() session: any, @MessageBody() body: any) {
		this.logger.log({ session, body, where: 'Video', id: session.id })
	}

	public afterInit() {
		this.logger.log('socket listener initializated')
	}

	public handleConnection(client: any) {
		this.logger.log(`new client <${client.id}>`)
	}

	public handleDisconnect(client: Socket) {
		this.logger.log(`client disconnected <${client.id}>`)
	}
}
