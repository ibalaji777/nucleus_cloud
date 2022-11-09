import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from 'App/Models/Config'
import Labelsetting from 'App/Models/Labelsetting'
import Ws from 'App/Services/Ws'

export default class LabelsettingsController {


  public async labelSetting(ctx:HttpContextContract)
  {
    var branch=ctx.request.headers()['branch']||''
    return    await Labelsetting.query().where('branch',branch).first()

  }
  public async labelSettingSave(ctx:HttpContextContract)
  {

    var config=ctx.request.input('config');
    var branch=ctx.request.headers()['branch']||''

    if(!await Labelsetting.query().where('branch',branch).first()){
    await Labelsetting.create({
      branch,
      config,
    })
  }else{

    await Labelsetting
    .query()
    .where('branch',branch)
    .update({
      branch,
      config,
    })
  }
  Ws.io.emit('watchLabelSetting', {  })


return    await Labelsetting.query().where('branch',branch).first()
  }


}
