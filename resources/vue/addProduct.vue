<template>
<div>
<span class="text-h5">Product</span>
<v-text-field v-model="product.name" label="Name(*)"></v-text-field>
<v-text-field v-model="product.part_no" label="Part No(*)"></v-text-field>
<v-text-field v-model="product.material_code" label="Material Code"></v-text-field>
<v-text-field v-model="product.customer_name" label="customer Name"></v-text-field>
<v-text-field v-model="product.vendor_name" label="Vendor Name"></v-text-field>
<v-text-field v-model="product.other_detail" label="Other Detail"></v-text-field>

          <v-btn
            color="blue darken-1"
            text
@click="submit"
          >
            Save
          </v-btn>
  </div>
</template>
<script>
import moment  from  'moment'

function initialState(){

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

}
  }
}
export default {
data(){
  return initialState()
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
var result=await $vm.$store.dispatch('CREATE_PRODUCT',prepare)

if(result.data.success){

  $vm.product=initialState().product;
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
