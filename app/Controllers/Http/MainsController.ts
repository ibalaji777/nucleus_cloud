import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Branch from 'App/Models/Branch'
import Break from 'App/Models/Break';
import Company from 'App/Models/Company';
import Downtime from 'App/Models/Downtime';
import Employee from 'App/Models/Employee';
import Emprole from 'App/Models/Emprole';
import Group from 'App/Models/Group';
import Machine from 'App/Models/Machine';
import Product from 'App/Models/Product';
import Shift from 'App/Models/Shift';
import _ from 'lodash'
// import Mail from '@ioc:Adonis/Addons/Mail'
import Ws from 'App/Services/Ws'
import MachinePrePlanning from 'App/Models/MachinePrePlanning';
import MachineSheduler from 'App/Models/MachineSheduler';
// import { WITH_CTX } from '@vue/compiler-core';

export default class MainsController {


  public async socket_one(ctx:HttpContextContract){
console.log("socket1 trigeered")
    Ws.io.emit('socket1', { username: 'virk' })
    Ws.io.emit('machine1', { username: 'virk' })


  }

  public async isGroupFound(data){
    var name=data.name;
    var isFound=await Group.query().andWhere('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isEmpRoleFound(data){
    var name=data.name;
    var isFound=await Emprole.query().where('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }

  public async isDownTimeFound(data){
    var name=data.name;
    var isFound=await Downtime.query().where('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isBranchFound(data){
    var name=data.name;
    var isFound=await Branch.query().where('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }

  public async isCompanyFound(data){
    var email=data.email
    var isFound=await Company.query().where('email',email)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }



  public async isBreakFound(data){
    var name=data.name;
    var group=data.group

    var isFound=await Break.query().where('name',name)
    .andWhere('group',group)

    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isShiftFound(data){
    var name=data.name;
    var group=data.group

    var isFound=await Shift.query().where('name',name)
    .andWhere('group',group)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }

  public async isEmployeeFound(data){
    var phone=data.phone;
    var email=data.email
    var isFound=await Employee.query().where('phone',phone)
    .orWhere('email',email)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }

  public async isProductFound(data){
    var part_no=data.part_no;


    var isFound=await Product.query().where('part_no',part_no);
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }
  public async isMachinFound(data){

    var name=data.name;
    var username=data.username;
    var isFound=await Machine.query().where('name',name)
    .andWhere('username',username)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }
  public async isSheduleFound(data){

    var name=data.name;
    var branch=data.branch;
    var isFound=await MachineSheduler.query().where('name',name)
    .andWhere('branch',branch);
    if(_.isEmpty(isFound)){
    return true;
    }
    return false;
  }


  public async CREATE_SHEDULE(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var name=data.name;
    var description=data.description;
    var group=data.group;//works condition
    var minutes=data.minutes;//works condition

    var result=await   MachineSheduler.create({
      name,
      description,
      group,
      minutes
    })

    if(result.$isPersisted)
    return ctx.response.send({
      success:true,
      msg:'Created Successfully',
      data:result
    })

    return ctx.response.send({
      success:false,
      msg:'Something Wrong',
      data:''
    })
    }

  public async CREATE_BREAK(ctx:HttpContextContract){
    var data=ctx.request.input('data')

    var name=data.name;
    var description=data.description;
    var start_time=data.start_time;
    var end_time=data.end_time;
    var group=data.group;
    var branch=data.branch;
    if(!await this.isBreakFound({name,group})){
    var result=await   Break.create({

      name,
      group,
      description,
      start_time,
      end_time,
      branch
    })

    if(result.$isPersisted)
    return ctx.response.send({
      success:true,
      msg:'Created Successfully',
      data:result
    })
    }
    return ctx.response.send({
      success:false,
      msg:'Already exist',
      data:''
    })
    }

  public async CREATE_SHIFT(ctx:HttpContextContract){
    var data=ctx.request.input('data')

    var name=data.name;
    var start_time=data.start_time;
    var end_time=data.end_time;
    var group=data.group;
    var branch=data.branch;
    if(!await this.isShiftFound({name,group})){
    var result=await   Shift.create({

      name,
      group,
      start_time,
      end_time,
      branch
    })

    if(result.$isPersisted)
    return ctx.response.send({
      success:true,
      msg:'Created Successfully',
      data:result
    })
    }
    return ctx.response.send({
      success:false,
      msg:'Already exist',
      data:''
    })
    }


 public async CREATE_BRANCH(ctx:HttpContextContract){
var data=ctx.request.input('data')

var name=data.name;
if(!await this.isBranchFound({name})){
var result=await   Branch.create({

  name
})

if(result.$isPersisted)
return ctx.response.send({
  success:true,
  msg:'Created Successfully',
  data:result
})
}
return ctx.response.send({
  success:false,
  msg:'Already exist',
  data:''
})
}


public async CREATE_COMPANY(ctx:HttpContextContract){
  var data=ctx.request.input('data')
  var name=data.name;
  var dialcode=data.dialcode;
  var phone=data.phone;
  var email=data.email;
  var password=data.password;
  var company_name=data.company;
  var active=true;
  var active_status="";
  if(!await this.isCompanyFound({email})){
  var result=await   Company.create({
    name,
    email,
    dialcode,
    phone,
    password,
    company_name,
    active,
    active_status


  })

  if(result.$isPersisted)
  return ctx.response.send({
    success:true,
    msg:'Created Successfully',
    data:result
  })
  }
  return ctx.response.send({
    success:false,
    msg:'Already exist',
    data:''
  })
  }


  public async UPDATE_EMPLOYEE(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var id=data.id;


    var branch=data.branch;
    var name=data.name;
    var email=data.email;
    var dialcode=data.dialcode;
    var phone=data.phone;
    var password=data.password;
    var role=data.role;
    var idcard=data.idcard;
    var other=data.other;
    var config=data.config;
    const emp = await Employee.findOrFail(id)
    if(!_.isEmpty(emp)){
var result=await emp.
    merge({

      branch,
      name,
      email,
      password,
      dialcode,
      phone,
      role,
      idcard,
      other,
      config
      })
    .save()
    if(result.$isPersisted)
    return ctx.response.send({
      success:true,
      msg:'Created Successfully',
      data:result
    })

  }



    return ctx.response.send({
      success:false,
      msg:'Already exist',
      data:''
    })
      }

      public async EMPLOYEE_SIGNIN(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        var username=data.username;
        var password=data.password;

var emp=await Employee.query()
.where('email',username).andWhere("password",password)
.orWhere('phone',username).andWhere('password',password).first()
        if(!_.isEmpty(emp)){
        return ctx.response.send({
          success:true,
          msg:'Logged Successfully',
          data:emp
        })
      }

        return ctx.response.send({
          success:false,
          msg:'Failed to Login',
          data:''
        })
          }

          public async MACHINE_EMPLOYEE_SIGNIN(ctx:HttpContextContract){
            var data=ctx.request.input('data')
            var username=data.username;
            var password=data.password;

    var emp=await Employee.query()
    .where('email',username).andWhere("password",password)
    .orWhere('phone',username).andWhere('password',password).first()
   delete emp['password']
            if(!_.isEmpty(emp)){
            return ctx.response.send({
              success:true,
              msg:'Logged Successfully',
              data:emp
            })
          }

            return ctx.response.send({
              success:false,
              msg:'Failed to Login',
              data:''
            })
              }
  public async CREATE_EMPLOYEE(ctx:HttpContextContract){
    var data=ctx.request.input('data')

    var branch=data.branch;
    var name=data.name;
    var email=data.email;
    var dialcode=data.dialcode;
    var phone=data.phone;
    var password=data.password;
    var role=data.role;
    var idcard=data.idcard;
    var other=data.other;
    var config=data.config;
    if(!await this.isEmployeeFound({phone,email})){
var result=await   Employee.create({

branch,
name,
email,
password,
dialcode,
phone,
role,
idcard,
other,
config
})

    if(result.$isPersisted)
    return ctx.response.send({
      success:true,
      msg:'Created Successfully',
      data:result
    })
    }
    return ctx.response.send({
      success:false,
      msg:'Already exist',
      data:''
    })
      }

      public async CREATE_MACHINE_PLANNING(ctx:HttpContextContract){
        var data=ctx.request.input('data')

        var machine_id=data.machine_id;
        var subject=data.subject;
        var description=data.description;
    var result=await  MachinePrePlanning.create({

    machine_id,
    subject,
    description


    })

        if(result.$isPersisted)
        return ctx.response.send({
          success:true,
          msg:'Created Successfully',
          data:result
        })
        }


    public async CREATE_PRODUCT(ctx:HttpContextContract){
      var data=ctx.request.input('data')

      var branch=data.branch;
      var name=data.name;
      var part_no=data.part_no;
      var customer_name=data.customer_name;
      var vendor_name=data.vendor_name;
      var other_detail=data.other_detail;
      var ideal_cyle_time=data.ideal_cyle_time;
      var target_oee=data.target_oee;
      var production_per_stroke=data.production_per_stroke;
      if(!await this.isProductFound({part_no})){
  var result=await   Product.create({

  branch,
  name,
part_no,
customer_name,
vendor_name,
other_detail,
ideal_cyle_time,
target_oee,
production_per_stroke

  })

      if(result.$isPersisted)
      return ctx.response.send({
        success:true,
        msg:'Created Successfully',
        data:result
      })
      }
      return ctx.response.send({
        success:false,
        msg:'Already exist',
        data:''
      })
      }


      public async CREATE_MACHINE(ctx:HttpContextContract){
        var data=ctx.request.input('data')

        var branch=data.branch;
        var code=data.code;
        var name=data.name;
        var group=data.group;
        var description=data.description;
        var other=data.other;
        var username=data.username;
        var password=data.password;
    if(!await this.isMachinFound({name,username})){
    var result=await   Machine.create({

    code,
    branch,
    name,
    username,
    password,
    group,
    description,
    other
    })

        if(result.$isPersisted)
        return ctx.response.send({
          success:true,
          msg:'Created Successfully',
          data:result
        })
        }
        return ctx.response.send({
          success:false,
          msg:'Already exist',
          data:''
        })
        }


        public async CREATE_GROUP(ctx:HttpContextContract){
          var data=ctx.request.input('data')
var name=data.name;
          var description=data.description;
          if(!await this.isGroupFound({name})){
      var result=await   Group.create({

      name,
      description
      })

          if(result.$isPersisted)
          return ctx.response.send({
            success:true,
            msg:'Created Successfully',
            data:result
          })
          }
          return ctx.response.send({
            success:false,
            msg:'Already exist',
            data:''
          })
          }

          public async CREATE_EMPROLE(ctx:HttpContextContract){
            var data=ctx.request.input('data')
            var name=data.name;
            var type=data.type;
            var description=data.description;
            if(!await this.isEmpRoleFound({name})){
        var result=await   Emprole.create({

        type,
        name,
        description,
       })

            if(result.$isPersisted)
            return ctx.response.send({
              success:true,
              msg:'Created Successfully',
              data:result
            })
            }
            return ctx.response.send({
              success:false,
              msg:'Already exist',
              data:''
            })
            }


            public async CREATE_DOWNTIME(ctx:HttpContextContract){
              var data=ctx.request.input('data')
              var name=data.name;
              var description=data.description;
              var group=data.group;
              // var type=data.type;
              var branch=data.branch;
              if(!await this.isDownTimeFound({name})){
          var result=await   Downtime.create({
          name,
          description,
          group,
          branch
          // type
         })

              if(result.$isPersisted)
              return ctx.response.send({
                success:true,
                msg:'Created Successfully',
                data:result
              })
              }
              return ctx.response.send({
                success:false,
                msg:'Already exist',
                data:''
              })
              }


///select-----------------------------
public async GET_MACHINES(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Machine.query();
  return ctx.response.send(get)
}
public async GET_BRANCHES(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Branch.query();
  return ctx.response.send(get)
}
public async GET_GROUPS(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Group.query();
  return ctx.response.send(get)
}

public async GET_MACHINE_PRE_PLANNING(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var machine_id=data.machine_id;
var get=await MachinePrePlanning.query().where('machine_id',machine_id);
  return ctx.response.send(get)
}

public async GET_BREAK(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Break.query();
  return ctx.response.send(get)
}

public async GET_SHEDULE(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await MachineSheduler.query();
  return ctx.response.send(get)
}

public async GET_DOWNTIME(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Downtime.query();
  return ctx.response.send(get)
}

public async GET_SHIFT(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Shift.query();
  return ctx.response.send(get)
}
public async GET_PRODUCTS(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var get=await Product.query();
  return ctx.response.send(get)
}


public async GET_SINGLE_MACHINE(ctx:HttpContextContract){
  var data=ctx.request.input('data')
  var email=data.email;
  var code=data.code;//machine code
  var getCompany=await Company.query().where('email',email).orWhere('phone',data.phone).first();
if(!_.isEmpty(getCompany))
{
  var machine=await Machine.query().where('code',code);
  if(!_.isEmpty(machine))
{ var shifts_rt=await Shift.query().where('group',machine.group)
  var breaks_rt=await Break.query().where('group',machine.group)
  var downtime_rt=await Downtime.query().where('group',machine.group)
}
return ctx.response.send({
  machine,
  shift:shifts_rt,
  break:breaks_rt,
  downtime:downtime_rt
})
}
return ctx.response.send({
  machine:{},
  shift:[],
  break:[],
  downtime:[]

})



}



public async GET_EMPLOYEES(ctx:HttpContextContract){
var data=ctx.request.input('data')
var employee=await Employee.query();
return ctx.response.send(employee)
}


public async GET_EMPROLE(ctx:HttpContextContract){
  var data=ctx.request.input('data')
  var emprole=await Emprole.query();
  return ctx.response.send(emprole)
  }

  public async MACHINE_LOGIN(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var username=data.username;
    var password=data.password;

    var getMachine=await Machine.query().where('username',username).where('password',password).first()
     if(!_.isEmpty(getMachine)){
      var branch=getMachine?.branch;

      var groupForBreak="";
      var groupForShift="";
      var groupForDownTime="";
      var groupForSheduler="";


      var getBreaks=await Break.query().where('group',groupForBreak).andWhere('branch',branch)
      var getShift=await Shift.query().where('group',groupForShift).andWhere('branch',branch)
      var getDownTime=await Downtime.query().where('group',groupForDownTime).andWhere('branch',branch)
      var getShedule=await MachineSheduler.query().where('group',groupForSheduler).where('branch',branch)


      return ctx.response.send({
        success:true,
        msg:'Successfully Logged',
        data:{
          machine:getMachine,
          breaks:getBreaks,
          shift:getShift,
          down_time:getDownTime,
          shedule:getShedule,
        },
      })
    }
    return ctx.response.send({
      success:false,
      msg:'Machine Not Found',
      data:''
    })
    }

    public async REMOVE_BRANCH(ctx:HttpContextContract){
      var data=ctx.request.input('data')
      var id=data.id;
try {
  const result = await Branch.findOrFail(id)
  await result.delete()

  return ctx.response.send({
    success:true,
    msg:'Successfully Deleted',
    data:'',
  })
} catch (error) {
  return ctx.response.send({
    success:false,
    msg:'Failed to Delete',
    data:'',
  })
}

      }

      public async REMOVE_GROUP(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        var id=data.id;
  try {
    const result = await Branch.findOrFail(id)
    await result.delete()

    return ctx.response.send({
      success:true,
      msg:'Successfully Deleted',
      data:'',
    })
  } catch (error) {
    return ctx.response.send({
      success:false,
      msg:'Failed to Delete',
      data:'',
    })
  }

        }

      public async REMOVE_MACHINE(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        var id=data.id;
  try {
    const result = await Machine.findOrFail(id)
    await result.delete()

    return ctx.response.send({
      success:true,
      msg:'Successfully Deleted',
      data:'',
    })
  } catch (error) {
    return ctx.response.send({
      success:false,
      msg:'Failed to Delete',
      data:'',
    })
  }

        }

      public async REMOVE_PRODUCT(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        var id=data.id;
  try {
    const result = await Product.findOrFail(id)
    await result.delete()

    return ctx.response.send({
      success:true,
      msg:'Successfully Deleted',
      data:'',
    })
  } catch (error) {
    return ctx.response.send({
      success:false,
      msg:'Failed to Delete',
      data:'',
    })
  }

        }


        public async REMOVE_EMPLOYEE(ctx:HttpContextContract){
          var data=ctx.request.input('data')
          var id=data.id;
    try {
      const result = await Employee.findOrFail(id)
      await result.delete()

      return ctx.response.send({
        success:true,
        msg:'Successfully Deleted',
        data:'',
      })
    } catch (error) {
      return ctx.response.send({
        success:false,
        msg:'Failed to Delete',
        data:'',
      })
    }

          }


          public async REMOVE_DOWNTIME(ctx:HttpContextContract){
            var data=ctx.request.input('data')
            var id=data.id;
      try {
        const result = await Downtime.findOrFail(id)
        await result.delete()

        return ctx.response.send({
          success:true,
          msg:'Successfully Deleted',
          data:'',
        })
      } catch (error) {
        return ctx.response.send({
          success:false,
          msg:'Failed to Delete',
          data:'',
        })
      }

            }



            public async REMOVE_SHIFT(ctx:HttpContextContract){
              var data=ctx.request.input('data')
              var id=data.id;
        try {
          const result = await Shift.findOrFail(id)
          await result.delete()

          return ctx.response.send({
            success:true,
            msg:'Successfully Deleted',
            data:'',
          })
        } catch (error) {
          return ctx.response.send({
            success:false,
            msg:'Failed to Delete',
            data:'',
          })
        }

              }




              public async REMOVE_MACHINE_PRE_PLANNING(ctx:HttpContextContract){
                var data=ctx.request.input('data')
                var id=data.id;
          try {
            const result = await MachinePrePlanning.findOrFail(id)
            await result.delete()

            return ctx.response.send({
              success:true,
              msg:'Successfully Deleted',
              data:'',
            })
          } catch (error) {
            return ctx.response.send({
              success:false,
              msg:'Failed to Delete',
              data:'',
            })
          }

                }

              public async REMOVE_BREAK(ctx:HttpContextContract){
                var data=ctx.request.input('data')
                var id=data.id;
          try {
            const result = await Break.findOrFail(id)
            await result.delete()

            return ctx.response.send({
              success:true,
              msg:'Successfully Deleted',
              data:'',
            })
          } catch (error) {
            return ctx.response.send({
              success:false,
              msg:'Failed to Delete',
              data:'',
            })
          }

                }


}




