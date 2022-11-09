import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qasformtwodefault from 'App/Models/Qasformtwodefault';
import Ws from 'App/Services/Ws'
export default class QasformtwodefaultsController {
  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Qasformtwodefault.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Qasformtwodefault.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchQasFormTwoDefault', {  })

   return await Qasformtwodefault.query().where('branch',branch).first();


  }
}
