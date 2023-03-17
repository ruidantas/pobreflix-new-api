import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt'})],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}