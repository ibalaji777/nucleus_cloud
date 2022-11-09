
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guiqasformtwo from 'App/Models/Guiqasformtwo';
import Ws from 'App/Services/Ws'

export default class GuiqasformtwosController {
  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Guiqasformtwo.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await Guiqasformtwo.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchGuiQasFormOne', {  })

   return await Guiqasformtwo.query().where('branch',branch).first();


  }

}
