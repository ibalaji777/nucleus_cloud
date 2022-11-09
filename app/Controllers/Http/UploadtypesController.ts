import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Uploadtype from 'App/Models/Uploadtype';
import * as core from './core'
export default class UploadtypesController {

  public async  readUploadType(ctx: HttpContextContract/*unresolved*/) {


       return await Uploadtype.all();

      }



    //
      public async  createUploadType(ctx: HttpContextContract) {
        const    {
              name='',
              title='',
              date=new Date()
            }=ctx.request.all()
               if(name==''){

              return ctx.response.send({
                successStatus:false,
                error:'Name Must be filled'
              })
            }
 var  branch=ctx.request.headers()['branch']||''
        var upType =await Uploadtype.create({
        name,
        branch,
        title,
        date
         })


           return ctx.response.send({
            successStatus:true,
            data:upType,
            error:'',
           });

        }

        public async  removeUploadType(ctx: HttpContextContract) {
              var id=ctx.request.input('id')
        if(await core.checkAdmin(ctx)){
        const user = await Uploadtype.findOrFail(id)
            return ctx.response.send({
          successStatus:true,
          data:await user.delete(),
          error:'',
            })
            }
        return ctx.response.send({
          successStatus:false,
          error:'Not Found',

        })

        }

          public async  updateUploadType(ctx: HttpContextContract) {

            const    {
              id='',
              name='',

              title='',

            }=ctx.request.all()
var  branch=ctx.request.headers()['branch']||''

          var uploadType=   await Uploadtype
            .query()
            .where('id', id)
            .update({
              title,
          name,
          branch,
              })

             return uploadType;
          }

}
