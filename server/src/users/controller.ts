import { JsonController, Get, Param, HttpCode, Put, Body, Post, Delete, NotFoundError, Authorized } from 'routing-controllers'
import User from './entity'
import { sign } from "../jwt";

@JsonController()
export default class UserController {

    // requests one user
    @Authorized()
    @Get('/users/:id')
    async user(
        @Param('id') id: number
    ) {
        const user = await User.findOne(id)
        return { user }
    }

    // creates a user
    @Post('/users')
    @HttpCode(201)
    async createUser(
        @Body() data: User
    ) {
        const { password, ...rest } = data
        const entity = User.create(rest)
        await entity.setPassword(password)
        const user = await entity.save()
        return { user }
    }

    // edits a user
    @Authorized()
    @Put('/users/:id')
    async editUser(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ) {
        console.log(update)
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('User doesn\'t exist')


        const updatedUser = await User.merge(user, update).save()
        const jwt = sign({ id: user.id!, firstName: user.firstName, lastName: user.lastName, email: user.email, permission: user.permission })

        return { user: updatedUser, jwt }
    }

    // deletes a user
    @Authorized()
    @Delete('/users/:id')
    async deleteUser(
        @Param('id') id: number
    ) {
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('User doesn\'t exist')
        if (user) User.remove(user)
        return 'successfully deleted'
    }

} 
