<template>
  <div>
    <v-text-field v-model="employee.name" label="Name(*)"></v-text-field>
    <v-text-field v-model="employee.email" label="Email(*)"></v-text-field>
    <v-text-field
      v-model="employee.dialcode"
      label="Dialcode(*)"
    ></v-text-field>
    <v-text-field
      type="number"
      v-model="employee.phone"
      label="Phone(*)"
    ></v-text-field>
    <v-text-field
      v-model="employee.password"
      label="Password(*)"
    ></v-text-field>
    <v-select v-model="employee.role" :items="employeeRole"></v-select>
    <v-text-field v-model="employee.idcard" label="Id card"></v-text-field>
    <v-text-field v-model="employee.other" label="Other"></v-text-field>

    <small>*indicates required field</small>
    <v-btn
      color="blue darken-1"
      text
      @click="
        $store.commit('dialog', { key: 'addEmployeeDialog', value: false })
      "
    >
      Close
    </v-btn>
    <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
  </div>
</template>
<script>
function initialState() {
  return {
    employeeRole: ["TOOL-INCHARGE", "SUPERVISOR", "OPERATOR", "LOADER"],
    employee: {
      branch: "",
      name: "",
      email: "",
      password: "",
      dialcode: "91",
      phone: "",
      role: "OPERATOR",
      idcard: "",
      other: "",
      config: "{}",
    },
  };
}

export default {
  data() {
    return initialState();
  },
  methods: {
    async submit() {
      var $vm = this;
      if ($vm.employee.name == "") {
        $vm.$alert("Please Enter the Name");
        return;
      }
      if ($vm.employee.dialcode == "") {
        $vm.$alert("Please Enter the dial code");
        return;
      }
      if ($vm.employee.phone == "") {
        $vm.$alert("Please Enter the Phone");
        return;
      }
      if ($vm.employee.email == "") {
        $vm.$alert("Please Enter the Email");
        return;
      }
      if ($vm.employee.password == "") {
        $vm.$alert("Please Enter the Password");
        return;
      }

      // console.log("prepareww",$vm.employee)

      var prepare = {
        ...this.employee,
      };

      var result = await $vm.$store.dispatch("CREATE_EMPLOYEE", prepare);
      if (result.data.success) $vm.employee = initialState().employee;
      $vm.$alert(result.data.msg);
    },
  },
};
</script>
<style lang="scss"></style>
