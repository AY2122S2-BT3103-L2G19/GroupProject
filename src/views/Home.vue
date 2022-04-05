<template>
    <br> <br>
    <div id = "home_container">
      <div id="chart1"><IncomeExpenseChart/></div>
      <div id="chart2"><DailyExpenseChart/></div>
      <div id="article"><DailyReads/></div>
      <div id="button"><AddTransactionButton/></div>
      <div id="insightsHeader" class="title">Transaction totals for the past month</div>
      <div id="insights"><Expenses/></div>
      <div id="table1"><OwedPaymentsTable :key = "refreshComp"/></div>
    </div>
</template>

<script>
import DailyReads from '@/components/DailyReads.vue'
import AddTransactionButton from '@/components/AddTransactionButton.vue'
import IncomeExpenseChart from '@/components/IncomeExpenseChart.vue'
import DailyExpenseChart from '@/components/DailyExpenseChart.vue'
import OwedPaymentsTable from '@/components/OwedPaymentsTable.vue'
import Expenses from '@/components/Expenses.vue'
//import LogOut from '@/components/LogOut.vue'
import {getAuth, onAuthStateChanged} from "firebase/auth";



export default {
 name: "Home",
 components: {
     DailyReads,
     AddTransactionButton,
     IncomeExpenseChart,
     DailyExpenseChart,
     OwedPaymentsTable,
     Expenses,
 },
 data() {
    return {
        user:false,
        refreshComp: 0,
      }
 },

mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            console.log(user.email)
        } else {
          this.$router.push("/login")
        }
    })
},

methods: {
  change() {
    this.refreshComp += 1
  }
}
}
</script>

<style>
#article {
  background-color: burlywood;
  width:35%; 
  float:left; 
  height:300px; 
  background:gray; 
  margin-left: 10px;
  margin-bottom: 60px;
  border: solid 2px black;
  border-radius: 5px;
  padding: 10px 2px 10px 2px;
}

#button {
  background-color: burlywood;
  width:30%; 
  float:right; 
  height:220px; 
  background:none; 
  margin-right:100px;
}

#insightsHeader {
  margin-bottom: 30px;
}

#chart1 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:355px; 
  background:rgb(255, 255, 255); 
  padding: 5px 0px 15px 0px;
  border-radius: 4px;
}

#chart2 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:350px; 
  background:rgb(255, 255, 255); 
  padding: 5px 0px 20px 0px;
  border-radius: 4px;
}

#table1 {
  width:30%; 
  float:left; 
  height:350px;
  margin-top:30px;
  margin-left:10px;
}

#home_container {
  float:left;
}
</style>