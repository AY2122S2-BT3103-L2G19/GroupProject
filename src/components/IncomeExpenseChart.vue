<template>
  <div class="chart">
    <h4 class="title">Expense vs Income for Past 3 Months</h4>
    <bar-chart class = "user" width = 100% :data = "chartParams" :colors="['red','green']"></bar-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: 'IncomeExpenseChart',
  data () {
    return {
        chartParams:{}
    }
  },
  methods: {
    async updateData(currUser) {
      var incomes = [];
      var expenses = [];
      var expenseDocs = null;
      var incomeDocs = null;
      expenseDocs = await getDocs(
        collection(db, currUser, "Transactions", "Expenses"));
      //extract expenses
      expenseDocs.forEach((doc) => {
        let docData = doc.data();
        let transDetails = [];
        transDetails.push(docData.Date);
        transDetails.push(docData.Amount);
        expenses.push(transDetails);
      });
      var expensesByMonth = new Map();
      for (let i = 0; i < expenses.length; i++) {
        let month = expenses[i][0].slice(3,5);
        if (expensesByMonth.has(month)) {
          let currAmt = expensesByMonth.get(month);
          expensesByMonth.set(month, currAmt + expenses[i][1])
        } else {
          expensesByMonth.set(month, expenses[i][1]);
        }
      }
      console.log(expensesByMonth, "expense map check");
      var expensesByMonthFinal = [];
      //convert map back to array
      expensesByMonth.forEach((value, key)=> {
        expensesByMonthFinal.push([key, value]);
      });

      
      var expensesByMonthSorted = expensesByMonthFinal.sort();
      
      for (let i = 0; i < expensesByMonthSorted.length; i++){
        let monthNum = expensesByMonthSorted[i][0];
        let month = "";
        switch (monthNum) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
      }
      expensesByMonthSorted[i][0] = month;
      }



      //extract incomes
      incomeDocs = await getDocs(
        collection(db, currUser, "Transactions", "Income"));
      incomeDocs.forEach((doc) => {
        let docData = doc.data();
        let transDetails = [];
        transDetails.push(docData.Date);
        transDetails.push(docData.Amount);
        incomes.push(transDetails);
      });
      var incomesByMonth = new Map();
      for (let i = 0; i < incomes.length; i++) {
        let month = incomes[i][0].slice(3,5);
        if (incomesByMonth.has(month)) {
          let currAmt = expensesByMonth.get(month);
          incomesByMonth.set(month, currAmt + incomes[i][1])
        } else {
          incomesByMonth.set(month, incomes[i][1]);
        }
      }
      console.log(incomesByMonth, "income map check");
      var incomesByMonthFinal = [];
      //convert map back to array
      incomesByMonth.forEach((value, key)=> {
        incomesByMonthFinal.push([key, value]);
      });

      
      var incomesByMonthSorted = incomesByMonthFinal.sort();

      for (let i = 0; i < incomesByMonthSorted.length; i++){
        let monthNum = incomesByMonthSorted[i][0];
        let month = "";
        switch (monthNum) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
      }
      incomesByMonthSorted[i][0] = month;
      }

      this.chartParams = [{
      name: "Expenses", 
      data: expensesByMonthSorted
      },
      {
      name: "Income ($)", 
      data: incomesByMonthSorted
      }
      ]
      console.log("income expense done")
    },
  },
  mounted() {  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userEmail = user.email;
        this.updateData(userEmail);
      } else {
        console.log("no user found")
        // User is signed out
        // ...
      }
    });
  }
}
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid grey
}
</style>