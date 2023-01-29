import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserSession = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const socket = ctx.switchToWs().getClient<any>()

	return socket.request?.session || {}
})
