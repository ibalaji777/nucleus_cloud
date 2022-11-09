import Qasformone from "App/Models/Qasformone";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qasformtwo from "App/Models/Qasformtwo";
import Application from '@ioc:Adonis/Core/Application'
import Invoice from "App/Models/Invoice";
import Database from "@ioc:Adonis/Lucid/Database";
import { v4 as uuidv4 } from 'uuid';
import Qasformonemedia from "App/Models/Qasformonemedia";
import moment from 'moment'
import User from "App/Models/User";
import Ws from 'App/Services/Ws'

import * as core from './core'
import { HttpContext } from "@adonisjs/core/build/standalone";
import Irnum from "App/Models/Irnum";
import _ from 'lodash'
import Masterproduct from "App/Models/Masterproduct";
export default class QasformonesController {
public  async labelGenerate(ctx:HttpContextContract)
{

var selected=ctx.request.input('qasFormOne')


for(var index in selected){
var qasFormTwo=await Qasformtwo.query().where('qas_form_one_id',selected[index].id);
selected[index]['qasFormTwo']=qasFormTwo
}


return ctx.response.send(selected)
  }


  public async find_qas_form(ctx:HttpContextContract)
{

  var key=ctx.request.input('key')
  var value=ctx.request.input('value')
  var id=ctx.request.headers()['id']||''
  var roletype=ctx.request.input('roletype')
  var branch=ctx.request.headers()['branch']||''



  if(roletype=='operator')
return  await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.operator_id',id)
   .where(key,value)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
else
return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where(key,value)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')

}
public async find_qas_form_date(ctx:HttpContextContract)
{

  var key=ctx.request.input('key')
  var value=ctx.request.input('value')
  var from_date=ctx.request.input('from_date')
  var to_date=ctx.request.input('to_date')
  var id=ctx.request.headers()['id']||''
  var roletype=ctx.request.input('roletype')
  var branch=ctx.request.headers()['branch']||''



  if(roletype=='operator')
return  await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.operator_id',id)
   .where(key,'>=',from_date)
   .where(key,'<=',to_date)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
else
return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where(key,'>=',from_date)
   .where(key,'<=',to_date)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')










}


public async find_qas_form2(ctx:HttpContextContract)
{


  var key=ctx.request.input('key')
  var value=ctx.request.input('value')
  var id=ctx.request.headers()['id']||''
  var roletype=ctx.request.input('roletype')
  var branch=ctx.request.headers()['branch']||''

var find=await Database.from('qasformtwos')
  .where(key,value)
  .where('qasformtwos.branch',branch).first()//new branch

  if(find){
var qas_form_one_id=find.qas_form_one_id;
console.log("qasoneid",qas_form_one_id)
  if(roletype=='operator')
return  await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.operator_id',id)
   .where("qasformones.id",qas_form_one_id)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
else
return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where("qasformones.id",qas_form_one_id)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
   }
return [];
  }

public async updateQasForms(ctx:HttpContextContract)
{

  var qasFormOneInput=ctx.request.input('qasFormOne')
  var qasFormTwoInput=ctx.request.input('qasFormTwo')
// console.log(qasFormOneInput)
// console.log(qasFormTwoInput)
  // var qas=   await Qasformone
  // .query()
  // .where('id', qasFormOneInput.id)

  // .update(qasFormOneInput)
  var qas=   await Qasformone.findOrFail(qasFormOneInput.id)
  qasFormOneInput['header_format']=JSON.stringify(qasFormOneInput.header_format)
    await qas.merge(qasFormOneInput).save()

  qasFormTwoInput.forEach(async element => {
    console.log(element.id)
    await Qasformtwo
    .query()
    .where('id', element.id)
    .update({qas_form_two_values:element.qas_form_two_values})
    // var qas=await Qasformtwo.findOrFail(element.id)
    // await qas.merge(element).save()


  });



  // await Qasformtwo.updateOrCreateMany('id', qasFormTwoInput)
  return ctx.response.send(qas)
}


public async skiplevel(ctx){

var branch=ctx.request.headers()['branch']||''
var invoice_no=ctx.request.input('invoice_no')
var rmcode=ctx.request.input('rmcode')
var supplier_name=ctx.request.input('supplier_name')
// var total= await Database.from('qasformtwos')
// .groupBy('supplier_name','rmcode')
// .where('branch',branch)
// .countDistinct("*","total").first(
//   )
var total= await Database.from('qasformtwos')
.where('branch',branch)
.where('rmcode',rmcode)
.where('supplier_name',supplier_name)
.countDistinct("invoice_no","total").first(
  )

 var check=await Database.from('qasformtwos')
  .where('branch',branch)
  .where('rmcode',rmcode)
  .where('supplier_name',supplier_name)
  .where('invoice_no',invoice_no).first()
var found=false;
var skiplevel_status=false;
if(check){
found=true;
skiplevel_status=check.skiplevel_status

}

return ctx.response.send({
  total:total.total,
  found,
  ref:invoice_no+supplier_name+rmcode,
  invoice_no,
  supplier_name,
  rmcode,
  skiplevel_status


})


}

public async findbyheader(ctx){
  var branch=ctx.request.headers()['branch']||''
  // var find=JSON.stringify(ctx.request.input('find'))
  var find=ctx.request.input('find')

  var value=find.value;
  // var key=find.key
  var prepare={}
  prepare['value']=value;
  var findQuery=JSON.stringify([prepare])
  console.log(find)
console.log(prepare,value,findQuery)
// return await Database
//   .from('qasformones')
//   .where('header_format','@>',findQuery)
  var id=ctx.request.headers()['id']||''
  var roletype=ctx.request.input('roletype')
  var branch=ctx.request.headers()['branch']||''


  if(roletype=='operator')
return  await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.operator_id',id)
   .where('qasformones.header_format','@>',findQuery)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
else
return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.header_format','@>',findQuery)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')




}
public async filter(ctx){

  // var branch=ctx.request.headers()['branch']||''
  // var invoice_no=ctx.request.input('invoice_no')
  // var rmcode=ctx.request.input('rmcode')
  // var supplier_name=ctx.request.input('supplier_name')
  // var total= await Database.from('qasformtwos')
  // .groupBy('supplier_name','rmcode')
  // .where('branch',branch)
  // .countDistinct("*","total").first(
  //   )
  // var total =await Database.rawQuery('select * from qasformones  where "{label:supplier}" = ANY (header_format)')

// var total =await Database.rawQuery(`select s.*,j from
// qasformones  s
//  cross join lateral json_array_elements(header_format) as j
//  WHERE j->>label like 'sup%'`)

  // var total= await Database.from('qasformones')
  // .whereRaw('qas_form_one_values @> "{c:C}" ')

  // var total =await Database.rawQuery('select * from qasformones  where "{c:C}" = ANY (qas_form_one_values)')
//json column
//   var total =await Database.rawQuery(`SELECT *
// FROM   qasformones q
// WHERE  EXISTS (
//    SELECT FROM unnest(q.header_format) js
//    WHERE  js->>'label' = 'SUPPLIER'   -- match case!
//    )`)

var total= await Database
.from('qasformones')
.select("*")
.where('header_format','@>','[{"label":"SUPPLIER"}]')

  //  var total =await Database.rawQuery(`SELECT *
  //  FROM   qasformones q
  //  WHERE  header_format @> '[{"ponumber":"SUPPLIER"}]'`)


  //success
  // var total =await Database.rawQuery("select * from qasformones where qas_form_one_values ->> 'c' = 'C'")
  // var total =await Database.rawQuery(`SELECT *
  // FROM   qasformones q
  // WHERE  header_format @> '[{"label":"SUPPLIER"}]'`)

return total;

  }

public async irNum(branch){


var month_num=moment().format("M")
var year=moment().format("YYYY")
var total= await Database.from('qasformones')
.whereRaw(`
EXTRACT('month' from  created_at) = `+month_num+`
and EXTRACT('year' from created_at)=`+year+``)
.where('branch',branch)
.count("*","total").first()

var inc= parseFloat(total.total||0)+1;
 return inc;
// if(!await Database.from('irnums').where('id',branch).first()){

//    await Irnum.create({
//     id:branch,
//     count:1
//   })
//  result= await Database.from('irnums').where('id',branch).first()
// return result["count"];
// }

//  await Database.from('irnums')
// .increment('count',1).where('id',branch).first()

// result= await Database.from('irnums').where('id',branch).first()
// return result['count']

}

  public async  invoiceImageDelete(ctx:HttpContextContract){


    var id=ctx.request.input('id')
var result=   await Qasformonemedia.query().where('id',id).delete()

return result;
  }

public async qasFormBulkUpdateStatus(cts:HttpContextContract){

// var qas=[{id:1,status},{id:2,status}]





}

public async approverlist(ctx:HttpContextContract){

  var id=ctx.request.input('id')
  var roletype=ctx.request.input('roletype')
   var from_date=ctx.request.input('from_date')
  var to_date=ctx.request.input('to_date')

  var branch=ctx.request.headers()['branch']||''



  if(roletype=='operator')
return  await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .where('qasformones.operator_id',id)
   .andWhere('qasformones.date','>=',from_date)
   .andWhere('qasformones.date','<=',to_date)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
else
return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.branch',branch)//new branch
   .andWhere('qasformones.date','>=',from_date)
   .andWhere('qasformones.date','<=',to_date)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')







//   if(roletype=='operator')
//   return await Qasformone.query()
//   .where('operator_id',id)
//   .andWhere('date','>=',from_date)
//   .andWhere('date','<=',to_date)
// else
//   return await Qasformone.query()
// .andWhere('date','>=',from_date)
// .andWhere('date','<=',to_date)


}

public async qasFormOneStatus(obj={id:0,status:''}){


await Qasformone.query().where('id',obj.id).update('status',obj.status)

}
  public async qasFormUpdateStatus(ctx:HttpContextContract){

var id=ctx.request.input('id')
var status=ctx.request.input('status')
var approved_by=ctx.request.input('approved_by');
var result=await Qasformone.query().where('id',id).update('status',status)
.update('approved_by',approved_by)

return result;

  }
public async getOperatorQasFormList(ctx:HttpContextContract)
{

  var operator_id=ctx.request.input('id')
  var from_date=ctx.request.input('from_date')
  var to_date=ctx.request.input('to_date')
  console.log('id',operator_id,from_date,to_date)

  return await Database
  .from('qasformones')
   .select("qasformones.*","users.name as operator_name","users.branch as operator_branch","us.name as approver_name")
   .where('qasformones.operator_id',operator_id)
   .andWhere('qasformones.date','>=',from_date)
   .andWhere('qasformones.date','<=',to_date)
   .leftJoin('users','users.id','=','qasformones.operator_id')
   .leftJoin('users as us','us.id','=','qasformones.approved_by')
//--------------------------using---------------------------
  // return await Database
  // .from('qasformones')
  //  .select("qasformones.*","users.name as operator_name","users.branch as operator_branch")
  //  .where('qasformones.operator_id',operator_id)
  //  .andWhere('qasformones.date','>=',from_date)
  //  .andWhere('qasformones.date','<=',to_date)
  //  .leftJoin('users','users.id','=','qasformones.operator_id')
//--------------------------using---------------------------


}
  public async  updateQasFormTwo(ctx: HttpContextContract) {
//having doubt while update
    var qasFormTwo=ctx.request.input('qasFormTwo')

    for(var qasfromtwoIndex in qasFormTwo){
    const    {
id=0,
      // qty=0,
      error_status=false,
      batch_no='',
      // coil='',
      weight=0,
      // width_one=0,
      // width_two=0,
      // thick_one=0,
      // thick_two=0,
      lot_no='',
      validation='',
      qas_form_two_values={},
      qas_form_two_validation={}


    }=qasFormTwo[qasfromtwoIndex]
  var qas=   await Qasformtwo
    .query()
    .where('id', id)
    .update({
      // qty,
      error_status,
      batch_no,
      // coil,
      weight,//
      // width_one,
      // width_two,
      // thick_one,
      // thick_two,

      lot_no,
      validation,
      qas_form_two_values,
      qas_form_two_validation
     })
    }
     return qas;
  }


  public async  updateQasFormOne(ctx: HttpContextContract) {

    const    {
      id=0,
      operator_id=0,
      supplier_name='',
      invoice_table_id=0,
      invoice_client_id="",
      invoice_no='',
      invoice_date=moment().format("YYYY-MM-DD"),
      invoice_qty=0,
      ir='',
      grn_no='',
      grn_date=moment().format("YYYY-MM-DD"),
      rmcode='',
      eds='',
      rm='',
      received_qty=0,
      product_name='',
      form_format='',
      comment='',
      duedate=moment().format("YYYY-MM-DD"),
      observation_print_view=[],
      observation_format=[],
      header_format=[],
      remarks='',
      approved_by=0,
      skiplevel_status=false,
      roletype='',
      qas_form_one_values={},
      qas_form_one_validation={}
      // date=moment().format("YYYY-MM-DD"),


    }=ctx.request.all()

    // return ctx.request.all()
  var qas=   await Qasformone
    .query()
    .where('id', id)
    .update({
      invoice_table_id,
      operator_id,
      product_name,
      supplier_name,
      invoice_client_id,
      rmcode,
      eds,
      rm,
      form_format,
      comment,
      invoice_no,
      invoice_date,
      invoice_qty:parseFloat(invoice_qty)||0,
      ir,
      grn_no,
      grn_date,
      received_qty:parseFloat(received_qty)||0,
      duedate,
      observation_print_view,
      observation_format,
      header_format,
      // header_format:JSON.stringify(header_format),
      remarks,
      approved_by,
      skiplevel_status,
      roletype,
      qas_form_one_values,
      qas_form_one_validation
     })

  // var qas=   await Qasformone
  //   .query()
  //   .where('id', id)
  //   .update("observation_format",observation_format)

     return observation_format;
  }
public async getQasFormOneList(ctx:HttpContextContract)
{
//find date with to get better performnce
return await Qasformone.all()
}

public async getQasOneIR(ctx:HttpContextContract)
{


var ir=  ctx.request.input('ir')
var branch=ctx.request.headers()['branch']||''
console.log(ir,branch)
var rt=await  Qasformone.query()
 .where('ir',ir)
 .andWhere('branch',branch).first()

  // return ctx.response.send(rt);
// console.log("invoice table id",invoice_table_id)


var qasFormOne=await Database
.from('qasformones as qas')
.select('qas.*',
'p.observation_print_view as observation_print_view',
'u.name as operator_name',
'au.name as approver_name'
)
.where('invoice_table_id',rt.invoice_table_id)
.leftJoin('masterproducts as p','p.rmcode','=','qas.rmcode')
.leftJoin('users as u','u.id','=','qas.operator_id')
.leftJoin('users as au','au.id','=','qas.approved_by')
.first()
return {

    invoice:{
qasFormOne,
// qasFormOne:await Qasformone.query().where('invoice_table_id',invoice_table_id).first(),
qasFormTwo:await Qasformtwo.query().where('invoice_table_id',rt.invoice_table_id),
gallery:await Qasformonemedia.query().where('invoice_table_id',rt.invoice_table_id)

    }


  }


}


public async getQasSingleForm(ctx:HttpContextContract)
{

  var invoice_table_id=ctx.request.input('invoice_table_id')
console.log("invoice table id",invoice_table_id)


var qasFormOne=await Database
.from('qasformones as qas')
.select('qas.*',
'p.table_header_format as table_header_format',
'p.observation_format as observation_format',
'p.observation2_format as observation2_format',
'p.observation_print_view as observation_print_view',
'p.observation2_print_view as observation2_print_view',
'p.observation_header_print_view as observation_header_print_view',
'p.observation2_header_print_view as observation2_header_print_view',
'u.name as operator_name',
'au.name as approver_name'
)
.where('invoice_table_id',invoice_table_id)
.leftJoin('masterproducts as p','p.rmcode','=','qas.rmcode')
.leftJoin('users as u','u.id','=','qas.operator_id')
.leftJoin('users as au','au.id','=','qas.approved_by')

.first()
return {

    invoice:{
qasFormOne,
// qasFormOne:await Qasformone.query().where('invoice_table_id',invoice_table_id).first(),
qasFormTwo:await Qasformtwo.query().where('invoice_table_id',invoice_table_id),
gallery:await Qasformonemedia.query().where('invoice_table_id',invoice_table_id)

    }


  }


}
public async checkProductsBatch(ctx:HttpContextContract)
{
var products=ctx.request.input('products')
console.log(products)
var productsResult=[];
for(var productIndex in products){

 products[productIndex]['isExist']=await this.productBatchCheck(ctx,products[productIndex].batch_no)
 products[productIndex]['isRmcodeExist']=await this.productPartNoCheck(ctx,products[productIndex].rmcode)

 productsResult.push(products[productIndex])
}

return ctx.response.send(products)

}


public async  productPartNoCheck(ctx:HttpContextContract,rmcode){


  // var batch_no=ctx.request.input('batch_no')||''
  // console.log("Rmcode",rmcode)
var  check=await Masterproduct.query().where('rmcode',rmcode).first();

if(check) return true;
return false;


}



public async  productBatchCheck(ctx:HttpContextContract,batch_no){


    // var batch_no=ctx.request.input('batch_no')||''
    console.log("batch no",batch_no)
var  check=await Qasformtwo.query().where('batch_no',batch_no).first();
console.log("batch no",check?true:false)

if(check) return true;
return false;


  }

  public async invoiceUpload(ctx:HttpContextContract){
  // Access file
  const coverImage = ctx.request.file('file', {
    extnames: ['jpg', 'png', 'jpeg','pdf'],
    size: '200mb'
  })
console.log(coverImage)
const {
  invoice_client_id='',
  invoice_table_id=0,
  invoice_no='',
  file_type='',
  title=''



}=ctx.request.all()
var uuid=uuidv4()
  // Check for errors
  // if (coverImage.hasErrors()) {
  //   return coverImage.errors()
  // }

  // Move to uploads directory


  Qasformonemedia.create({

  invoice_table_id,
  invoice_client_id,
  invoice_no,
  ext:coverImage?.extname,
  name:uuid,
  full_name:uuid+'.'+coverImage?.extname,
file_type,
title
})

  await coverImage?.move(Application.publicPath('uploads'),{
    name:uuid+'.'+coverImage?.extname,

  })

//   const images = ctx.request.files('file')
//   // await images[0].move('uploads')
// console.log(Application.publicPath('uploads'))
//   for (let image of images) {
// var uuid=uuidv4()
//     // image.clientName="test.jpeg"
//     console.log("Ext",image.extname)
//     console.log("file",image.fileName)
//     console.log("path",image.filePath)
//     console.log("client name",image.clientName)
//     console.log("field name",image.fieldName)
//     console.log("size",image.size)
//     console.log("temp path",image.tmpPath)
//     // console.log("temp path",image.)




//     await image.move(Application.publicPath('uploads'),{
//       name:uuid+'.'+image.extname,

//     })
  // }
}

public async deleteQasFormOne(ctx:HttpContextContract){


  var invoice_table_id=ctx.request.input('invoice_table_id')

   await Qasformone.query().where('invoice_table_id',invoice_table_id).delete()
   await Qasformtwo.query().where('invoice_table_id',invoice_table_id).delete()
   await Qasformonemedia.query().where('invoice_table_id',invoice_table_id).delete()
   Ws.io.emit('invoice_add', {  })
  return ctx.response.send(true);


}


  public async addInvoices(ctx:HttpContextContract){
var $vm=this;
var invoices=ctx.request.input('invoices')
var result=[];
var invoiceTable={id:0};
var branch=ctx.request.headers()['branch']||''
// console.log('branch ir num',await $vm.irNum(branch))

// return invoices;
for(var invoiceIndex in invoices){

var getInvoice=invoices[invoiceIndex]

 invoiceTable=await Invoice.create({
invoice_client_id:getInvoice.invoice_client_id||'',
supplier_name:getInvoice.supplier_name||'',
invoice_no:getInvoice.invoice_no||'',
invoice_date:getInvoice.invoice_date||moment().format("YYYY-MM-DD"),
grn_no:getInvoice.grn_no||'',
grn_date:getInvoice.grn_date||moment().format("YYYY-MM-DD"),
operator_id:getInvoice.operator_id||0


})


// invoiceTable.id
result.push(invoiceTable)


  var qasFormOneArray=invoices[invoiceIndex].qasForm1New;
console.log('Gallery',invoices[invoiceIndex].gallery)



  for(var qasForm1Index in qasFormOneArray){
var irNum=core.prefixIRNum() +"-"+ await $vm.irNum(branch);
    const    {
      operator_id=0,
      supplier_name='',
      invoice_client_id="",
      invoice_no='',
      invoice_date=moment().format("YYYY-MM-DD"),
      invoice_qty=0,
      ir=0,
      grn_no='',
      grn_date=moment().format("YYYY-MM-DD"),
      rmcode='',
      eds='',
      rm='',
      received_qty=0,
      product_name='',
      form_format='',
      comment='',
      duedate=moment().format("YYYY-MM-DD"),
      // observation_print_view=[],
      // observation_format=[],

      header_format=[],
      remarks='',
      approved_by=0,
      batch='',
      skiplevel_status=false,
      roletype='',
      status='pending',
      notes='',
      skuid='',
      sk_index=0,
      sk_order='',
      qas_form_one_values={},
      qas_form_one_validation={},
      date=moment().format("YYYY-MM-DD"),

        }=qasFormOneArray[qasForm1Index]

//
var setHeaderFormat=_.map(header_format,(x)=>{

  if(x.name=='ir') x['value']=irNum;
  if(x.name=='ir') x['value']=irNum;
  return x;
})

        // console.log("before",qasFormOneArray[qasForm1Index])
  var qasformone= await Qasformone.create({
    invoice_table_id:invoiceTable.id,
    operator_id,
    product_name,
    supplier_name,
    invoice_client_id,
    rmcode,
    eds,
    rm,
    form_format,
    comment,
    invoice_no,
    invoice_date,
    invoice_qty:parseFloat(invoice_qty)||0,
    ir:irNum,
    grn_no,
    grn_date,
    received_qty:parseFloat(received_qty)||0,
    duedate,
    // observation_print_view,
    // observation_format,
    header_format:setHeaderFormat,
    remarks,
    approved_by,
    skiplevel_status,
    status,
    roletype,
    batch,
    branch,
    notes,
    skuid,
    sk_index,
    sk_order,

    qas_form_one_values,
    qas_form_one_validation,

    date

  })
  console.log(qasformone)
var qasform2Products=qasFormOneArray[qasForm1Index].qasForm2New
  var qasFormOneId=qasformone.id||0;
for(var qasform2Productindex in qasform2Products)
{
  var product=qasform2Products[qasform2Productindex];
// console.log("product",product)

// var {
//   // qas_form_one_id=0,
//   // invoice_client_id='',
//   // rmcode='',
//   // eds='',
//   // supplier_name='',
//   // qty=0,
//   // grn_date='',
//   error_status=false,
//   batch_no='',
//   // coil='',
//   weight=0,
//   width_one=0,
//   width_two=0,
//   thick_one=0,
//   thick_two=0,
//   lot_no='',
//   validation='',
//   qas_form_two_values={},
//   qas_form_two_validation={}
//   // date=moment().format("YYYY-MM-DD"),

// }=product

var qasform2=qasform2Products[qasform2Productindex];
console.log("++++qasform2+++")
console.log(qasform2)
var createQasFormTwo={
  invoice_table_id:invoiceTable.id,
  branch,
    qas_form_one_id:parseFloat(qasFormOneId)||0,
    invoice_client_id:qasform2.invoice_client_id,
    invoice_no:getInvoice.invoice_no||'',//
    rmcode:getInvoice['rmcode'],
    eds:getInvoice['eds'],
    supplier_name:getInvoice['supplier_name'],
    // qty:parseFloat(qty)||0,
    grn_date:getInvoice['grn_date'],
    grn_no:getInvoice['grn_no']||'',//
    error_status:qasform2.error_status,
    batch_no:qasform2.batch_no||'',
    // coil,
    weight:qasform2.weight||"",
    // width_one:qasform2.width_one||"",
    // width_two:qasform2.width_two||'',
    // thick_one:qasform2.thick_one||'',
    // thick_two:qasform2.thick_two||'',
    lot_no:qasform2.lot_no||'',
    validation:qasform2.validation||false,
    qas_form_two_values:qasform2.qas_form_two_values||{},
    qas_form_two_validation:qasform2.qas_form_two_validation||{},
    date:moment().format("YYYY-MM-DD"),///product['date'],
   other:{}
   }
await Qasformtwo.create(createQasFormTwo)
}


  // console.log("after")
  // console.log('qasformone',qasformone)

  }

}
Ws.io.emit('invoice_add', {  })
return ctx.response.send({
  successStatus:true,
  error:'no issue',
  data:result

})

  }


    public async addInvoiceSingle(ctx:HttpContextContract){
var $vm=this;
var single_invoice=ctx.request.input('invoice')
var result=[];
var invoiceTable={id:0};
var branch=ctx.request.headers()['branch']||''
// console.log('branch ir num',await $vm.irNum(branch))

// return invoices;


var getInvoice=single_invoice

 invoiceTable=await Invoice.create({
invoice_client_id:getInvoice.invoice_client_id||'',
supplier_name:getInvoice.supplier_name||'',
invoice_no:getInvoice.invoice_no||'',
invoice_date:getInvoice.invoice_date||moment().format("YYYY-MM-DD"),
grn_no:getInvoice.grn_no||'',
grn_date:getInvoice.grn_date||moment().format("YYYY-MM-DD"),
operator_id:getInvoice.operator_id||0


})


// invoiceTable.id
result.push(invoiceTable)


  var qasFormOneArray=getInvoice.qasForm1New;
// console.log('Gallery',getInvoice.gallery)



  for(var qasForm1Index in qasFormOneArray){
var irNum=core.prefixIRNum() +"-"+ await $vm.irNum(branch);
    const    {
      operator_id=0,
      supplier_name='',
      invoice_client_id="",
      invoice_no='',
      invoice_date=moment().format("YYYY-MM-DD"),
      invoice_qty=0,
      ir=0,
      grn_no='',
      grn_date=moment().format("YYYY-MM-DD"),
      rmcode='',
      eds='',
      rm='',
      received_qty=0,
      product_name='',
      form_format='',
      comment='',
      duedate=moment().format("YYYY-MM-DD"),
      // observation_print_view=[],
      // observation_format=[],

      header_format=[],
      remarks='',
      approved_by=0,
      batch='',
      skiplevel_status=false,
      roletype='',
      status='pending',
      notes='',
      skuid='',
      sk_index=0,
      sk_order='',
      qas_form_one_values={},
      qas_form_one_validation={},
      date=moment().format("YYYY-MM-DD"),

        }=qasFormOneArray[qasForm1Index]

//
var setHeaderFormat=_.map(header_format,(x)=>{

  // if(x.name=='ir') x['value']=irNum;
  if(x.name=='ir') x['value']=irNum;
  return x;
})

        // console.log("before",qasFormOneArray[qasForm1Index])
  var qasformone= await Qasformone.create({
    invoice_table_id:invoiceTable.id,
    operator_id,
    product_name,
    supplier_name,
    invoice_client_id,
    rmcode,
    eds,
    rm,
    form_format,
    comment,
    invoice_no,
    invoice_date,
    invoice_qty:parseFloat(invoice_qty)||0,
    ir:irNum,
    grn_no,
    grn_date,
    received_qty:parseFloat(received_qty)||0,
    duedate,
    // observation_print_view,
    // observation_format,
    header_format:JSON.stringify(setHeaderFormat),//test
    remarks,
    approved_by,
    skiplevel_status,
    status,
    roletype,
    batch,
    branch,
    notes,
    skuid,
    sk_index,
    sk_order,

    qas_form_one_values,
    qas_form_one_validation,

    date

  })
  var qasform2Products=qasFormOneArray[qasForm1Index].qasForm2New
  var qasFormOneId=qasformone.id||0;

  for(var qasform2Productindex in qasform2Products)
{
  // var product=qasform2Products[qasform2Productindex];
// console.log("product",product)

// var {
//   // qas_form_one_id=0,
//   // invoice_client_id='',
//   // rmcode='',
//   // eds='',
//   // supplier_name='',
//   // qty=0,
//   // grn_date='',
//   error_status=false,
//   batch_no='',
//   // coil='',
//   weight=0,
//   width_one=0,
//   width_two=0,
//   thick_one=0,
//   thick_two=0,
//   lot_no='',
//   validation='',
//   qas_form_two_values={},
//   qas_form_two_validation={}
//   // date=moment().format("YYYY-MM-DD"),

// }=product

var qasform2=qasform2Products[qasform2Productindex];
console.log("++++qasform2+++")
console.log(qasform2)
var createQasFormTwo={
  invoice_table_id:invoiceTable.id,
  branch,
    qas_form_one_id:parseFloat(qasFormOneId)||0,
    invoice_client_id:qasform2.invoice_client_id,
    invoice_no:getInvoice.invoice_no||'',//
    rmcode:getInvoice['rmcode'],
    eds:getInvoice['eds'],
    supplier_name:getInvoice['supplier_name'],
    // qty:parseFloat(qty)||0,
    grn_date:getInvoice['grn_date'],
    grn_no:getInvoice['grn_no']||'',//
    error_status:qasform2.error_status,
    batch_no:qasform2.batch_no||'',
    // coil,
    weight:qasform2.weight||"",
    // width_one:qasform2.width_one||"",
    // width_two:qasform2.width_two||'',
    // thick_one:qasform2.thick_one||'',
    // thick_two:qasform2.thick_two||'',
    lot_no:qasform2.lot_no||'',
    validation:qasform2.validation||false,
    qas_form_two_values:qasform2.qas_form_two_values||{},
    qas_form_two_validation:qasform2.qas_form_two_validation||{},
    date:moment().format("YYYY-MM-DD"),///product['date'],
   other:{}
   }
await Qasformtwo.create(createQasFormTwo)
}


  // console.log("after")
  // console.log('qasformone',qasformone)

  }


Ws.io.emit('invoice_add', {  })
return ctx.response.send({
  successStatus:true,
  error:'no issue',
  data:result

})

  }
  public async  createQasFormOne(ctx: HttpContextContract) {
    const    {
      operator_id=0,
      supplier_name='',
      invoice_no='',
      invoice_date=moment().format("YYYY-MM-DD"),
      invoice_qty=0,
      ir='',
      grn_no='',
      grn_date=moment().format("YYYY-MM-DD"),
      rmcode='',
      eds='',
      rm='',
      received_qty=0,
      product_name='',
      form_format='',
      comment='',
      duedate=moment().format("YYYY-MM-DD"),
      observation_print_view=[],
      observation_format=[],
      header_format=[],
      remarks='',
      approved_by=0,
      skiplevel_status=false,
      roletype='',
      date=moment().format("YYYY-MM-DD"),

        }=ctx.request.all()



 return await Qasformone.create({
        operator_id,
        product_name,
        supplier_name,
        rmcode,
        eds,
        rm,
        form_format,
        comment,
        invoice_no,
        invoice_date,
        invoice_qty,
        ir,
        grn_no,
        grn_date,
        received_qty,
        duedate,
        observation_print_view,
        observation_format,
        header_format,
        remarks,
        approved_by,
        skiplevel_status,
        roletype,
        date

       })







    }

    public async  products(ctx: HttpContextContract) {

    return await Qasformone.all();
    }

    public async getelement(ctx:HttpContextContract){

// return await Database.rawQuery("select * from qasformones where observation_format -> 'value' = 2",[])

return await Database.rawQuery(`select ui.info ->> 'id' as id,
ui.info ->> 'name' as name
from qasformones t
cross join lateral jsonb_array_elements(t.observation_format) as ui(info)
where t.id = 1;`)
}
}
