import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Datonecode from 'App/Models/Datonecode';
import Dattwocode from 'App/Models/Dattwocode';


export default class MapproductcodesController {


  public async getDatOneCode(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''

 return await Datonecode.query().where('branch',branch).first();


}

  public async setDatOneCode(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''
 const searchPayload = { branch}
//  const persistancePayload = ctx.request.input('code')

 await Datonecode.updateOrCreate(searchPayload, {code:ctx.request.input('code'),branch})


 return await Datonecode.query().where('branch',branch).first();


}

public async getDatTwoCode(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''

 return await Dattwocode.query().where('branch',branch).first();


}

  public async setDatTwoCode(ctx:HttpContextContract)
{
 var branch=ctx.request.headers()['branch']||''
 const searchPayload = { branch}
 await Dattwocode.updateOrCreate(searchPayload, {code:ctx.request.input('code'),branch})


 return await Dattwocode.query().where('branch',branch).first();


}


}
