import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'

import GuiHeader from "App/Models/GuiHeader";

export default class GuiHeadersController {

  public async get(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await GuiHeader.query().where('branch',branch).first();


  }

    public async set(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''
   const searchPayload = { branch}
  //  const persistancePayload = ctx.request.input('code')

   await GuiHeader.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
   Ws.io.emit('watchGuiHeader', {  })

   return await GuiHeader.query().where('branch',branch).first();


  }

}
