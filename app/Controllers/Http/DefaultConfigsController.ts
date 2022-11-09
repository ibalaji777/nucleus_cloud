import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DefaultConfig from 'App/Models/DefaultConfig';
import Ws from 'App/Services/Ws'

export default class DefaultConfigsController {

  public async getDefaultImport(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await DefaultConfig.query().where('branch',branch).first();


  }

    public async setDefaultImport(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await DefaultConfig.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchDefaultConfig', {  })

   return await DefaultConfig.query().where('branch',branch).first();


  }
}
