import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from 'src/user/user.model'

type TypeData = keyof UserModel

export const User = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user?.[data] : user
	}
)
