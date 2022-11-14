<template>
<v-app>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.addProductsDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Product</span>
        </v-card-title>
        <v-card-text>

<v-text-field v-model="product.name" label="Name(*)"></v-text-field>
<v-text-field v-model="product.part_no" label="Part No(*)"></v-text-field>
<v-text-field v-model="product.material_code" label="Material Code"></v-text-field>
<v-text-field v-model="product.customer_name" label="customer Name"></v-text-field>
<v-text-field v-model="product.vendor_name" label="Vendor Name"></v-text-field>
<v-text-field v-model="product.other_detail" label="Other Detail"></v-text-field>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addProductsDialog',value:false})"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
@click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
</template>
<script>
import moment  from  'moment'

export default {
data(){
  return {


product:{
company_id:'',
branch:'',
name:'',
part_no:'',
material_code:'',
customer_name:'',
vendor_name:'',
other_detail:'',
other:{}//jsonb
}
  }
},
methods:{
 async submit(){
    var $vm=this;
if($vm.product.name=='')
{
  $vm.$alert("Please Enter the Name")
  return ;
}
if($vm.product.part_no=='')
{
  $vm.$alert("Please Enter the Part No")
  return ;
}
var prepare={...this.product,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_product',prepare)
 $vm.$alert(result.msg)

  }
}
}
</script>
<style lang="scss">

</style>
