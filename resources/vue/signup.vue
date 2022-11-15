<template>
  <div class="bgGradient" style="position:relative">

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:10px;width:350px;background:white;text-align:center">

<h2 style="padding:10px;text-align:center">Signup</h2>
<v-text-field v-model="company.name" dense outlined label="Name(*)" ></v-text-field>
<v-text-field type="number" v-model="company.dialcode" dense outlined label="DialCode(*)" ></v-text-field>
<v-text-field type="number" v-model="company.phone" dense outlined label="Phone(*)" ></v-text-field>
<v-text-field v-model="company.email" dense outlined label="Email(*)" ></v-text-field>
<v-text-field  v-model="company.company_name" dense outlined label="Company Name(*)"></v-text-field>
<v-text-field type="password" v-model="company.password" dense outlined label="password(*)"></v-text-field>
<v-btn @click="submit" color="primary">
Signup
</v-btn>
<br>

<h5 @click="$router.push('company_signin')" style="margin-top:15px">I already have a account</h5>


</div>


  </div>
</template>

<script>
export default {
  data(){
    return{
company:{
name:'',
dialcode:91,
phone:'',
email:'',
company_name:'',
password:'',
}

    }
  },

methods:{
async  submit(){
var $vm=this;
if($vm.company.name==''){
$vm.$alert("Your Name is Empty,Please Fill")

  return ;
}
if($vm.company.dialcode==''){
$vm.$alert("Your DialCode is Empty,Please Fill")

  return ;
}
if($vm.company.phone==''){
$vm.$alert("Your Phone is Empty,Please Fill")

  return ;
}
if($vm.company.password==''){
$vm.$alert("Your Password is Empty,Please Fill")

  return ;
}
if($vm.company.email==''){
$vm.$alert("Your Email is Empty,Please Fill")
  return ;
}
if($vm.company.company_name==''){
$vm.$alert("Your Company Name is Empty,Please Fill")

  return ;
}

var result=await $vm.$store.dispatch('SIGNUP_COMPANY',this.company)
$vm.$alert(result.data.msg)
  }
}

}
</script>
<style lang="scss">

</style>
