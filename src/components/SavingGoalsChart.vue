<template>
  <div class="chart">
    <h4 class="title">Charts</h4>
    <column-chart :data="chartParams" :stacked="true"></column-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "SavingGoalsChart",
  data() {
    return {
      chartParams: {},
    };
  },
  methods: {
   async display(user) {
     console.log(user, " user")
      let doc = await getDocs(
        collection(db, String(user), "Saving Goals", "Goals")
      );
      doc.forEach((docs) => {
        let docData = docs.data();
        var Category = docData.Category;
        var goal = docData.Goals;
        var startDate = docData.StartDate;
        var SDday = parseInt(startDate.slice(0, 2));
        var SDmonth = parseInt(startDate.slice(3, 5));
        var SDyear = parseInt(startDate.slice(6, 10));

        console.log(Category, " Category")

        this.getSavedAmount(user, SDday, SDmonth, SDyear).then((x) => {
          var distance = goal - x;
          var output = 0
          if (distance >= 0) {
            output = distance
            console.log(output, " output")
          } else {
            output = 0
          }
        });
      })
      this.chartParams = [
        {
      name: "Amount saved", 
      data: [
            ["2010", 10],
            ["2020", 30],
            ["2030", 40],
          ],
      },
      {
      name: "Target ($)", 
      data: [
            ["2010", 30],
            ["2020", 30],
            ["2030", 20],
          ],
      },
      ]
      console.log("Hellp");
  },
    async getSavedAmount(currUser, SDday, SDmonth, SDyear) {
      var incomes = [];
      var expenses = [];
      var expenseDocs = null;
      var incomeDocs = null;
      expenseDocs = await getDocs(
        collection(db, currUser, "Transactions", "Expenses")
      );
      //extract expenses
      expenseDocs.forEach((doc) => {
        let docData = doc.data();
        let transDetails = [];
        var Edate = docData.Date;
        var EDay = parseInt(Edate.slice(0, 2));
        var EMonth = parseInt(Edate.slice(3, 5));
        var EYear = parseInt(Edate.slice(6, 10));

        if (EYear > SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          expenses.push(transDetails);
        } else if (EMonth > SDmonth && EYear == SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          expenses.push(transDetails);
        } else if (EMonth == SDmonth && EDay >= SDday && EYear == SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          expenses.push(transDetails);
        }
      });
      var expensesByMonth = new Map();
      for (let i = 0; i < expenses.length; i++) {
        let month = expenses[i][0].slice(3, 5);
        if (expensesByMonth.has(month)) {
          let currAmt = expensesByMonth.get(month);
          expensesByMonth.set(month, currAmt + expenses[i][1]);
        } else {
          expensesByMonth.set(month, expenses[i][1]);
        }
      }

      var expensesByMonthFinal = [];

      expensesByMonth.forEach((value, key) => {
        expensesByMonthFinal.push([key, value]);
      });

      var expensesByMonthSorted = expensesByMonthFinal.sort();

      var totalSpent = 0;
      for (let i = 0; i < expensesByMonthSorted.length; i++) {
        totalSpent = totalSpent + expensesByMonthSorted[i][1];
      }

      //extract incomes
      incomeDocs = await getDocs(
        collection(db, currUser, "Transactions", "Income")
      );
      incomeDocs.forEach((doc) => {
        let docData = doc.data();
        let transDetails = [];
        var Edate = docData.Date;
        var EDay = parseInt(Edate.slice(0, 2));
        var EMonth = parseInt(Edate.slice(3, 5));
        var EYear = parseInt(Edate.slice(6, 10));
        if (EYear > SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          incomes.push(transDetails);
        } else if (EMonth > SDmonth && EYear == SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          incomes.push(transDetails);
        } else if (EMonth == SDmonth && EDay >= SDday && EYear == SDyear) {
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          incomes.push(transDetails);
        }
      });

      var incomesByMonth = new Map();
      for (let i = 0; i < incomes.length; i++) {
        let month = incomes[i][0].slice(3, 5);
        if (incomesByMonth.has(month)) {
          let currAmt = expensesByMonth.get(month);
          incomesByMonth.set(month, currAmt + incomes[i][1]);
        } else {
          incomesByMonth.set(month, incomes[i][1]);
        }
      }

      var incomesByMonthFinal = [];
      incomesByMonth.forEach((value, key) => {
        incomesByMonthFinal.push([key, value]);
      });

      var incomesByMonthSorted = incomesByMonthFinal.sort();
      var totalIncome = 0;

      for (let i = 0; i < incomesByMonthSorted.length; i++) {
        totalIncome = totalIncome + incomesByMonthSorted[i][1];
      }

      return totalIncome - totalSpent;
    },

  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        this.display(userEmail);
      } else {
        console.log("no user found");
      }
    });
  },
};
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid grey;
}
</style>
