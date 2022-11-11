import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from 'App/Models/Machine'
import MachineActivity from 'App/Models/MachineActivity'
import MachineActivityMain from 'App/Models/MachineActivityMain';
import MachineActivityPartNo from 'App/Models/MachineActivityPartNo';
import moment from 'moment';
import _ from 'lodash'
let Validator = require('validatorjs');


export default class MachinesController {

  public async FN_SEARCH_MACHINE_PART_NO(data)
  {
    var machine_id=data.machine_id;
    var machine_client_id=data.machine_client_id;
    var product_id=data.product_id;
    console.log("FN_SEARCH_MACHINE_PART_NO",machine_id,machine_client_id,product_id)
var result=await MachineActivityPartNo.query().where('machine_id',machine_id)    .andWhere('machine_client_id',machine_client_id)
    .where('product_id',product_id);

    if(_.isEmpty(result)) return true;
    return false;
  }

  public async FN_SEARCH_MACHINE_MAIN(data)
  {
    var machine_id=data.machine_id;
    var machine_client_id=data.machine_client_id;
    console.log("FN_SEARCH_MACHINE_MAIN",machine_id,machine_client_id)
var result=await MachineActivityPartNo.query().where('machine_id',machine_id)    .andWhere('machine_client_id',machine_client_id);
console.log(result)
if(_.isEmpty(result)) return true;
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

if(await this.FN_SEARCH_MACHINE_PART_NO(data)){
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
    var emp_id=data.emp_id;
    var machine_client_id=data.machine_client_id
    var machine_date=data.machine_data
    var machine_time=data.machine_time
    var machine_active_status=data.machine_active_status;

    if(await this.FN_SEARCH_MACHINE_MAIN(data)){
    var result=await MachineActivityMain.create({
company_id,
shift_id,
emp_id,
machine_client_id,
machine_date:moment(machine_date).format('YYYY-MM-DD'),
machine_time,
machine_active_status
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

  var result=await MachineActivity.create({
      company_id,
      shift_id,
      shift_name,
      machine_id,
      machine_name,
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


  // let rules = {
  //   company_id:'required|integer',
  //   shift_id:'required|integer',
  //   shift_name:'required|string',
  //   machine_id:'required|integer',
  //   machine_name:'required|string',
  //   machine_client_id:'required|integer',
  //   machine_date:'required|date',
  //   machine_time:'required|string',
  //   machine_active_status:'required|boolean',
  //   break_type:'required|string',
  //   break_reason:'required|string',
  //   product_id:'required|integer',
  //   product_name:'required|string',
  //   emp_id:'required|integer',
  //   emp_name:'required|string',

  // };
  // let validation = new Validator(data, rules );
  // // validation.fails();
  // if(validation.passes()){
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
