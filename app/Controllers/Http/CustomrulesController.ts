import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customrule from 'App/Models/Customrule';

import Ws from 'App/Services/Ws'
export default class CustomrulesController {
  public async ruleslist(ctx:HttpContextContract)
  {
   var branch=ctx.request.headers()['branch']||''

   return await Customrule.query().where('branch',branch);


  }
  public async delete(ctx:HttpContextContract)
  {

  var id=ctx.request.input('id')
   var branch=ctx.request.headers()['branch']||''

return await Customrule.query().where('branch',branch).where('id',id).delete();


  }



    public async save(ctx:HttpContextContract)
  {
   var data=ctx.request.input('data')
   var branch=ctx.request.headers()['branch']||''
   data['branch']=branch;

   var created=await Customrule.create(data)
   Ws.io.emit('watchCustomrule', {  })

   return ctx.response.send(created.$isPersisted)



  }


}
