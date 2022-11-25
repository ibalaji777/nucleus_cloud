/*eslint-disable*/
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from 'App/Models/Machine'
import MachineActivity from 'App/Models/MachineActivity'
import MachineActivityMain from 'App/Models/MachineActivityMain';
import MachineActivityPartNo from 'App/Models/MachineActivityPartNo';
import moment from 'moment';
import _ from 'lodash'
import Database from "@ioc:Adonis/Lucid/Database";
let Validator = require('validatorjs');


export default class MachinesController {


public async GET_MACHINE_STATUS_BY_DATE(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var machine_id=data.machine_id;
var from_date=data.from_date;
var to_date=data.to_date;
var result=await MachineActivityMain.
query()
.where('machine_id',machine_id)
.andWhere('machine_date','>=',from_date)
.andWhere('machine_date','<=',to_date);
return ctx.response.send({
success:true,
msg:'',
data:result,
})

}

public async GET_MACHINE_RUNNING_PART_NO(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var machine_client_id=data.machine_client_id;
var machine_id=data.machine_id;
var result=await Database
.from('machine_activity_part_nos')
 .select("machine_activity_part_nos.*","products.name as product_name","products.part_no as part_no","products.material_code as material_code","products.vendor_name as vendor_name","products.customer_name as customer_name","products.other_detail as other_detail")
 .where('machine_activity_part_nos.machine_id',machine_id)//new branch
 .where('machine_activity_part_nos.machine_client_id',machine_client_id)//new branch
 .leftJoin('products','products.id','=','machine_activity_part_nos.product_id')

return ctx.response.send({
success:true,
msg:'',
data:result,
})



}
public async GET_MACHINE_RUNNING_MAIN(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var machine_client_id=data.machine_client_id;
var machine_id=data.machine_id;
var result=await Database
.from('machine_activity_mains')
 .where('machine_id',machine_id)//new branch
 .where('machine_client_id',machine_client_id)//new branch

return ctx.response.send({
success:true,
msg:'',
data:result,
})

}

public async GET_MACHINE_RUNNING_ACTIVITY(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var machine_client_id=data.machine_client_id;
var machine_id=data.machine_id;
var result=await Database
.from('machine_activities')
 .where('machine_id',machine_id)//new branch
 .where('machine_client_id',machine_client_id)//new branch

return ctx.response.send({
success:true,
msg:'',
data:result,
})

}

  public async FN_SEARCH_MACHINE_PART_NO(data)
  {
    var machine_id=data.machine_id;
    var machine_client_id=data.machine_client_id;
    var product_id=data.product_id;
    // console.log(data)
    // console.log("FN_SEARCH_MACHINE_PART_NO",machine_id,machine_client_id,product_id)
var result=await MachineActivityPartNo.
query()
.where('machine_id',machine_id)
.andWhere('machine_client_id',machine_client_id)
.andWhere('product_id',product_id);

    if(result.length==0) return true;
    return false;
  }

  public async IS_FOUND_MACHINE_MAIN_STAUTS(data)
  {
    var machine_id=data.machine_id;
    var machine_client_id=data.machine_client_id;

var result=await MachineActivityMain.query().where('machine_id',machine_id).andWhere('machine_client_id',machine_client_id);
console.log("rts",result,result.length)
if(result.length!=0) return true;
return false;


  }

  public async FN_INSERT_MACHINE_PART_NO(data)
  {
    var part_no=data.part_no;
    var product_id=data.product_id;
    var company_id=data.company_id
    var shift_id=data.shift_id;
    var emp_id=data.emp_id;
    var machine_client_id=data.machine_client_id
    var machine_id=data.machine_id
    var machine_date=data.machine_data
    var machine_time=data.machine_time
    var good_count=data.good_count;
    var reject_count=data.reject_count;
    var ideal_cycle=data.ideal_cycle
var check= await this.FN_SEARCH_MACHINE_PART_NO(data)
if(check){
    var result=await MachineActivityPartNo.create({
      good_count,
      reject_count,
      ideal_cycle,
part_no,
product_id,
company_id,
shift_id,
emp_id,
machine_client_id,
machine_id,
machine_date:moment(machine_date).format('YYYY-MM-DD'),
machine_time,


})

return result

}

  }

  public async FN_INSERT_MACHINE_MAIN(data)
  {

    var company_id=data.company_id
    var shift_id=data.shift_id;
    var machine_id=data.machine_id;
    var emp_id=data.emp_id;
    var machine_client_id=data.machine_client_id
    var machine_date=data.machine_data
    var machine_time=data.machine_time
    var is_closed=data.is_closed;

   var check= await this.IS_FOUND_MACHINE_MAIN_STAUTS({machine_client_id,machine_id})

   console.log("machine status",check)
    if(!check){
    var result=await MachineActivityMain.create({
company_id,
shift_id,
machine_id,
emp_id,
machine_client_id,
machine_date:moment(machine_date).format('YYYY-MM-DD'),
machine_time,
is_closed
})
return result
    }
  }
  public async FN_INSERT_MACHINE_ACTIVITY(data)
  {

    var company_id=data.company_id
    var shift_id=data.shift_id
    var shift_name=data.shift_name
    var machine_id=data.machine_id
    var machine_name=data.machine_name
    var machine_client_id=data.machine_client_id
    var machine_date=data.machine_date
    var machine_time=data.machine_time
    var company_id=data.company_id
    var break_type=data.break_type
    var break_reason=data.break_reason
    var product_id=data.product_id
    var product_name=data.product_name
    var emp_id=data.emp_id
    var emp_name=data.emp_name
    var stroke=data.stroke
    var machine_active_status=data.machine_active_status;


  var result=await MachineActivity.create({
      company_id,
      shift_id,
      shift_name,
      machine_id,
      machine_name,
      machine_active_status,
      machine_client_id,
      machine_date,
      machine_time,
      break_type,
      break_reason,
      product_id,
      product_name,
      emp_id,
      emp_name,
      stroke
   })

return result
  }

public async insert(ctx:HttpContextContract)
{

  var data=ctx.request.input('data')



  var company_id=data.company_id
  var shift_id=data.shift_id
  var shift_name=data.shift_name
  var machine_id=data.machine_id
  var machine_name=data.machine_name
  var machine_client_id=data.machine_client_id
  var machine_date=data.machine_date
  var machine_time=data.machine_time
  var machine_active_status=data.machine_active_status
  var company_id=data.company_id
  var break_type=data.break_type
  var break_reason=data.break_reason
  var product_id=data.product_id
  var product_name=data.product_name
  var emp_id=data.emp_id
  var emp_name=data.emp_name
  var stroke=data.stroke

var id=await MachineActivity.create({
    company_id,
    shift_id,
    shift_name,
    machine_id,
    machine_name,
    machine_client_id,
    machine_date,
    machine_time,
    machine_active_status,
    break_type,
    break_reason,
    product_id,
    product_name,
    emp_id,
    emp_name,
    stroke
 })

 ctx.response.send({success:true,data:id})
// }
// ctx.response.send({success:false,data:'',error:validation.console.errors()

// })

}



}
