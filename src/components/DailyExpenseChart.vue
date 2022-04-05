<template>
  <div class="chart">
    <h4 class="title">Past 5 expenses</h4>
    <line-chart :colors="['cornflowerblue']" empty="Start adding expenses to view data now!" loading="Loading your expenses" id="linechart" class = "user" width = 100% ytitle="Expenditure($)" :data = "chartParams"></line-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: 'DailyExpenseChart',
  data () {
    return {
        user: false,
        chartParams:[]
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
          let date = docData.date;
          if (expensesByDate.has(date)) {
            let currAmt = expensesByDate.get(date);
            expensesByDate.set(date, currAmt + docData.amount)
          } else {
            expensesByDate.set(date, docData.amount);
          }
          });
          
          var expensesByDateSorted = new Map([...expensesByDate.entries()].sort(function(a,b){
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
            }
          ))
          
          var expensesByDateFinal = [];
          expensesByDateSorted.forEach((value, key)=> {
            expensesByDateFinal.push([key, value]);
            //console.log([key, value], "each date?");
          });
          //console.log("daily expense done")
          expensesByDateFinal = expensesByDateFinal.slice(-5);
          this.chartParams = expensesByDateFinal;
          return expensesByDateFinal;
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
  watch:{
    chartParams() {
    },
    user() {
    }
  }
}
</script>

<style scoped>
line-chart{
  margin: 0px;
}
</style>
