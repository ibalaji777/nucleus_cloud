import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guiqasformone from 'App/Models/Guiqasformone';
import Ws from 'App/Services/Ws'

export default class GuiqasformonesController {
  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Guiqasformone.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Guiqasformone.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchGuiQasFormOne', {  })

   return await Guiqasformone.query().where('branch',branch).first();


  }
}
