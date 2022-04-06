<template>
  <div>
    <div class="expenses">
      <div class="balance">
        <span>Balance</span>
        <p>${{ allExpenses.balance }}</p>
      </div>
      <div class="income">
        <span>Income</span>
        <p>${{ allExpenses.income }}</p>
      </div>
      <div class="expense">
        <span>Expense</span>
        <p>${{ allExpenses.expense }}</p>
      </div>
      <div class="OwedPayments">
        <span>Owed Payments</span>
        <p>${{ allExpenses.owed }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "Expenses",
  data() {
    return {
      allExpenses: {
        balance: 0,
        income: 0,
        expense: 0,
        owed: 0,
      },
    }
  },
  methods: {
    async updatedData(currUser) {
        var docs = null;
          
        docs = await getDocs(
        collection(db, currUser, "Transactions", "Expenses"));
        var expensesByDate = new Map();
        docs.forEach((doc) => {
        let docData = doc.data();
        let date = docData.date.slice(3,10);
        if (expensesByDate.has(date)) {
          let currAmt = expensesByDate.get(date);
          expensesByDate.set(date, currAmt + docData.amount)
        } else {
          expensesByDate.set(date, docData.amount);
        }
        });
        var sortedExpense = [...expensesByDate.entries()].sort(function(b,a){
            if (a[0].slice(3,7) == b[0].slice(3,7)) {
              let aMonth = parseInt(a[0].slice(0,2));
              let bMonth = parseInt(b[0].slice(0,2));
              return aMonth - bMonth;
            }
            let aYear = parseInt(a[0].slice(3,7));
            let bYear = parseInt(b[0].slice(3,7));
            return aYear - bYear;
            }
          )
        var currDate = new Date();
        var currMonth = String(currDate.getMonth() + 1);
        var currYear = String(currDate.getFullYear());
        console.log(currMonth, " CURR MONTH")
        console.log(currYear, " CURR YEAR")
        console.log(sortedExpense[0][0], "yes current")
        if (currMonth.length == 1) {
          currMonth = "0" + currMonth;
        }
        var currDateCheck = currMonth + "/" + currYear;
        console.log(currDateCheck, " CURR DATE CHECK")
        if (currDateCheck == sortedExpense[0][0]) {
          this.allExpenses.expense = sortedExpense[0][1];
        }
        docs = await getDocs(
        collection(db, currUser, "Transactions", "Income"));
        var incomeByDate = new Map();
        docs.forEach((doc) => {
        let docData = doc.data();
        let date = docData.date.slice(3,10);
        if (incomeByDate.has(date)) {
          let currAmt = incomeByDate.get(date);
          incomeByDate.set(date, currAmt + docData.amount)
        } else {
          incomeByDate.set(date, docData.amount);
        }
        });
        var sortedIncome = [...incomeByDate.entries()].sort(function(b,a){
            if (a[0].slice(3,7) == b[0].slice(3,7)) {
              let aMonth = parseInt(a[0].slice(0,2));
              let bMonth = parseInt(b[0].slice(0,2));
              return aMonth - bMonth;
            }
            let aYear = parseInt(a[0].slice(3,7));
            let bYear = parseInt(b[0].slice(3,7));
            return aYear - bYear;
            }
          )
      if (currDateCheck == sortedIncome[0][0]) {
        this.allExpenses.income = sortedIncome[0][1];
      }
      console.log(currUser, 'currdate');
      this.allExpenses.balance = this.allExpenses.income - this.allExpenses.expense;

      docs = await getDocs(
        collection(db, currUser, "Transactions", "Owed Payments"));
        var owedByDate = new Map();
        docs.forEach((doc) => {
        let docData = doc.data();
        let date = docData.date.slice(3,10);
        if (owedByDate.has(date)) {
          let currAmt = owedByDate.get(date);
          owedByDate.set(date, currAmt + docData.amount)
        } else {
          owedByDate.set(date, docData.amount);
        }
        });
        var sortedOwed = [...owedByDate.entries()].sort(function(b,a){
            if (a[0].slice(3,7) == b[0].slice(3,7)) {
              let aMonth = parseInt(a[0].slice(0,2));
              let bMonth = parseInt(b[0].slice(0,2));
              return aMonth - bMonth;
            }
            let aYear = parseInt(a[0].slice(3,7));
            let bYear = parseInt(b[0].slice(3,7));
            return aYear - bYear;
            }
          )
        if (currDateCheck == sortedOwed[0][0]) {
          this.allExpenses.owed = sortedOwed[0][1];
        }
    }
  },
  mounted() {
    //this.updateUser();
    const auth = getAuth();      
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
      console.log(currUser.email, " is current user id")
      const userEmail = currUser.email;
      this.user = userEmail;
      this.updatedData(this.user);
      } else {
      console.log(currUser, "user not found....") }
    });
  },
}
</script>

<style scoped>
.expenses {
  width: 100%;
  margin: 2px;
  display: flex;
  justify-content: space-between;
}
.balance {
  background: #ffff;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 25%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 4px solid orange;
}
.balance span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: orange;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
.income {
  background: #ffff;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 25%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 4px solid #42b983;
}
.income span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #42b983;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
.expense {
  background: #ffff;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 25%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 4px solid #d4075d;
}
.expense span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #d4075d;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
.OwedPayments {
  background: #ffff;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 25%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 4px solid #329ac4;
}
.OwedPayments span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #42acc2;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
p {
  font-size: 20px;
}
.history {
  width: 800px;
  background: rgb(255, 230, 166);
  padding: 12px;
  display: flex;
  animation: animate 0.5s linear;
}
@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.history__type {
  width: 20%;
  text-align: left;
}
.history__title {
  width: 30%;
}
.history__date {
  width: 30%;
}
.history__number {
  width: 20%;
  text-align: right;
}
.border-green {
  border-left: 3px solid #42b983;
}
.border-red {
  border-left: 3px solid #d4075d;
}
</style>