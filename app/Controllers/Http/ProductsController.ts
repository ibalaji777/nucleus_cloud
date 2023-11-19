import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import _ from 'lodash'


export default class ProductsController {

    public async isProductFound(data) {
        var part_no = data.part_no;
        var isFound = await Product.query().where('part_no', part_no);
        if (_.isEmpty(isFound)) {
            return false;
        }
        return true;
    }


    public async CREATE_PRODUCT(ctx: HttpContextContract) {
        var data = ctx.request.input('data')
        let name = data.name;
        let part_no = data.part_no;
        let description = data.description;
        let user = await ctx.auth.use('web').authenticate();
        const user_id = user.id;    
        if (!await this.isProductFound({ part_no })) {
            var result = await Product.create({
                user_id,
                name,
                part_no,
                description
            })

            if (result.$isPersisted)
                return ctx.response.send({
                    success: true,
                    msg: 'Created Successfully',
                    data: result
                })
        }
        return ctx.response.send({
            success: false,
            msg: 'Already exist',
            data: ''
        })
    }


}
