import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Printconfig from 'App/Models/Printconfig';

export default class PrintconfigsController {
  public async getPrintConfig(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Printconfig.query().where('branch',branch).first();


  }

    public async setPrintConfig(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Printconfig.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})


   return await Printconfig.query().where('branch',branch).first();


  }

}
