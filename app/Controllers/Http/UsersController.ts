import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User';
import _ from 'lodash'


export default class UsersController {

    public async isCompanyFound(data) {
        var email = data.email;
        var phone = data.phone;
        var isFound = await User.query().where('email', email).orWhere('phone', phone)
        if (_.isEmpty(isFound)) {
            return false;
        }
        return true;
    }

    public async SIGNUP(ctx: HttpContextContract) {
        var data = ctx.request.input('data')
        var phone = data.phone;
        var email = data.email;
        var password = data.password;
        var company_name = data.company_name;
        const hashedPassword = await Hash.make(password)

        if (!await this.isCompanyFound({ phone, email })) {
            var result = await User.create({
                company_name,
                phone,
                email,
                password: hashedPassword,
                role: 2, //1 is super admin and 2 is company admin panel
                status: 0// 0 inactive and 1 active
            })
            await ctx.auth.use('web').login(result);

            if (result.$isPersisted)
                return ctx.response.send({
                    success: true,
                    msg: 'Created Successfully',
                    data: result
                })
        }
        return ctx.response.send({
            success: false,
            msg: 'Looks Already Exist Email and Phone',
            data: ''
        })
    }

    public async SIGNIN(ctx: HttpContextContract) {
        var data = ctx.request.input('data')
        var username = data.username;//email or password
        var password = data.password;
        var login = await User.query().where('email', username).orWhere('phone', username).first();

        if (!_.isEmpty(login)) {
            if (await Hash.verify(login.password, password)) {
                await ctx.auth.use('web').login(login);
                return ctx.response.send({
                    success: true,
                    msg: 'Logged Successfully',
                    data: login
                })
            }

        }
        return ctx.response.send({
            success: false,
            msg: 'Login Failed',
            data: ''
        })

    }


    public async SIGNOUT(ctx: HttpContextContract) {

        await ctx.auth.use('web').logout()

        return ctx.response.send({
            success: false,
            msg: 'Login Failed',
            data: ''
        })

    }

    

}
