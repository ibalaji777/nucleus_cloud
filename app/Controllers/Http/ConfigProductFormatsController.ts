import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'
import ConfigProductFormat from 'App/Models/ConfigProductFormat'
import Ws from 'App/Services/Ws'

export default class ConfigProductFormatsController {

public async updateConfig(ctx:HttpContextContract)
{




  var branch=ctx.request.headers()['branch']||''
  const searchPayload = { branch}
  await ConfigProductFormat.updateOrCreate(searchPayload, {config:ctx.request.input('config'),branch})
  // Ws.io.emit('watchQasFormConfig', {  })

var result=await ConfigProductFormat.query().where('branch',branch).first();

if(result)  return ctx.response.send(result.config);

 return ctx.response.send([]);

}

public async getProductConfig(ctx:HttpContextContract)
{

var branch=ctx.request.headers()['branch']||''
var result=await ConfigProductFormat.query().where('branch',branch).first();
if(result)  return ctx.response.send(result.config);
 return ctx.response.send([]);
}

}
