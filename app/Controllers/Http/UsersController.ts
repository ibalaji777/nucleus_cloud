// import type { HttpContextContract } from '@ioc=Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'
import Database from '@ioc:Adonis/Lucid/Database'

const user = new User()

export default class UsersController {

  // public async  creaeUser(ctx: HttpContextContract) {

  //   // return ctx
  //     }

  public async startUsersiFNotExist(ctx:HttpContextContract){


    var users=await User.query().where('roletype','admin').first()
    if(users)
return ctx.response.send(true)
return ctx.response.send(false)

  }
 public async isUserExist(username,password){

  var user= await User.query().where('username',username).andWhere('password',password).first()
if(user){
  return true
}
return false;
}

  public async checkUser(ctx:HttpContextContract){
// return 'ok'
  const {username="",password="",branch='',roletype=""}= ctx.request.all();


  // return username+password+branch+roletype
  if(username!=''&&password!=''){

var user= await Database.from('users')

.where('username',username)
.andWhere('password',password)
.andWhere('branch',branch)
.andWhere('roletype',roletype)
.first()
// return user;
if(user){
  return ctx.response.send({
    successStatus:true,
    data:user
  });
}
return ctx.response.send({
  successStatus:false,
  error:'User Not Found'
})

  }
  return ctx.response.send({
    successStatus:false,
    error:'Enter Valid Username and password'
  })

}

  public async  defaultUser(ctx: HttpContextContract) {
    var defaultValue=[
      {
        name:'User',
        branch:'',
        roletype:'admin',
        username:'admin',
        password:'admin',
        email:'',
        phone:'',
         address:'',
         status:'accepted',
        date:new Date()
      }
    ]


   await User.fetchOrCreateMany('name', defaultValue)


     return ctx.response.send({
      success:true,
      error:'',
     });

}

public async  createUser(ctx: HttpContextContract) {
const    {
      name='',
      branch='',
      roletype='',
      username='',
      password='',
      email='',
      phone='',
       address='',
       status='accepted',
      date=new Date()
    }=ctx.request.all()

    if(username==''&&password=='')
    {
      return ctx.response.send({
        successStatus:false,
        error:'Enter Username and Password',
      })
    }


    if(await this.isUserExist(username,password)){
      return ctx.response.send({
        successStatus:false,
        error:'Try Other Username',
      })
    }

var user =await User.create({
name,
branch,
roletype,
username,
password,
email,
phone,
address,
status,
date

 })

 Ws.io.emit('newUserCreated', {  })

   return ctx.response.send({
    successStatus:true,
    data:user,
    error:'',
   });

}

public async  removeUser(ctx: HttpContextContract) {
console.log("remove user")
  var id=ctx.request.input('id')
console.log("id=>",id)
if(await this.checkAdmin(ctx)){
const user = await User.findOrFail(id)
var users=await user.delete()
Ws.io.emit('userRemoved', {  })
return ctx.response.send({
  successStatus:true,
  data:users,
  error:'',

})

}
return ctx.response.send({
  successStatus:false,
  error:'Not Found',

})

}

public async checkAdmin(ctx){
return true;
  var roletype=ctx.request.headers()['usertype']
var username=ctx.request.headers()['username']
var password=ctx.request.headers()['password']

var user= await User.query().where('username',username).andWhere('password',password).first()
// roletype=='admin'&&
if(user){

  return true;

}

return false;
}

public async  getBranchUsers(ctx: HttpContextContract) {
// var branch=ctx.request.params()['branch']||''
// console.log('branch users',branch)
// console.log(ctx.request.headers())
var branch=ctx.request.headers()['branch']||''
// console.log("check branch",branch)
return ctx.response.send(await User.query().where('branch',branch)
 )

}
public async  updateUser(ctx: HttpContextContract) {

  const    {
    id='',
    name='',
    branch='',
    roletype='',
    username='',
    password='',
    email='',
    phone='',
     address='',
     status='accepted',

  }=ctx.request.all()
console.log("id+++",id)
console.log(ctx.request.all())
var user=   await User
  .query()
  .where('id', id)
  .update({
name,
branch,
roletype,
username,
password,
email,
phone,
address,
status,
   })

   return user;
}
}
