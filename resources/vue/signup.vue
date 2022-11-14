<template>
  <div class="bgGradient">

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:10px;width:350px;background:white;text-align:center">

<h2 style="padding:10px;text-align:center">Signup</h2>
<v-text-field v-model="compnay.name" dense outlined label="Name" ></v-text-field>
<v-text-field v-model="compnay.dialcode" dense outlined label="Dial Code" ></v-text-field>
<v-text-field v-model="compnay.phone" dense outlined label="Phone" ></v-text-field>

<v-text-field v-model="compnay.email" dense outlined label="Email" ></v-text-field>
<v-text-field v-model="compnay.company_name" dense outlined label="Password"></v-text-field>
<v-text-field v-model="compnay.password" dense outlined label="Company"></v-text-field>
<v-btn>
Signup
</v-btn>
<br>

<h5 style="margin-top:15px">I already have a account</h5>


</div>


  </div>
</template>

<script>
export default {
company:{
name:'',
dialcode:'',
phone:'',
email:'',
company_name:'',
password:'',
}
}
</script>
<style lang="scss">

</style>
