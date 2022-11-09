import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import type { HttpContextContract } from '@ioc=Adonis/Core/HttpContext'
import Branch from "App/Models/Branch"
import * as core from './core'
export default class BranchesController {

  public async  readBranches(ctx: HttpContextContract/*unresolved*/) {


var defaultValue=[
    {
      name: 'Chennai',
      description:'',
      date:new Date()
    },
    {
      name: 'Bangalore',
      description:'',
      date:new Date()
    }
  ]

 await Branch.fetchOrCreateMany('name', defaultValue)

   return await Branch.all();

  }



//
  public async  createBranch(ctx: HttpContextContract) {
    const    {
          name='',
          description='',
          date=new Date()
        }=ctx.request.all()

        if(name==''){

          return ctx.response.send({
            successStatus:false,
            error:'Name Must be filled'
          })
        }
    var branch =await Branch.create({
    name,
    description,
    date
     })


       return ctx.response.send({
        successStatus:true,
        data:branch,
        error:'',
       });

    }

    public async  removeBranch(ctx: HttpContextContract) {

      var id=ctx.request.input('id')
    console.log("id=>",id)
    if(await core.checkAdmin(ctx)){
    const user = await Branch.findOrFail(id)

    return ctx.response.send({
      successStatus:true,
      data:await user.delete(),
      error:'',

    })

    }
    return ctx.response.send({
      successStatus:false,
      error:'Not Found',

    })

    }

      public async  updateBranch(ctx: HttpContextContract) {

        const    {
          id='',
          name='',
          description='',

        }=ctx.request.all()
      var user=   await Branch
        .query()
        .where('id', id)
        .update({
      name,
      description
         })

         return user;
      }
  }
