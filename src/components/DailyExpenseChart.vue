<template>
  <div class="chart">
    <h4 class="title">Past <va-select style="max-width: 75px;" v-model="transToShow" :options="options" @input="changeTrans()"/> Daily Expenses</h4>
    <br>
    <line-chart :colors="['cornflowerblue']" empty="Start adding expenses to view data now!" loading="Loading your expenses" id="linechart" class = "user" width = 100% ytitle="Expenditure($)" :data = "chartData"></line-chart>
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
        chartData:[],
        transToShow: 5,
        options: [5,10,20],
    }
  },
  methods: {
    changeTrans() {
      this.chartData = this.updatedData(this.user);
    },
    async updatedData(currUser) {
          var docs = null;
          
          docs = await getDocs(
          collection(db, currUser, "Transactions", "Expenses"));
          var expensesByDate = new Map();
          
          docs.forEach((doc) => {
          let docData = doc.data();
          let date = String(docData.date);
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
            var newdate = key.slice(3,5) + "/" + key.slice(0,2) + "/" + key.slice(6,10);
            expensesByDateFinal.push([newdate, value]);
          });
          expensesByDateFinal = expensesByDateFinal.slice(-this.transToShow);
          this.chartData = expensesByDateFinal;
          return expensesByDateFinal;
        }
    
  },
  mounted() {
    //this.updateUser();
    const auth = getAuth();      
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
      const userEmail = currUser.email;
      this.user = userEmail;
      this.updatedData(this.user);
      } else {
      console.log(currUser, "user not found....") }
    });
  },
  watch:{
    transToShow() {
      this.updatedData(this.user);
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

.title {
  font-size: 15px;
}

div.va-dropdown.va-select__dropdown.va-select-dropdown {
  max-width:90px !important;
  margin: auto;
  padding: 5px;
}
</style>
