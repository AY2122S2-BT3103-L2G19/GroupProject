<template>
  <div class="chart">
    <h4 class="title">Expense vs Income for</h4>
    <h4 class="title">Past 3 Months</h4>
    <br>
    <br>
    <bar-chart empty="Start adding expenses to view data now!" loading="Loading your expenses/income" class = "user" width = 100% :data = "chartParams" :colors="['red','green']"></bar-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { subscribe } from '../pubsub.js';

const db = getFirestore(firebaseApp);

export default {
  name: 'IncomeExpenseChart',
  data () {
    return {
        chartParams:{},
        numMonths: 3
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
        transDetails.push(docData.date);
        transDetails.push(docData.amount);
        expenses.push(transDetails);
      });
      var expensesByMonth = new Map();
      //to compare with income months later
      var expensesByMonthMap = new Map();

      for (let i = 0; i < expenses.length; i++) {
        let month = expenses[i][0].slice(3,10);
        if (expensesByMonth.has(month)) {
          let currAmt = expensesByMonth.get(month);
          expensesByMonth.set(month, currAmt + expenses[i][1])
        } else {
          expensesByMonth.set(month, expenses[i][1]);
        }
      }

      var expensesByMonthFinal = [];
      //convert map back to array
      expensesByMonth.forEach((value, key)=> {
        expensesByMonthFinal.push([key, value]);
        console.log([key, value], " Expense by month instance check");
      });

      
      var expensesByMonthSorted = expensesByMonthFinal.sort(function(a,b){
        if (a[0].slice(6,10) == b[0].slice(6,10)) {
          if (a[0].slice(3,5) == b[0].slice(3,5)) {
            let aDay = parseInt(a[0].slice(0,2));
            let bDay = parseInt(b[0].slice(0,2));
            return aDay - bDay;
          }
          let aMonth = parseInt(a[0].slice(3,5));
          let bMonth = parseInt(b[0].slice(3,5));
          return aMonth - bMonth;
        }
        let aYear = parseInt(a[0].slice(6,10));
        let bYear = parseInt(b[0].slice(6,10));
        return aYear - bYear;
      });
      expensesByMonthSorted = expensesByMonthSorted.slice(-this.numMonths);

  
      for (let i = 0; i < expensesByMonthSorted.length; i++){
        let monthNum = expensesByMonthSorted[i][0].slice(0,2);
        if (expensesByMonthMap.has(expensesByMonthSorted[i][0])) {
          console.log(expenses[i][0], "already contained");
        } else {
          expensesByMonthMap.set(expensesByMonthSorted[i][0], 1);
        }
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
        transDetails.push(docData.date);
        transDetails.push(docData.amount);
        incomes.push(transDetails);
      });
      var incomesByMonth = new Map();
      for (let i = 0; i < incomes.length; i++) {
        let month = incomes[i][0].slice(3,10);
        if (!expensesByMonthMap.has(month)) {
          continue;
        }
        if (incomesByMonth.has(month)) {
          let currAmt = incomesByMonth.get(month);
          incomesByMonth.set(month, currAmt + incomes[i][1])
        } else {
          incomesByMonth.set(month, incomes[i][1]);
        }
      }
      console.log(incomesByMonth, "income map check");
      var incomesByMonthFinal = [];
      //convert map back to array
      incomesByMonth.forEach((value, key)=> {
        //if (expensesByMonthMap.has(key)) {
          incomesByMonthFinal.push([key, value]);
          console.log([key, value], " Income by month instance check");
        //}
      });

      
      var incomesByMonthSorted = incomesByMonthFinal.slice(-this.numMonths);
      //for (var e in incomesByMonthSorted) {console.log(e, " Income by month sorted check");}
      //incomesByMonthSorted = incomesByMonthSorted.sort();
      console.log(incomesByMonthSorted, "incomes by month sorted")

      for (let i = 0; i < incomesByMonthSorted.length; i++){
        let monthNum = incomesByMonthSorted[i][0].slice(0,2);
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
      name: "Income", 
      data: incomesByMonthSorted
      }
      ]
      console.log("income expense done")
    },
    subUpdate() {
      this.updateData(this.user);
    }
  },
  mounted() {  
    subscribe("OPResolved",this.subUpdate);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userEmail = user.email;
        this.user = userEmail
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
  bar-chart{
    margin:0px;
  }
  .title {
  font-size: 15px;
}

#chart-1 {
  height: 95% !important;

}
</style>