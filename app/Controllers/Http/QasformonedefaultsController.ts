import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qasformonedefault from 'App/Models/Qasformonedefault';
import Ws from 'App/Services/Ws'

export default class QasformonedefaultsController {
  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Qasformonedefault.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Qasformonedefault.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchQasFormOnoDefault', {  })

   return await Qasformonedefault.query().where('branch',branch).first();


  }
}
