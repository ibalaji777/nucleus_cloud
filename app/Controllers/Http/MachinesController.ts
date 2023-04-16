/*eslint-disable*/
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machine from 'App/Models/Machine'
import MachineActivity from 'App/Models/MachineActivity'
import MachineActivityMain from 'App/Models/MachineActivityMain';
import MachineActivityPartNo from 'App/Models/MachineActivityPartNo';

import MachineLog from 'App/Models/MachineLog';
import MachineHistory from 'App/Models/MachineHistory';
import moment from 'moment';
import Oee from 'App/Models/Oee'
import _ from 'lodash'
import Database from "@ioc:Adonis/Lucid/Database";
let Validator = require('validatorjs');


export default class MachinesController {


public async updateOee(ctx){

let request =ctx.request;

  const data = {
    machine_id: request.body().data.machine_id || 0,
    uq: request.body().data.uq || 0,
    quality: request.body().data.quality || 0,
    availability: request.body().data.availability || 0,
    performance: request.body().data.performance || 0,
    oee: request.body().data.oee || 0
  }

  await Oee.updateOrCreate(
    { machine_id: data.machine_id, uq: data.uq },
    { quality: data.quality, availability: data.availability, performance: data.performance, oee: data.oee }
  )


}


public async machineDetail(machine_id,uq){


// SELECT
// ms.machine_id,
// ms.uq,
// SUM(CASE WHEN ms.action = 'start' THEN ms.duration ELSE 0 END) AS start_duration,
// SUM(CASE WHEN ms.action = 'stop' THEN ms.duration ELSE 0 END) AS stop_duration,
// mlog.duration as overall_duration
// FROM
// machine_histories ms
// LEFT JOIN machine_logs mlog ON ms.machine_id = mlog.machine_id AND ms.uq = mlog.uq
// WHERE
// ms.machine_id = '1'
// AND
// ms.uq = '11'
// GROUP BY
// ms.machine_id,
// ms.uq,
// mlog.duration;

const result = await Database
  .from('machine_histories as ms')
  .leftJoin('machine_logs as mlog', function () {
    this.on('ms.machine_id', '=', 'mlog.machine_id').andOn('ms.uq', '=', 'mlog.uq')
  })
  .select('ms.machine_id', 'ms.uq')
  .select(Database.raw("SUM(CASE WHEN ms.action = 'start' THEN ms.duration ELSE 0 END) AS start_duration"))
  .select(Database.raw("SUM(CASE WHEN ms.action = 'stop' THEN ms.duration ELSE 0 END) AS stop_duration"))
  .select('mlog.duration as overall_duration')
  .where('ms.machine_id', '=', '1')
  .where('ms.uq', '=', '11')
  .groupBy('ms.machine_id', 'ms.uq', 'mlog.duration')
  .first();

console.log(result)
return result;
}

public async MACHINE_HISTORY(request,eTime)
{
  let data={
    operation:request.body().data.operation || '',
    op_id:request.body().data.op_id || 0,
    op_name:request.body().data.op_name || '',
    op_desc:request.body().data.op_desc || '',
    op_min:request.body().data.op_min || 0,
    message:request.body().data.message || '',
    start_time:request.body().data.time || '',
    end_time:null,
    //duration
    machine_id:request.body().data.machine_id || 0,
    product_id:request.body().data.product_id || 0,
    uq:request.body().data.uq || '',
    emp_id:request.body().data.emp_id || 0,
    shift:request.body().data.shift || '',
    type:request.body().data.type || '',
    action:request.body().data.action || '',
    machine_status:request.body().data.machine_status || '',
    stroke:request.body().data.stroke || 0,
    reason:request.body().data.reason || '',
    remarks:request.body().data.remarks || ''
  }

const { uq,machine_id } = data

//tracking history
const mHistory = await MachineHistory.query()
  .where('uq', uq)
  .whereNull('end_time')
  .where('machine_id', machine_id)
  .orderBy('id', 'desc')
  .first();

if (mHistory) {
  //find duration
  const startTime = new Date(mHistory.start_time);
    const endTime = new Date(eTime);
    const durationInMilliseconds = endTime.getTime() - startTime.getTime();
    const durationInSeconds = Math.floor((durationInMilliseconds) / 1000);

  //update end time
  mHistory.merge({end_time:eTime,duration:durationInSeconds})
  await mHistory.save()
  //condition for logout
  if(data.operation!='force'&&data.action!='stop')
  await   MachineHistory.create({...data,start_time:eTime})


} else {
  //first time createing history
 await MachineHistory.create(data)
}


let machineDetail=await this.machineDetail(machine_id,uq);
let history = await MachineHistory.query()
  .where('uq', uq)
  .whereNotNull('end_time')
  .where('machine_id', machine_id)
  .orderBy('id', 'desc');
  return {
    machineDetail,
    history
  };

}
public async getMachineData({request}){

  let rt= await this.getLiveMachineData(request);
return rt;
}

public async getLiveMachineData(request){

 let  uq=request.body().data.uq || '';
 let  machine_id=request.body().data.machine_id || 0;

  const machineLog = await Database.from('machine_logs').where('machine_id',machine_id).andWhere('uq',uq).orderBy('id', 'desc').first();
  const machineHisotry = await Database.from('machine_histories').where('machine_id',machine_id).andWhere('uq',uq).orderBy('id', 'desc').whereNotNull('end_time');
  const currentHistory = await Database.from('machine_histories').where('machine_id',machine_id).andWhere('uq',uq).orderBy('id', 'desc').first();


  return {
    machineLog,
    machineHisotry,
    currentHistory
  }
}
public async machineDelete({request,response}){

  let id= request.body().data.id;

  const mLog = await MachineLog.query()
  .where('id', id)
  .first();

if (mLog) {
  mLog.merge({is_delete:1})
  await mLog.save()
}
return response.ok({
  success:mLog ? true:false,
  msg:mLog ? "Deleted":"Not Found",
})

}

public async getMachineHistory({request,response}){
  let machine_id= request.body().data.machine_id;
  let uq= request.body().data.uq

  const history = await Database
  .from('machine_histories')
  .where('machine_histories.machine_id', machine_id)
  .where('machine_histories.uq', uq)
  .whereNotNull("end_time")
  .orderBy('machine_histories.id', 'desc');


    return response.ok(history);
}

public async  getMachineLogs({request,response}){
 let machine_id= request.body().data.machine_id
//  const logs = await Database
//  .from('machine_logs')
//  .select(
//    'machine_logs.*',
//    'employees.name as employee_name',
//    'products.name as product_name',
//    'oees.quality as quality',
//    'oees.performance as performance',
//    'oees.availability as availability',
//    'oees.oee as oee'
//  )
//  .leftJoin('employees', 'machine_logs.emp_id', 'employees.id')
//  .leftJoin('products', 'machine_logs.product_id', 'products.id')
//  .leftJoin('oees', function () {
//    this.on('machine_logs.machine_id', '=', 'oees.machine_id')
//        .andOn('machine_logs.uq', '=', 'oees.uq')
//  })
//  .where('machine_logs.machine_id', machine_id)
//  .whereNotNull("end_time")
//  .orderBy('machine_logs.id', 'desc');

const logs = await Database
  .from('machine_logs')
  .where('machine_logs.machine_id', machine_id)
  .where('is_delete', 0)
  .whereNotNull("end_time")
  .orderBy('machine_logs.id', 'desc');

let new_logs:any[] = [];

for (const element of logs) {
  const history = await Database
    .from('machine_histories')
    .where('machine_histories.machine_id', element.machine_id)
    .where('machine_histories.uq', element.uq)

  element['history'] = history;
  new_logs.push(element);
}

return new_logs;

  return response.ok(new_logs);
}


public async  markDownTimeHistoryReason(ctx){
 const {request}=ctx;
  let  data={
    id:request.body().data.id || '',
    operation : request.body().data.operation ,
    op_id : request.body().data.op_id,
    op_name : request.body().data.op_name,
    op_desc : request.body().data.op_desc,
    message : request.body().data.message,
    reason : request.body().data.reason,
    type : request.body().data.type,
    action :request.body().data.action

  }

    const { id,...newdata } = data;
    const mLog = await MachineHistory.query()
  .where('id', id)
  .first();

if (mLog) {

  mLog.merge(newdata)
  await mLog.save()

}

let liveData=await this.getLiveMachineData(request)

return liveData;
}

public async  MACHINE_LOG_DATAFEED(ctx){


  let request=ctx.request;
  let  data={
    id:request.body().data.id || '',
    actual_count:request.body().data.actual_count || 0,
    rejected_count:request.body().data.rejected_count || 0,
    pieces_per_stroke:request.body().data.pieces_per_stroke || 0,
    emp_remarks:request.body().data.emp_remarks || 0,

    quality:request.body().data.quality || 0,
    performance:request.body().data.performance || 0,
    availability:request.body().data.availability || 0,
    oee:request.body().data.oee || 0,



  }
  const {id,...other}=data;
    const mLog = await MachineLog.query()
  .where('id', id)
   .first();

if (mLog) {

  mLog.merge(other)
  await mLog.save()

}
return ctx.response.send({
  status:"success"
});
}
public async  MACHINE_LOG_UPDATE({request}){

  let  data={
        uq:request.body().data.uq || '',

    machine_id:request.body().data.machine_id || 0,
    actual_count:request.body().data.actual_count || 0,
    rejected_count:request.body().data.rejected_count || 0,
    // pieces_per_min:request.body().data.pieces_per_min || 0,
    pieces_per_stroke:request.body().data.pieces_per_stroke || 0,
    emp_remarks:request.body().data.emp_remarks || 0,



  }
console.log(data)
    const { uq,machine_id,...newdata } = data;
    const mLog = await MachineLog.query()
  .where('machine_id', machine_id)
  .where('uq', uq)
  .orderBy('id', 'desc')
  .first();

if (mLog) {

  mLog.merge(newdata)
  await mLog.save()
  let liveData=await this.getLiveMachineData(request)
  return liveData;

}
let liveData=await this.getLiveMachineData(request)

return liveData;

}

public async  MACHINE_WATCH(ctx)
{
  let request=ctx.request;

let machineLog=request.body().data.machineLog;

const searchPayload = {
    machine_id:machineLog.machine_id || 0,
    uq:machineLog.uq || '',
 }
  const persistancePayload ={
    operation:machineLog.operation || '',
    action:machineLog.action || '',
    start_time:machineLog.start_time || '',
    end_time:machineLog.end_time || '',
    duration:machineLog.duration || '',
    machine_id:machineLog.machine_id || 0,
    product_id:machineLog.product_id || 0,
    uq:machineLog.uq || '',
    emp_id:machineLog.emp_id || 0,

    shift:machineLog.shift || '',
    shift_start_time:machineLog.shift_start_time || '',
    shift_end_time:machineLog.shift_end_time || '',

    start_stroke:machineLog.start_stroke || 0,
    end_stroke:machineLog.end_stroke || 0,
    actual_stroke:machineLog.actual_stroke || 0,

    actual_count:machineLog.actual_count || 0,
    rejected_count:machineLog.rejected_count || 0,
    pieces_per_stroke:machineLog.pieces_per_stroke || 0,

    emp_remarks:machineLog.emp_remarks || '',
    is_delete:machineLog.is_delete || 0,


  }


await MachineLog.updateOrCreate(searchPayload, persistancePayload)


let history= ctx.request.body().data.machineHisotry||[];
history.forEach(async historyData => {

  const searchPayload = {
    machine_id:historyData.machine_id || 0,
    uq:historyData.uq || '',
    ruq:historyData.ruq || '',
 }
  const persistancePayload ={
    operation:historyData.operation || '',
    op_id:historyData.op_id || 0,
    op_name:historyData.op_name || '',
    op_desc:historyData.op_desc || '',
    op_min:historyData.op_min || 0,
    message:historyData.message || '',
    start_time:historyData.start_time ,
    end_time:historyData.end_time ,
    duration:historyData.duration || 0,
    //duration
    machine_id:historyData.machine_id || 0,
    product_id:historyData.product_id || 0,
    uq:historyData.uq || '',
    ruq:historyData.ruq || '',
    emp_id:historyData.emp_id || 0,
    shift:historyData.shift || '',
    type:historyData.type || '',
    action:historyData.action || '',
    machine_status:historyData.machine_status || '',

    start_stroke:historyData.start_stroke || 0,
    end_stroke:historyData.end_stroke || 0,
    actual_stroke:historyData.actual_stroke || 0,

    reason:historyData.reason || '',
    remarks:historyData.remarks || ''
  }


  await MachineHistory.updateOrCreate(searchPayload, persistancePayload)


});




  console.log(request.body())

}

public async  SAVE_MACHINE(ctx)
{
  let request=ctx.request;

let machineLog=request.body().data.machineLog;

const searchPayload = {
    machine_id:machineLog.machine_id || 0,
    uq:machineLog.uq || '',
 }
  const persistancePayload ={
    operation:machineLog.operation || '',
    action:machineLog.action || '',
    start_time:machineLog.start_time || '',
    end_time:machineLog.end_time || '',
    duration:machineLog.duration || '',
    machine_id:machineLog.machine_id || 0,
    product_id:machineLog.product_id || 0,
    uq:machineLog.uq || '',
    emp_id:machineLog.emp_id || 0,

    shift:machineLog.shift || '',
    shift_start_time:machineLog.shift_start_time || '',
    shift_end_time:machineLog.shift_end_time || '',

    start_stroke:machineLog.start_stroke || 0,
    end_stroke:machineLog.end_stroke || 0,
    actual_stroke:machineLog.actual_stroke || 0,

    actual_count:machineLog.actual_count || 0,
    rejected_count:machineLog.rejected_count || 0,
    pieces_per_stroke:machineLog.pieces_per_stroke || 0,

    emp_remarks:machineLog.emp_remarks || '',
    is_delete:machineLog.is_delete || 0,


  }


await MachineLog.updateOrCreate(searchPayload, persistancePayload)


let history= ctx.request.body().data.machineHisotry||[];
history.forEach(async historyData => {

  const searchPayload = {
    machine_id:historyData.machine_id || 0,
    uq:historyData.uq || '',
    ruq:historyData.ruq || '',
 }
  const persistancePayload ={
    operation:historyData.operation || '',
    op_id:historyData.op_id || 0,
    op_name:historyData.op_name || '',
    op_desc:historyData.op_desc || '',
    op_min:historyData.op_min || 0,
    message:historyData.message || '',
    start_time:historyData.start_time ,
    end_time:historyData.end_time ,
    duration:historyData.duration || 0,
    //duration
    machine_id:historyData.machine_id || 0,
    product_id:historyData.product_id || 0,
    uq:historyData.uq || '',
    ruq:historyData.ruq || '',
    emp_id:historyData.emp_id || 0,
    shift:historyData.shift || '',
    type:historyData.type || '',
    action:historyData.action || '',
    machine_status:historyData.machine_status || '',

    start_stroke:historyData.start_stroke || 0,
    end_stroke:historyData.end_stroke || 0,
    actual_stroke:historyData.actual_stroke || 0,

    reason:historyData.reason || '',
    remarks:historyData.remarks || ''
  }


  await MachineHistory.updateOrCreate(searchPayload, persistancePayload)


});


const mLog = await MachineLog.query()
.where('machine_id', machineLog.machine_id)
.where('operation', 'force')
.where('action', "stop")
.orderBy('id', 'desc')
.first();

const historyData= await MachineHistory.query()
.where('machine_id', machineLog.machine_id)
.where('uq', mLog?.uq)



return ctx.response.send({
  success:true,
  msg:'',
  data:{
    machineLog:mLog,
    history:historyData
  },
  })

}


// public async  MACHINELOG(ctx)
// {
//   let request=ctx.request;
// let  data={
//     start_time:request.body().data.time || '',
//     end_time:null,
//     //duration
//     machine_id:request.body().data.machine_id || '',
//     product_id:request.body().data.product_id || '',
//     uq:request.body().data.uq || '',
//     emp_id:request.body().data.emp_id || '',
//     shift:request.body().data.shift || '',
//     shift_start_time:request.body().data.shift_start_time || '',
//     shift_end_time:request.body().data.shift_end_time || '',
//     stroke:request.body().data.stroke || 0,
//     actual_count:request.body().data.actual_count || 0,
//     rejected_count:request.body().data.rejected_count || 0,
//     pieces_per_min:request.body().data.pieces_per_min || 0,


//   }
// let  operation=request.body().data.operation || ''
//  let action=request.body().data.action || ''

//   if(operation=='force'&&action=='stop')
// {
//   console.log(request.body())
//    this.updateOee(ctx)
// }

//     const { uq,machine_id } = request.body().data;
//     const mLog = await MachineLog.query()
//   .where('machine_id', machine_id)
//   .where('uq', uq)
//   .orderBy('id', 'desc')
//   .first();

// if (mLog) {

//   let eTime=request.body().data.time;
//     // Convert the datetime strings into JavaScript Date objects
//     const startTime = new Date(mLog.start_time);
//     const endTime = new Date(eTime);
//     // Calculate the duration between start_time and end_time
//     const durationInMilliseconds = endTime.getTime() - startTime.getTime();
//     const durationInSeconds = Math.floor((durationInMilliseconds) / 1000);

//     mLog.merge({end_time:eTime,duration:durationInSeconds})
//   await mLog.save()



//   let history=await this.MACHINE_HISTORY(request,eTime)

//   let rtdata= await this.getLiveMachineData(request)
//   return rtdata;
//   // return history;
// } else {
// await MachineLog.create(data)
// let history=await  this.MACHINE_HISTORY(request,null)
// // console.log(history);
// // return   ctx.response.status(200).json(history)

// }
// let rtdata= await this.getLiveMachineData(request)
// return rtdata;
//   }





  public async CLOSE_SHIFT(ctx:HttpContextContract)
  {
  var data=ctx.request.input('data')
  var machine_id=data.machine_id;
  var machine_client_id=data.machine_client_id;
  var end_time=data.end_time;
  var  MACHINE_RUNNED_MAIN=data.MACHINE_RUNNED_MAIN,
  var  MACHINE_RUNNED_PART_NO=data.MACHINE_RUNNED_PART_NO

async function load(){
  for(var i=0;i<MACHINE_RUNNED_MAIN.length;i++){
    const { id }: { id: Number } =MACHINE_RUNNED_MAIN[i]
    const machineMain: any = await MachineActivityMain.find(id)
    if (machineMain) {
      machineMain.is_closed = true
      await machineMain.save()
      await Promise.resolve(i);
    }


  }




  for(var i=0;i<MACHINE_RUNNED_PART_NO.length;i++){
    const { id,
      total_count,
      good_count,
      reject_count }: { id: Number,
        total_count:Number,
        good_count:Number,
        reject_count:Number  } =MACHINE_RUNNED_PART_NO[i]
    const machinePartNo: any = await MachineActivityPartNo.find(id)
    if (machinePartNo) {
      machinePartNo.total_count = total_count
      machinePartNo.good_count = good_count
      machinePartNo.reject_count = reject_count
      machinePartNo.ideal_cycle = ideal_cycle
      await machinePartNo.save()
       await Promise.resolve(i);
    }

  }
}

var loaded=await load()
return {
  success:true,
  msg:'',
  data:loaded
}



  }
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
 .select("machine_activity_part_nos.*","products.name as product_name","products.part_no as part_no")
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

    var shift_id=data.shift_id;
    var emp_id=data.emp_id;
    var machine_client_id=data.machine_client_id
    var machine_id=data.machine_id
    var machine_date=data.machine_date
    var machine_time=data.machine_time
    var machine_date_time=data.machine_date_time

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

shift_id,
emp_id,
machine_client_id,
machine_id,
machine_date,
machine_time,
machine_date_time


})

return result

}

  }

  public async FN_INSERT_MACHINE_MAIN(data)
  {


    var shift_id=data.shift_id;
    var machine_id=data.machine_id;
    var emp_id=data.emp_id;
    var machine_client_id=data.machine_client_id
    var machine_date=data.machine_date
    var machine_time=data.machine_time
    var is_closed=data.is_closed;
    var machine_date_time=data.machine_date_time

   var check= await this.IS_FOUND_MACHINE_MAIN_STAUTS({machine_client_id,machine_id})

   console.log("machine status",check)
    if(!check){
    var result=await MachineActivityMain.create({

shift_id,
machine_id,
emp_id,
machine_client_id,
machine_date,
machine_time,
machine_date_time,
is_closed
})
return result
    }
  }
  public async FN_INSERT_MACHINE_ACTIVITY(data)
  {


    var shift_id=data.shift_id
    var shift_name=data.shift_name
    var machine_id=data.machine_id
    var machine_name=data.machine_name
    var machine_client_id=data.machine_client_id
    var machine_date=data.machine_date
    var machine_time=data.machine_time

    var break_type=data.break_type
    var break_reason=data.break_reason
    var product_id=data.product_id
    var product_name=data.product_name
    var emp_id=data.emp_id
    var emp_name=data.emp_name
    var stroke=data.stroke
    var machine_active_status=data.machine_active_status;
    var machine_date_time=data.machine_date_time


  var result=await MachineActivity.create({

      shift_id,
      shift_name,
      machine_id,
      machine_name,
      machine_active_status,
      machine_client_id,
      machine_date,
      machine_time,
      machine_date_time,
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




  var shift_id=data.shift_id
  var shift_name=data.shift_name
  var machine_id=data.machine_id
  var machine_name=data.machine_name
  var machine_client_id=data.machine_client_id
  var machine_date=data.machine_date
  var machine_time=data.machine_time
  var machine_date_time=data.machine_date_time

  var machine_active_status=data.machine_active_status

  var break_type=data.break_type
  var break_reason=data.break_reason
  var product_id=data.product_id
  var product_name=data.product_name
  var emp_id=data.emp_id
  var emp_name=data.emp_name
  var stroke=data.stroke

var id=await MachineActivity.create({

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
    stroke,
    machine_date_time
 })

 ctx.response.send({success:true,data:id})
// }
// ctx.response.send({success:false,data:'',error:validation.console.errors()

// })

}



}
