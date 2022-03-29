<template>
  <table id="spendingGoalsTable">
    <tr>
      <th>S/N</th>
      <th>Category</th>
      <th>Spent ($)</th>
      <th>Goal (Monthly) ($)</th>
      <th>Remaining Budget ($)</th>
      <th>Percentage spent(%)</th>
      <th>Delete</th>
    </tr>
  </table>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "SpendingGoals2",
  components: {},

  data() {
    return {
      fbuser: "",
      modelStatus: false,
    };
  },

  mounted() {
    const auth = getAuth();
    console.log(auth, "  auth from display");
    // this.fbuser = auth.currentUser.email;
    // console.log(this.fbuser, "  from display");
    this.display("meow@poop.com");
  },

  methods: {
    async display(user) {
      let doc = await getDocs(
        collection(db, String(user), "Spending Goals", "Goals")
      );
      let ind = 1;
      doc.forEach((docs) => {
        let docData = docs.data();
        var table = document.getElementById("spendingGoalsTable");
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

        cell1.innerHTML = ind;
        cell2.innerHTML = Category;
        cell3.innerHTML = 0;
        cell4.innerHTML = goal;
        cell5.innerHTML = 0;
        cell6.innerHTML = 0;

        // getExpense(Category, user).then((x) => {
        //   console.log(x);
        // });

        this.getExpense(Category, user).then((x) => {
          cell3.innerHTML = x;
          cell5.innerHTML = goal - x;
          cell6.innerHTML = parseFloat((x / goal) * 100).toFixed(2);
          console.log(x, " x");
        });

        var delBut = document.createElement("button");
        delBut.className = "bwt";
        delBut.id = String(Category);
        delBut.innerHTML = "Delete";
        delBut.onclick = () => {
          this.deleteInstrument(Category, user);
        };
        cell7.appendChild(delBut);
        ind += 1;
      });
    },

    async deleteInstrument(category, user) {
      alert("You are going to delete " + category);
      await deleteDoc(
        doc(db, String(user), "Spending Goals", "Goals", category)
      );
      let tb = document.getElementById("spendingGoalsTable");
      //delete everything, make data empty and call the display again
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      this.display(user);
    },

    modelToggle() {
      this.modelStatus = !this.modelStatus;
    },

    async getExpense(category, user) {
      var expenses = [];
      var expenseDocs = null;
      expenseDocs = await getDocs(
        collection(db, user, "Transactions", "Expenses")
      );
      var currentMonth = new Date().getMonth() + 1;
      //extract expenses
      expenseDocs.forEach((doc) => {
        let docData = doc.data();
        let transDetails = [];
        if (
          docData.Category == category &&
          parseInt(docData.Date.slice(3, 5)) == currentMonth
        ) {
          transDetails.push(docData.Category);
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          expenses.push(transDetails);
        }
      });

      var Spent = 0;
      for (let i = 0; i < expenses.length; i++) {
        Spent = Spent + expenses[i][2];
      }
      return Spent;
    },
  },
};
</script>

<style></style>
