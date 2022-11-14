import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Branch from 'App/Models/Branch'
import Break from 'App/Models/Break';
import Company from 'App/Models/Company';
import Employee from 'App/Models/Employee';
import Emprole from 'App/Models/Emprole';
import Group from 'App/Models/Group';
import Machine from 'App/Models/Machine';
import Product from 'App/Models/Product';
import Shift from 'App/Models/Shift';
import _ from 'lodash'
export default class MainsController {

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
    var company_id=data.company_id;
    var phone=data.phone;
    var email=data.email
    var isFound=await Shift.query().where('company_id',company_id).andWhere('phone',phone)
    .orWhere('company_id',company_id).andWhere('email',email)
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

  public async CREATE_EMPLOYEE(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    var company_id=data.company_id;
    var branch=data.branch;
    var name=data.name;
    var email=data.email;
    var dialcode=data.dialcode;
    var phone=data.phone;
    var role=data.role;
    var idcard=data.idcard;
    var other=data.other;
    if(!await this.isEmployeeFound({company_id,phone,email})){
var result=await   Employee.create({
company_id,
branch,
name,
email,
dialcode,
phone,
role,
idcard,
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
      var other=data.other;
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


      public async CREATE_MACHINE(ctx:HttpContextContract){
        var data=ctx.request.input('data')
        var company_id=data.company_id;
        var branch=data.branch;
        var code=data.code;
        var name=data.name;
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
            var description=data.description;
            if(!await this.isEmpRoleFound({company_id,name})){
        var result=await   Machine.create({
        company_id,
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



    }




