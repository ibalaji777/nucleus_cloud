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
import Mail from '@ioc:Adonis/Addons/Mail'
import Ws from 'App/Services/Ws'
import { WITH_CTX } from '@vue/compiler-core';

export default class MainsController {


  public async socket_one(ctx:HttpContextContract){
    Ws.io.emit('socket1', { username: 'virk' })
  }

  public async isGroupFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var isFound=await Group.query().where('company_id',company_id).andWhere('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isEmpRoleFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var isFound=await Emprole.query().where('company_id',company_id).andWhere('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }

  public async isDownTimeFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var isFound=await Downtime.query().where('company_id',company_id).andWhere('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isBranchFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var isFound=await Branch.query().where('company_id',company_id).andWhere('name',name)
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
    var company_id=data.company_id;
    var name=data.name;
    var group=data.group

    var isFound=await Break.query().where('company_id',company_id).andWhere('name',name)
    .andWhere('group',group)

    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async isShiftFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var group=data.group

    var isFound=await Shift.query().where('company_id',company_id).andWhere('name',name)
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
    var company_id=data.company_id;
    var part_no=data.part_no;
    var material_code=data.material_code;


    var isFound=await Product.query().where('company_id',company_id).andWhere('part_no',part_no)
    .orWhere('company_id',company_id).andWhere('material_code',material_code)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }
  public async isMachinFound(data){
    var company_id=data.company_id;
    var name=data.name;
    var isFound=await Machine.query().where('company_id',company_id).andWhere('name',name)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }


  public async CREATE_BREAK(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var company_id=data.company_id;
    var name=data.name;
    var description=data.description;
    var start_time=data.start_time;
    var end_time=data.end_time;
    var group=data.group;
    if(!await this.isBreakFound({company_id,name,group})){
    var result=await   Break.create({
      company_id,
      name,
      group,
      description,
      start_time,
      end_time
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
    var company_id=data.company_id;
    var name=data.name;
    var start_time=data.start_time;
    var end_time=data.end_time;
    var group=data.group;
    if(!await this.isShiftFound({company_id,name,group})){
    var result=await   Shift.create({
      company_id,
      name,
      group,
      start_time,
      end_time
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
var company_id=data.company_id;
var name=data.name;
if(!await this.isBranchFound({company_id,name})){
var result=await   Branch.create({
  company_id,
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

    var company_id=data.company_id;
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
      company_id,
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
    var company_id=data.company_id;
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
company_id,
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

    public async CREATE_PRODUCT(ctx:HttpContextContract){
      var data=ctx.request.input('data')
      var company_id=data.company_id;
      var branch=data.branch;
      var name=data.name;
      var part_no=data.part_no;
      var material_code=data.material_code;
      var customer_name=data.customer_name;
      var vendor_name=data.vendor_name;
      var other_detail=data.other_detail;
      if(!await this.isProductFound({company_id,part_no,material_code})){
  var result=await   Product.create({
  company_id,
  branch,
  name,
part_no,
material_code,
customer_name,
vendor_name,
other_detail,
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
        var company_id=data.company_id;
        var branch=data.branch;
        var code=data.code;
        var name=data.name;
        var group=data.group;
        var hours=data.hours;
        var description=data.description;
        var other=data.other;
    if(!await this.isMachinFound({company_id,name})){
    var result=await   Machine.create({
    company_id,
    code,
    branch,
    name,
    hours,
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
var company_id=data.company_id;
var name=data.name;
          var description=data.description;
          if(!await this.isGroupFound({company_id,name})){
      var result=await   Group.create({
      company_id,
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
            var company_id=data.company_id;
            var name=data.name;
            var type=data.type;
            var description=data.description;
            if(!await this.isEmpRoleFound({company_id,name})){
        var result=await   Emprole.create({
        company_id,
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
              var company_id=data.company_id;
              var name=data.name;
              var description=data.description;
              var group=data.group;
              var type=data.type;
              if(!await this.isDownTimeFound({company_id,name})){
          var result=await   Downtime.create({
          company_id,
          name,
          description,
          group,
          type
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
var company_id=data.company_id;
var get=await Machine.query().where('company_id',company_id);
  return ctx.response.send(get)
}
public async GET_BRANCHES(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Branch.query().where('company_id',company_id);
  return ctx.response.send(get)
}
public async GET_GROUPS(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Group.query().where('company_id',company_id);
  return ctx.response.send(get)
}

public async GET_BREAK(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Break.query().where('company_id',company_id);
  return ctx.response.send(get)
}

public async GET_DOWNTIME(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Downtime.query().where('company_id',company_id);
  return ctx.response.send(get)
}

public async GET_SHIFT(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Shift.query().where('company_id',company_id);
  return ctx.response.send(get)
}
public async GET_PRODUCTS(ctx:HttpContextContract)
{
var data=ctx.request.input('data')
var company_id=data.company_id;
var get=await Product.query().where('company_id',company_id);
  return ctx.response.send(get)
}


public async GET_SINGLE_MACHINE(ctx:HttpContextContract){
  var data=ctx.request.input('data')
  var email=data.email;
  var code=data.code;//machine code
  var getCompany=await Company.query().where('email',email).orWhere('phone',data.phone).first();
if(!_.isEmpty(getCompany))
{
  var company_id=getCompany?.id
  var machine=await Machine.query().where('company_id',company_id).andWhere('code',code);
  if(!_.isEmpty(machine))
{ var shifts_rt=await Shift.query().where('company_id',company_id).andWhere('group',machine.group)
  var breaks_rt=await Break.query().where('company_id',company_id).andWhere('group',machine.group)
  var downtime_rt=await Downtime.query().where('company_id',company_id).andWhere('group',machine.group)
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
var company_id=data.company_id;
var employee=await Employee.query().where('company_id',company_id);
return ctx.response.send(employee)
}


public async GET_EMPROLE(ctx:HttpContextContract){
  var data=ctx.request.input('data')
  var company_id=data.company_id;
  var emprole=await Emprole.query().where('company_id',company_id);
  return ctx.response.send(emprole)
  }

  public async MACHINE_LOGIN(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var company_username=data.company_username;
    var machine_code=data.machine_code;
    var getCompany=await Company.query().where('email',company_username).orWhere('phone',company_username).first()
    if(!_.isEmpty(getCompany)){
    var company_id=getCompany?.id
    var getMachine=await Machine.query().where('company_id',company_id).where('code',machine_code).first()
    if(!_.isEmpty(getMachine)){
      var getBreaks=await Break.query().where('company_id',company_id).andWhere('group',getMachine.group)
      var getShift=await Shift.query().where('company_id',company_id).andWhere('group',getMachine.group)
      var getDownTime=await Downtime.query().where('company_id',company_id).andWhere('group',getMachine.group)

      return ctx.response.send({
        success:true,
        msg:'Successfully Logged',
        data:{
          machine:getMachine,
          breaks:getBreaks,
          shift:getShift,
          down_time:getDownTime,
          company:{
            id:company_id,
            name:getCompany?.name,
            email:getCompany?.email
          }
        },
      })
    }
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




