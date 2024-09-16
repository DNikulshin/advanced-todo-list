import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express"
import { Strategy } from "passport-jwt"
import { UsersService } from "src/users/users.service"
import { JwtPayload } from "src/utils/types/jwt-payload"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService

    ) {
        super({
            jwtFromRequest: (req: Request) => {
                console.log(req.cookies['refreshToken']);
                
                return req.cookies['refreshToken']

            },
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET')

        })
    }

    async validate({ userId }: JwtPayload) {

        const user = await this.userService.getOne({ id: userId })
     
        if (!user) {
            throw new UnauthorizedException()
        }

        return user

    }


}