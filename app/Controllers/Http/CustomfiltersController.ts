import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customfilter from 'App/Models/Customfilter';

import Ws from 'App/Services/Ws'
export default class CustomfiltersController {

  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Customfilter.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Customfilter.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchCustomfilter', {  })

   return await Customfilter.query().where('branch',branch).first();


  }


}
