import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Break from 'App/Models/Break';
import _ from 'lodash'

export default class BreaksController {
    public async isBreakFound(data){
        var name=data.name;
        var isFound=await Break.query().where('name',name);
    
        if(_.isEmpty(isFound)){
            return false;
        }
            return true;
      }

      public async CREATE_BREAK(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        let user = await ctx.auth.use('web').authenticate();
        const user_id = user.id;    
        var name=data.name;
        var minutes=data.minutes;
        var description=data.description;

        if(!await this.isBreakFound({name})){
        var result=await Break.create({
          user_id,
          name,
          description,
          minutes
        })
    
        if(result.$isPersisted)
        return ctx.response.send({
          success:true,
          msg:'Created Successfully',
          data:result
        })
        }
        return ctx.response.send({
          success:false,
          msg:'Already exist',
          data:''
        })
        }


}
