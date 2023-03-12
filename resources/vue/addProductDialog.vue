<template>
<div>

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
<v-text-field type="number" v-model="product.production_per_stroke" label="Production Per Stroke(*)"></v-text-field>
<v-text-field v-model="product.ideal_cyle_time" label="Ideal Cylcle Time(*)"></v-text-field>
<v-text-field v-model="product.target_oee" label="Target OEE %(*)"></v-text-field>
<v-text-field v-model="product.customer_name" label="Customer Name(Optional)"></v-text-field>
<v-text-field v-model="product.vendor_name" label="Vendor Name(Optional)"></v-text-field>
<v-text-field v-model="product.other_detail" label="Other Detail(Optional)"></v-text-field>

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
  </div>
</template>
<script>
import moment  from  'moment'

function initialState(){

  return {


product:{

branch:'',
name:'',
part_no:'',
customer_name:'',
vendor_name:'',
production_per_stroke:1,
ideal_cyle_time:1,
target_oee:65,
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
if($vm.product.ideal_cyle_time=='')
{
  $vm.$alert("Please Enter the Ideal Cyle Time")
  return ;
}
if($vm.product.production_per_stroke=='')
{
  $vm.$alert("Please Enter the Production Per stroke")
  return ;
}

if($vm.product.target_oee=='')
{
  $vm.$alert("Please Enter the Target OEE")
  return ;
}

var prepare={...this.product,

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
