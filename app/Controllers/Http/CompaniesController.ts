 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Hash from '@ioc:Adonis/Core/Hash'
 import _ from 'lodash'
import Company from 'App/Models/Company';
export default class CompaniesController {

  public async isCompanyFound(data){
    var email=data.email;
    var phone=data.phone;

    var isFound=await Company.query().where('email',email).orWhere('phone',phone)
    if(_.isEmpty(isFound)){
    return false;
    }
    return true;
  }
  public async SIGNUP_COMPANY(ctx:HttpContextContract){
    var data=ctx.request.input('data')
    console.log(data)
    var name=data.name;
    var dialcode=data.dialcode;
    var phone=data.phone;
    var email=data.email;
    var password=data.password;
    var company_name=data.company_name;
    var active=data.active;
    var active_status=data.active_status;
    const hashedPassword = await Hash.make(password)
    if(!await this.isCompanyFound({phone,email})){
var result=await   Company.create({
name,
dialcode,
phone,
email,
password:hashedPassword,
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
      msg:'Looks Already Exist Email and Phone',
      data:''
    })
    }



    public async SIGNIN_COMPANY(ctx:HttpContextContract){
      var data=ctx.request.input('data')
      var username=data.username;//email or password
      var password=data.password;


      var login=await Company.query().where('email',username).orWhere('phone',username).first();

if(!_.isEmpty(login)){

  if (await Hash.verify(login.password, password)) {
    return ctx.response.send({
      success:true,
      msg:'Logged Successfully',
      data:_.omit(login,'password')
    })
      }

      }
      return ctx.response.send({
        success:false,
        msg:'Login Failed',
        data:''
      })

  }


}




