import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { User } from "../entities/user.entity";


type DecoratorReturn = string | User
type Data = string | undefined

export const GetUser = createParamDecorator<Data, ExecutionContext, DecoratorReturn>((data, ctx) => {

    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
        throw new InternalServerErrorException('User not found (Request)');
    }

    return data ? user[data] : user;

})