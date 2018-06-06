import { JsonController, Get, Param, HttpCode, Body, Post, Delete, NotFoundError, Authorized } from 'routing-controllers'
import Product from './entity'
//import { sign } from "../jwt";

@JsonController()
export default class ProductController {

    // requests one product
    @Authorized()
    @Get('/products/:id')
    async product(
        @Param('id') id: number
    ) {
        const product = await Product.findOne(id)
        return { product }
    }

    // creates a product
    @Post('/products')
    @HttpCode(201)
    async createProduct(
        @Body() id: Product
    ) {
        //const { password, ...rest } = data
        const entity = Product.create(id)
        // await entity.setPassword(password)
        const product = await entity.save()
        return { product }
    }

    // edits a product
    // @Authorized()
    // @Put('/products/:id')
    // async editUser(
    //     @Param('id') id: number,
    //     @Body() update: Partial<User>
    // ) {
    //     console.log(update)
    //     const user = await User.findOne(id)
    //     if (!user) throw new NotFoundError('User doesn\'t exist')


    //     const updatedUser = await User.merge(user, update).save()
    //     const jwt = sign({ id: user.id!, firstName: user.firstName, lastName: user.lastName, email: user.email, permission: user.permission })

    //     return { user: updatedUser, jwt }
    // }

    // deletes a product
    @Authorized()
    @Delete('/products/:id')
    async deleteProduct(
        @Param('id') id: number
    ) {
        const product = await Product.findOne(id)
        if (!product) throw new NotFoundError('Product doesn\'t exist')
        if (product) Product.remove(product)
        return 'successfully deleted'
    }

} 