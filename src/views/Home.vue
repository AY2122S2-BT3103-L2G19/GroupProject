<template>
    <br> <br>
    <div id = "home_container">
      <div id="insightsHeader" class="title" >Transaction totals for the past month</div>
      <div id="insights"><Expenses/></div>
      <div id="button"><AddTransactionButton/></div> 
      <div id="chart1"><va-card class="ml-4"><va-card-content><IncomeExpenseChart/></va-card-content></va-card></div>
      <div id="chart2"><va-card class="mx-4"><va-card-content><DailyExpenseChart/></va-card-content></va-card></div>
      <div id="article"><va-card class="mx-4"><va-card-content><DailyReads/></va-card-content></va-card></div>   
      <div id="table1"><va-card class="mx-4"><OwedPaymentsTable :key = "refreshComp"/></va-card></div>   

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
  width:35%; 
  float:right; 
  height:600px; 
  margin-left: 10px;
  margin-bottom: 40px;
  border-radius: 5px;
  padding: 10px 2px 10px 2px;
}

#button {
  background-color: burlywood;
  width:30%; 
  float:right; 
  /* height:220px;  */
  background:none; 
  /* margin-top: 20px; */
  margin-right:75px;
  margin-bottom: 18px
}

#insightsHeader {
  font-size: 15px;
  position: relative;
  float:left; 
  width: 58%;
  margin: 30px 20px 30px 20px;
}

#insights {
  margin: 0px 20px 30px 20px;
  position: relative;
  float:left;
  width: 58%;
}

#chart1 {
  position: relative;
  background-color: burlywood;
  width:30%; 
  float:left; 
  background:rgb(255, 255, 255); 
  padding: 0px 0px 0px 0px;
  margin-right: 10px;
  /* border-right: 1px grey solid; */
}

#chart2 {
  position: relative;
  background-color: burlywood;
  width:30%; 
  float:left; 
  background:rgb(255, 255, 255); 
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
}

#table1 {
  width:60%; 
  float:left; 
  height:350px;
  margin-top:30px;
  margin-left:10px;
}

#home_container {
  float:left;
}
</style>