import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/users/entities/user-entity";

export const LoggedUser = createParamDecorator((_, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    delete user.password;

    return user;

})
 

