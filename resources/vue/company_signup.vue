<template>
  <section>
  <div class="box">
    
    <div class="square" style="--i:0;"></div>
    <div class="square" style="--i:1;"></div>
    <div class="square" style="--i:2;"></div>
    <div class="square" style="--i:3;"></div>
    <div class="square" style="--i:4;"></div>
    <div class="square" style="--i:5;"></div>
    
   <div class="container"> 
    <div class="form"> 
<h2 style="padding:10px;text-align:center">Signup</h2>
<v-form @submit.prevent="submitForm" ref="form">
    <v-text-field
      v-model="company.company_name"
      :rules="nameRules"
      dense outlined
      label="Company Name(*)"
    ></v-text-field>

    <v-text-field
      type="number"
      v-model="company.phone"
      :rules="phoneRules"
      dense outlined
      label="Phone(*)"
    ></v-text-field>

    <v-text-field
      v-model="company.email"
      :rules="emailRules"
      dense outlined
      label="Email(*)"
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="company.password"
      :rules="passwordRules"
      dense outlined
      label="Password(*)"
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="company.confirm_password"
      :rules="confirmPasswordRules"
      dense outlined
      label="Confirm Password(*)"
    ></v-text-field>

    <v-btn type="submit">Submit</v-btn>
  </v-form>
  <!-- <v-btn @click="submit" color="primary">Signup</v-btn> -->
<br>

<h5 @click="$router.push('company_signin')" style="margin-top:15px;cursor:pointer">I already have a account</h5>
  </div>
  </div>
  </div>
</section>
</template>

<script>
export default {
  data(){
    return {
      company: {
        company_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
      },
    };
  },
methods:{
async submitForm() {
  var $vm=this;    
  if (this.$refs.form.validate()) {
        // Form is valid, submit the data
        var result=await $vm.$store.dispatch('SIGNUP_COMPANY',this.company)
      if(result.data.success)
      {
        $vm.$router.push({name:"company_signin"})
      }
          $vm.$alert(result.data.msg)

      } else {
        // Form is invalid
        $vm.$alert('Form is invalid. Please correct the errors.');
      }
    },

},
computed: {
    nameRules() {
      return [
        v => !!v || 'Company Name is required',
        v => (v && v.length <= 50) || 'Company Name must be less than 50 characters',
      ];
    },
    phoneRules() {
      return [
        v => !!v || 'Phone is required',
        v => (v && /^\d{10}$/.test(v)) || 'Phone must be a valid 10-digit number',
      ];
    },
    emailRules() {
      return [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ];
    },
    passwordRules() {
      return [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ];
    },
    confirmPasswordRules() {
      return [
        v => !!v || 'Confirm Password is required',
        v => v === this.company.password || 'Passwords do not match',
      ];
    },
  },

}
</script>
<style lang="scss">
@import url("../css/login.css");

</style>
