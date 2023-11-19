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
                <h2 style="padding:10px;text-align:center">Login</h2>
                <v-text-field dense outlined label="PHONE/EMAIL" v-model="company.username">

                </v-text-field>

                <v-text-field type="password" dense outlined label="PASSWORD" v-model="company.password">

                </v-text-field>

                <v-btn @click="submit" color="primary">
                    Login
                </v-btn>
                <br>

                <h5 @click="$router.push('/company_signup')" style="cursor:pointer;margin-top:15px">Create New Account</h5>

            </div>

        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            company: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async submit() {
            var $vm = this;
            if ($vm.company.username == '') {
                $vm.$alert("Your Username is Empty,Please Fill")
                return;
            }
            if ($vm.company.password == '') {
                $vm.$alert("Your Password is Empty,Please Fill")
                return;
            }

            var result = await $vm.$store.dispatch('SIGNIN_COMPANY', this.company)

            if (result.data.success) {
                await $vm.$store.commit("COMPANY_LOGIN", result.data.data)
                $vm.$nextTick(() => {
                    $vm.$router.push({
                        name: 'company_dashboard'
                    })
                })
            }

            $vm.$alert(result.data.msg)
        }

    }
}
</script>

<style lang="scss">
@import url("../css/login.css");
</style>
