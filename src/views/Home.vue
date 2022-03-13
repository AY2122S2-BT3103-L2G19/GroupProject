<template>
    <h1>Hello from Home</h1>
    <div id="article"><DailyReads/></div>
    <div id="button"><AddTransactionButton/></div>
    <div id="chart1"><IncomeExpenseChart/></div>
    <div id="chart2"><DailyExpenseChart/></div>
    <div id="table1"><OwedPaymentsTable/></div>
</template>

<script>
import DailyReads from '@/components/DailyReads.vue'
import AddTransactionButton from '@/components/AddTransactionButton.vue'
import IncomeExpenseChart from '@/components/IncomeExpenseChart.vue'
import DailyExpenseChart from '@/components/DailyExpenseChart.vue'
import OwedPaymentsTable from '@/components/OwedPaymentsTable.vue'


export default {
 name: 'App',
 components: {
     DailyReads,
     AddTransactionButton,
     IncomeExpenseChart,
     DailyExpenseChart,
     OwedPaymentsTable,
 },
}
</script>

<style>
#article {
  background-color: burlywood;
  width:900px; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#button {
  background-color: burlywood;
  width:450px; 
  float:left; 
  height:200px; 
  background:none; 
  margin:40px
}

#chart1 {
  background-color: burlywood;
  width:300px; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#chart2 {
  background-color: burlywood;
  width:300px; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}

#table1 {
  background-color: burlywood;
  width:700px; 
  float:left; 
  height:200px; 
  background:gray; 
  margin:10px
}
</style>