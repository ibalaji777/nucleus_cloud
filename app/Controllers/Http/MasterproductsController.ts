// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'

import Masterproduct from "App/Models/Masterproduct";
import * as core from './core'
import moment from 'moment'
export default class MasterproductsController {

public async findProducts(ctx:HttpContextContract){


  var rmcode=ctx.request.input('rmcode')

  return ctx.response.send(await Masterproduct.query().where('rmcode',rmcode))



}
public async checkBatchNo(ctx:HttpContextContract){
var rmcode=ctx.request.input('rmcode')

if(await Masterproduct.query().where('rmcode',rmcode).first())
{
  return ctx.response.send(true)

}
return ctx.response.send(false)
}
public async  updateProduct(ctx:HttpContextContract){

  const    {
    id='',
    branch='Chennai',
    product_name='',
    supplier_name='',
    rmcode='',
    eds=new Date(),
    rm=0,
    form_format='',
    comment='',
    duedate=new Date(),
    skiplevel=0,
    table_header_format=[],
    postfix_observation_print_view_format={},
    observation_format=[],
    observation_header_print_view=[],
    observation_print_view=[],
    other={},

    qas_form_one_ui={},
    qas_form_two_ui={},
    observation2_header_print_view=[],
    observation2_print_view=[],
    observation2_format=[]

  }=ctx.request.all()
console.log("id+++",id)
console.log(ctx.request.all())
var product=   await Masterproduct
  .query()
  .where('id', id)
  .update({
    branch,
    product_name,
    supplier_name,
    rmcode,
    eds,
    rm,
    form_format,
    comment,
    duedate,
    skiplevel,
    table_header_format,
    postfix_observation_print_view_format,
    observation_format,
    observation_header_print_view,
    observation_print_view,
    other,

    qas_form_one_ui,
    qas_form_two_ui,
    observation2_header_print_view,
    observation2_print_view,
    observation2_format

   })
   return product;

}
  public async  defaultProduct(ctx: HttpContextContract) {
    const    {
      branch='Chennai',
      product_name='',
      supplier_name='',
      rmcode='',
      eds=new Date(),
      rm=0,
      form_format='',
      comment='',
      duedate=new Date(),
      skiplevel=0,
      observation_format=[],
      observation_print_view=[],
      date=new Date(),

        }=ctx.request.all()



 return await Masterproduct.create({
  branch,
  product_name,
  supplier_name,
  rmcode,
  eds,
  rm,
  form_format,
  comment,
  duedate,
  skiplevel,
  observation_format,
  observation_print_view,
  date,

       })
}

public async  getBranchProducts(ctx: HttpContextContract) {
  var branch=ctx.request.headers()['branch']||''
  // return Masterproduct.all()
  return ctx.response.send({
    data:await Masterproduct.query().where('branch',branch)
   })

  }

  public async  removeProduct(ctx: HttpContextContract) {

    var id=ctx.request.input('id')
  if(await core.checkAdmin(ctx)){
  const product = await Masterproduct.findOrFail(id)

  return ctx.response.send({
    successStatus:true,
    data:await product.delete(),
    error:'',

  })

  }
  return ctx.response.send({
    successStatus:false,
    error:'Not Found',

  })

  }

public async  createProduct(ctx: HttpContextContract) {
var input=ctx.request.all();
//check -------------------
console.log("check",input)
var product= await Masterproduct.create({
branch:input.branch||"",
product_name:input.product_name||"",
supplier_name:input.supplier_name||"",
rmcode:input.rmcode||"",
eds:input.eds||"",
rm:input.rm||"",
form_format:input.form_format||"",
comment:input.comment||"",
duedate:input.duedate||"",
skiplevel:input.skiplevel||0,
table_header_format:input.table_header_format||[],
postfix_observation_print_view_format:input.postfix_observation_print_view_format||{},
observation_format:input.observation_format||[],
observation_header_print_view:input.observation_header_print_view||[],
observation_print_view:input.observation_print_view||[],
other:input.other||{},

qas_form_one_ui:input.qas_form_one_ui||{},
qas_form_two_ui:input.qas_form_two_ui||{},
observation2_header_print_view:input.observation2_header_print_view||[],
observation2_print_view:input.observation2_print_view||[],
observation2_format:input.observation2_format||[],
date:input.date||moment().format("YYYY-MM-DD")
     })
if(product){
  Ws.io.emit('productCreated', {  })
  return ctx.response.send({
    successStatus:true,
    error:'',
    })
}

return  ctx.response.send({
  successStatus:false,
  error:'Failed to create',

})

    }




}
