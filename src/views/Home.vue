<template>
    <h1>Welcome back to your Dashboard</h1>
    <br> <br>
    <div id = "home_container">
      <div id="article"><DailyReads/></div>
      <div id="button"><AddTransactionButton/></div>
      <div id="chart1"><IncomeExpenseChart/></div>
      <div id="chart2"><DailyExpenseChart/></div>
      <div id="table1"><OwedPaymentsTable :key = "refreshComp"/></div>
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
        refreshComp: 0
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
  width:60%; 
  float:left; 
  height:300px; 
  background:gray; 
  margin:0px;
  border: solid 2px black;
  border-radius: 5px;
  padding: 10px 2px 10px 2px;
}

#button {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:355px; 
  background:none; 
  margin:20px
}

#chart1 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:355px; 
  background:rgb(255, 255, 255); 
  margin:10px;
  padding: 5px 0px 5px 0px;
  border: solid 2px rgb(0, 0, 0);
  border-radius: 4px;
}

#chart2 {
  background-color: burlywood;
  width:30%; 
  float:left; 
  height:350px; 
  background:rgb(255, 255, 255); 
  margin:10px;
  padding: 5px 0px 5px 0px;
  border: solid 2px rgb(0, 0, 0);
  border-radius: 4px;
}

#table1 {
  background-color: burlywood;
  width:34%; 
  float:left; 
  height:350px;
  background:burlywood;
  margin:10px
}

#home_container {
  float:left;
}
</style>