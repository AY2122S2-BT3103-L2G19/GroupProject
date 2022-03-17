<template>
  <div id="app">
    <v-grid
      theme="compact"
      :resize="true"
      :source="rows"
      :columns="columns"
      :columnTypes="columnTypes"
      @beforeCellFocus="beforeFocus"
    ></v-grid>
  </div>
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
import Plugin from "@revolist/revogrid-column-date";
import SelectTypePlugin from "@revolist/revogrid-column-select";
import NumberColumnType from "@revolist/revogrid-column-numeral"; // import library


export default {
  name: "SpendingGoals",
  data() {
    return {
      columns: [
        {
          name: "Category",
          prop: "Category",
          columnType: "select",
          labelKey: "label",
          valueKey: "value",
          source: [
            { label: "Food & Drinks", value: "Food & Drinks" },
            { label: "Transport", value: "Transport" },
            { label: "Shopping", value: "Shopping" },
            { label: "Entertainment", value: "Entertainment" },
            { label: "Groceries", value: "Groceries" },
            { label: "Others", value: "Others" },
          ],
          size: 150,
        },
        {
          prop: "Spent",
          name: "Spent ($)",
          columnType: "numeric",
          size: 150,
        },
        {
          prop: "GoalM",
          name: "Goal (Monthly) ($)",
          columnType: "numeric",
          size: 150,
        },
        {
          prop: "Percentage",
          name: "Percentage (%)",
          // columnType: "numeric",
          size: 150,
        },
        {
          prop: "RemainingBudget",
          name: "Remaining Budget ($)",
          columnType: "numeric",
          size: 200,
        },
        {
          prop: "Progress",
          name: "Progress",
          columnType: "numeric",
          size: 150,
        },
        // {
        //   prop: "Date",
        //   name: "Date",
        //   columnType: "date",
        //   size: 150,
        // },
      ],
      rows: [
        {
          Category: "Food & Drinks",
          Spent: 5,
          GoalM: 20000,
          Percentage: 0.0025,
          RemainingBudget: 1995,
        },
        {
          Category: "Transport",
          Spent: 0,
          GoalM: 300,
          Percentage: 0,
          RemainingBudget: 300,
          // Date: "2022-08-24",
        },
      ],
      columnTypes: {
        date: new Plugin(),
        select: new SelectTypePlugin(),
        numeric: new NumberColumnType(),
      },
    };
  },
  components: {
    VGrid,
  },

//   methods: {
//     // iAmClicked(e) {
//     //   Vue.set(this.model, "count", this.count + 1);
//     // },

};
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
