<template>
  <div id="app">
    <v-grid
      theme="compact"
      :resize= 'true'
      :source="rows"
      :columns="columns"
    ></v-grid>
  </div>
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
export default {
  name: "SpendingGoals",
  data() {
    return {
      columns: [
        {
          name: "Category",
          prop: "Category",
          columnType: 'select',
          size: 150,
        },
        {
          prop: "Spent",
          name: "Spent ($)",
          columnType: 'numeric',
          size: 150,
        },
        {
          prop: "GoalM",
          name: "Goal (Monthly) ($)",
          columnType: 'numeric',
          size: 150,
        },
        {
          prop: "Percentage",
          name: "Percentage (%)",
          columnType: 'numeric',
          size: 150,
        },
        {
          prop: "RemainingBudget",
          name: "Remaining Budget ($)",
          columnType: 'numeric',
          size: 200,
        },
        {
          prop: "Progress",
          name: "Progress",
          columnType: 'numeric',
          size: 150,
        },

      ],
      rows: [
        {
          Category: "Food",
          Spent: 5,
          GoalM: 20000,
          Percentage: 0.0025,
          RemainingBudget: 1995
        },
        {
          Category: "Transport",
          Spent: 0,
          GoalM: 300,
          Percentage: 0,
          RemainingBudget: 300
        },
      ],
  }
  },
  components: {
    VGrid
  }
}
</script>

<style>
#app {
  height: 200px;
  width: 1500px;
}
revo-grid {
  height: 100%;
}
</style>
>
