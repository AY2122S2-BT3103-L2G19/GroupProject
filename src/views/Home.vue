<template>
    <h1>Hello from Home</h1>
    <div id = "home_container">
      <div id="article"><DailyReads/></div>
      <div id="button"><AddTransactionButton/></div>
      <div id="chart1"><IncomeExpenseChart/></div>
      <div id="chart2"><DailyExpenseChart/></div>
      <div id="table1"><OwedPaymentsTable/></div>
    </div>
    <LogOut/>
</template>

<script>
import DailyReads from '@/components/DailyReads.vue'
import AddTransactionButton from '@/components/AddTransactionButton.vue'
import IncomeExpenseChart from '@/components/IncomeExpenseChart.vue'
import DailyExpenseChart from '@/components/DailyExpenseChart.vue'
import OwedPaymentsTable from '@/components/OwedPaymentsTable.vue'
import LogOut from '@/components/LogOut.vue'
import {getAuth, onAuthStateChanged} from "firebase/auth";



export default {
 name: 'App',
 components: {
     DailyReads,
     AddTransactionButton,
     IncomeExpenseChart,
     DailyExpenseChart,
     OwedPaymentsTable,
     LogOut,
 },
data() {
    return {
        user:false,
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
}
</script>

<style>
#article {
  background-color: burlywood;
  width:60%; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#button {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:200px; 
  background:none; 
  margin:40px
}

#chart1 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#chart2 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#table1 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#home_container {
  float:left;
}
</style>