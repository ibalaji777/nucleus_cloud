<template>
  <div>
<div style="display:flex;margin-top:20px">
<div style="width:50vw;display:flex;justify-content:center">
<div style="width:47vw;background:white">
  adsf
</div>
</div>
<div style="width:50vw;display:flex;justify-content:center">
<div style="width:47vw;background:white">
<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4>Branches</h4>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="downtimeHeader"
      :items="groupedDownTime"
      :search="search"
    ></v-data-table>
  </v-card>

</div>
</div>
</div>
</div>
  </div>
</template>
<script>
export default {

  data(){
    return {
        machineHeader:[
{ text: 'Branch', value: 'name' },
  ],

    }
  }
}
</script>
