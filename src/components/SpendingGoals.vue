<template>
  <div id="app">
    <v-grid
      theme="compact"
      :resize="true"
      :source="rows"
      :row-headers="rowHeaders"
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
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { collection, getDocs } from "firebase/firestore";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "SpendingGoals",
  data() {
    return {
      rowHeaders: {
        size: 100,
        columnTemplate: () => "S/n",
        cellTemplate: (createElement, props) => {
          return createElement(
            "p",
            {
              style: {
                color: "red",
              },
            },
            "Row " + props.rowIndex
          );
        },
      },
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
          readonly: true,
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
          readonly: true,
        },
        {
          prop: "RemainingBudget",
          name: "Remaining Budget ($)",
          columnType: "numeric",
          size: 200,
          readonly: true,
        },
        {
          prop: "Progress",
          name: "Progress",
          columnType: "numeric",
          size: 150,
          readonly: true,
        },
        {
          prop: "Delete",
          name: "Delete",
          size: 150,
          readonly: true,
          cellTemplate: (h) => {
            // (h, props)
            return h(
              "button",
              {
                style: { color: "red" },
                // onClick: () => doDelete(props.rowIndex)
              },
              "delete"
            );
          },
        },
        // {
        //   prop: "Date",
        //   name: "Date",
        //   columnType: "date",
        //   size: 150,
        // },
      ],
      rows: [],
      // [
      //   {
      //     Category: "Food & Drinks",
      //     Spent: 5,
      //     GoalM: 20000,
      //     Percentage: 0.0025,
      //     RemainingBudget: 1995,
      //   },
      //   {
      //     Category: "Transport",
      //     Spent: 0,
      //     GoalM: 300,
      //     Percentage: 0,
      //     RemainingBudget: 300,
      //   },
      // ],
      columnTypes: {
        date: new Plugin(),
        select: new SelectTypePlugin(),
        numeric: new NumberColumnType(),
      },
    };
  },
  mounted() {
    this.display("user1");
  },

  methods: {
    // const auth = getAuth();
    // this.fbuser = auth.currentUser.email;
    async display(user) {
      console.log("Hello from display");
      user = "user1";
      console.log(user, " user");
      let doc = await getDocs(
        collection(db, String(user), "Spending Goals", "Goals")
      );

      var result = [];
      var obj = {};
      obj["Category"] = "";
        obj["Spent"] = 0;
        obj["GoalM"] = 0;
        obj["Percentage"] = 0;
        obj["RemainingBudget"] = 300;
      result.push(obj);

      doc.forEach((docs) => {
        obj = {};
        let docData = docs.data();
        console.log(docData, " doc data");
        obj = {};
        obj["Category"] = docData.Category;
        obj["Spent"] = 0;
        obj["GoalM"] = docData.Goals;
        obj["Percentage"] = 0;
        obj["RemainingBudget"] = 300;
        result.push(obj);
      });
      console.log(result, " result");
      console.log(this.rows, " this.rows");
      this.rows = result;
      console.log(this.rows, " updated this.rows")

      return result;
    },
  },

  components: {
    VGrid,
  },
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
