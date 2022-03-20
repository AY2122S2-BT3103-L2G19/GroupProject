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
      rows: [
        // {
        //   Category: "Food & Drinks",
        //   Spent: 5,
        //   GoalM: 20000,
        //   Percentage: 0.0025,
        //   RemainingBudget: 1995,
        // },
        // {
        //   Category: "Transport",
        //   Spent: 0,
        //   GoalM: 300,
        //   Percentage: 0,
        //   RemainingBudget: 300,
        // },
      ],
      columnTypes: {
        date: new Plugin(),
        select: new SelectTypePlugin(),
        numeric: new NumberColumnType(),
      },
    };
  },
  mounted() {
    // const auth = getAuth();
    // this.fbuser = auth.currentUser.email;

    async function display(user) {
      console.log("Hello from display")
      user = "user1"
      console.log(user, " user")
      let doc = await getDocs(collection(db, String(user), "Spending Goals", "Entertainment"));
      console.log(doc, " doc")

      doc.forEach((docs) => {
        let docData = docs.data();
        console.log(docData, " doc data");
      })
      }
      // //get all the documents from the collection
      // let num = 1;
      // var totalProfit = 0;
      // //initialise index to 1 and total profits to 0

      // doc.forEach((docs) => {
      //   let docData = docs.data();
      //   console.log(docData);
      //   //get the data from each individual document
      //   var table = document.getElementById("table");
      //   //access the table created in the html
      //   var row = table.insertRow(num);
      //   //insert a row into the table

      //   var coin = docData.coin;
      //   var price = docData.buyPrice;
      //   var quantity = docData.buyQuantity;
      //   var ticker = docData.ticker;
      //   //get the values from document data

      //   var cell1 = row.insertCell(0);
      //   var cell2 = row.insertCell(1);
      //   var cell3 = row.insertCell(2);
      //   var cell4 = row.insertCell(3);
      //   var cell5 = row.insertCell(4);
      //   var cell6 = row.insertCell(5);
      //   var cell7 = row.insertCell(6);
      //   var cell8 = row.insertCell(7);
      //   //create 8 columns in the new row

      //   cell1.innerHTML = num;
      //   cell2.innerHTML = coin;
      //   cell3.innerHTML = ticker;
      //   cell4.innerHTML = price;
      //   cell5.innerHTML = quantity;
      //   cell6.innerHTML = 0;
      //   cell7.innerHTML = 0;
      //   //set the values incisde the columns to the values from earlier

      //   cell7.className = "Profits";
      //   //set the class name of cell7

      //   var delBut = document.createElement("button");
      //   //create a delete button to delete a document
      //   delBut.className = "bwt";
      //   //set the class name of the button
      //   delBut.id = String(coin);
      //   //set the id of the button to be the coin name
      //   delBut.innerHTML = "Delete";
      //   //the button will have the words delete
      //   delBut.onclick = function () {
      //     deleteInstrument(coin, String(user));
      //   };
      //   //it will carry out the deleteInstrument function
      //   cell8.appendChild(delBut);
      //   //put the button in cell8

      //   val(ticker);
        //function to get the real time prices
        // num += 1;
  
    display("user1");

    // async function deleteInstrument(coin, user) {
    //   var coinName = coin;
    //   alert("You are going to delete " + coinName);
    //   await deleteDoc(doc(db, String(user), coinName));
    //   console.log("Document successfully deleted!");
    //   let tb = document.getElementById("table");
    //   while (tb.rows.length > 1) {
    //     tb.deleteRow(1);
    //   }
    //   document.getElementById("totalProfit").innerHTML = "";
    //   display();
    // }
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
