<template>
  <div class="chart">
    <h4 class="title">wtf</h4>
    <line-chart class = "user" width = 300px :data = "lineChartData"></line-chart>
  </div>
</template>

<script>
export default {
  name: 'DailyExpenseChart',
  data () {
    return {
        lineChartData: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2,'Thursday': 5,'Friday': 6}
    }
  }
}
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid grey
}
</style>