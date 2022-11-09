import User from "App/Models/User"
import moment from "moment";

export async function checkAdmin(ctx){
return true;
var roletype=ctx.request.headers()['usertype']
var username=ctx.request.headers()['username']
var password=ctx.request.headers()['password']

var user= await User.query().where('username',username).andWhere('password',password).first()
if(user){

  return true;

}

return false;

}


export function onlyNumbers(str) {
  return /^[0-9.,]+$/.test(str);
}

export function number(value){
if(onlyNumbers(value))  return parseFloat(value||0)
return 0;
}

export const prefixIRNum = () => {
  if(moment().format('M')>=6){

    return "FY-"+moment().add(1,"years").format('YY')+"-"+moment().format("MM")

  }
  return "FY-"+moment().format("YY")+"-"+moment().format("MM")
};
