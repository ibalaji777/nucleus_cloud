import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift';
import _ from 'lodash'

export default class ShiftsController {

    public async isShiftFound(data) {
        var name = data.name;
        var user_id = data.user_id;
        var isFound = await Shift.query().where('name', name).andWhere('user_id', user_id)
        if (_.isEmpty(isFound)) {
            return false;
        }
        return true;
    }

    public async CREATE(ctx: HttpContextContract) {
        var data = ctx.request.input('data')
        let user = await ctx.auth.use('web').authenticate();
        const user_id = user.id;
        var name = data.name;
        var start_time = data.start_time;
        var end_time = data.end_time;
        if (!await this.isShiftFound({ name, user_id })) {
            var result = await Shift.create({
                user_id,
                name,
                start_time,
                end_time,
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
