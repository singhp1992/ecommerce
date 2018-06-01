import { IsString } from 'class-validator'
import { JsonController, Post, Body, BadRequestError, NotFoundError } from 'routing-controllers'
// import * as superagent from 'superagent'
import User from '../users/entity'
import { sign } from '../jwt';

class AuthenticatePayload {
    @IsString()
    email: string

    @IsString()
    password: string
}

@JsonController()
export default class LoginController {

    @Post('/logins')
    async authenticate(
        @Body() { email, password }: AuthenticatePayload
    ) {
        const user = await User.findOne({ where: { email } })

        if (!user) throw new NotFoundError('De combinatie email en wachtwoord is incorrect')
        if (!await user.checkPassword(password)) throw new BadRequestError('De combinatie email en wachtwoord is incorrect')

        const jwt = sign({ id: user.id!, firstName: user.firstName, lastName: user.lastName, email: user.email, permission: user.permission })
        return {
            jwt,
            user
        }
    }

}