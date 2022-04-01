<template>
  <table id="savingGoalsTable">
    <tr>
      <th>S/N</th>
      <th>Category</th>
      <th>Start Date</th>
      <th>Saved ($)</th>
      <th>Goal ($)</th>
      <th>$$ more ($)</th>
      <th>Completion (%)</th>
      <th>Delete</th>
    </tr>
  </table>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "SavingGoals",
  components: {},

  data() {
    return {
      fbuser: "",
      modelStatus: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        console.log(currUser.email, " is current user id");
        const userEmail = currUser.email;
        this.user = userEmail;
        this.display(this.user);
      } else {
        console.log(currUser, "user not found....");
      }
    });
  },

  methods: {
    async display(user) {
      let doc = await getDocs(
        collection(db, String(user), "Saving Goals", "Goals")
      );
      let ind = 1;
      doc.forEach((docs) => {
        let docData = docs.data();
        var table = document.getElementById("savingGoalsTable");
        var row = table.insertRow(ind);
        var Category = docData.Category;
        var goal = docData.Goals;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerHTML = ind;
        cell2.innerHTML = Category;
        cell3.innerHTML = docData.StartDate;
        cell4.innerHTML = 0;
        cell5.innerHTML = goal;
        cell6.innerHTML = 0;
        cell7.innerHTML = 0;

        var startDate = docData.StartDate;
        var SDday = parseInt(startDate.slice(0, 2));
        var SDmonth = parseInt(startDate.slice(3, 5));
        var SDyear = parseInt(startDate.slice(6, 10));

        console.log(Category, " Category")

        this.getSavedAmt(user, SDday, SDmonth, SDyear).then((x) => {
          cell4.innerHTML = x;
          var distance = goal - x;
          if (distance >= 0) {
            cell6.innerHTML = distance;
            cell7.innerHTML = parseFloat((x / goal) * 100).toFixed(2);
          } else {
            cell6.innerHTML = 0;
            cell7.innerHTML = parseFloat(100).toFixed(2);
          }
        });

        var delBut = document.createElement("button");
        delBut.className = "bwt";
        delBut.id = String(Category);
        delBut.innerHTML = "Delete";
        delBut.onclick = () => {
          this.deleteInstrument(Category, user);
        };
        cell8.appendChild(delBut);
        ind += 1;
      });
    },

    async deleteInstrument(category, user) {
      alert("You are going to delete " + category);
      await deleteDoc(doc(db, String(user), "Saving Goals", "Goals", category));
      let tb = document.getElementById("spendingGoalsTable");
      //delete everything, make data empty and call the display again
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      window.location.reload();
      this.display(user);
    },

    modelToggle() {
      this.modelStatus = !this.modelStatus;
    },

    async getSavedAmt(currUser, SDday, SDmonth, SDyear) {
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
      console.log(totalSpent, " total spent")

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
};
</script>

<style></style>
