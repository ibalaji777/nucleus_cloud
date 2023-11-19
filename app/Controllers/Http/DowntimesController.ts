import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnplannedDowntime from 'App/Models/UnplannedDowntime';
import _ from 'lodash'

export default class DowntimesController {

    public async isDownTimeFound(data) {
        var name = data.name;
        var user_id = data.user_id;
        var isFound = await UnplannedDowntime.query().where('name', name).where('user_id', user_id)
        return _.isEmpty(isFound) ? false : true;

    }

    public async CREATE(ctx: HttpContextContract) {
        var data = ctx.request.input('data')
        let user = await ctx.auth.use('web').authenticate();
        const user_id = user.id;
        var name = data.name;
        if (!await this.isDownTimeFound({ name, user_id })) {
            var result = await UnplannedDowntime.create({
                name,
                user_id,
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
