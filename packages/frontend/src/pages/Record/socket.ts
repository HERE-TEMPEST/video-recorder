import { Socket, io } from 'socket.io-client'

export const initSocket = (uri: string) => {
	const connection: Socket = io(uri, {
		autoConnect: false,
		withCredentials: true
	})

	connection.on('connect', () => {
		connection.emit('message', { some: 'message' })
		console.log('connected')
	})

	connection.on('disconnect', () => {
		console.log('disconnect')
	})

	connection.connect()

	const disconnect = () => {
		if (connection && connection.connected) {
			connection.disconnect()
		}
		connection.close()
	}

	return { connection, disconnect }
}
