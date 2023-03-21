<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in $store.state.machineData.machineHisotry"
          :key="'history' + index"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Start Time",
          value: "start_time",
        },
        {
          text: "End Time",
          value: "end_time",
        },
        {
          text: "Employee",
          value: "employee_name",
        },
        {
          text: "Product",
          value: "product_name",
        },
        {
          text: "Shift",
          value: "shift",
        },
        {
          text: "Stroke",
          value: "stroke",
        },
        {
          text: "Duration/Sec",
          value: "duration",
        },
        {
          text: "Actual Count",
          value: "actual_count",
        },
        {
          text: "Rejected Count",
          value: "rejected_count",
        },
        {
          text: "Pieces Per Minute",
          value: "pieces_per_min",
        },
        {
          text: "Quality",
          value: "quality",
        },
        {
          text: "Performance",
          value: "performance",
        },
        {
          text: "Availability",
          value: "availability",
        },
        {
          text: "OEE",
          value: "oee",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
