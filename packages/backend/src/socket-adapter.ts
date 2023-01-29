import { INestApplication } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'

export class SocketWithSessionIoAdapter extends IoAdapter {
	constructor(app: INestApplication, private readonly sessionMiddleware: CallableFunction) {
		super(app)
	}

	public createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options)

		server.use((socket, next) => this.sessionMiddleware(socket.request, {}, next))

		return server
	}
}
