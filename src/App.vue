<template>
  <va-tabs
    stateful
    left
    class="tab1"
  >
    <template #tabs>
      <va-tab id="dashboardtab">
        <router-link to="/" class="routerlink" id="initial">
        <va-icon class="material-icons">dashboard</va-icon> 
        Dashboard
        </router-link>
      </va-tab>
      <va-tab id="goalstab">
        <router-link to="/goals" class="routerlink">
        <va-icon class="material-icons">account_balance</va-icon>
          Goals
          </router-link>
      </va-tab>
      <va-tab id="expensetab">
        <router-link to="/expenses/false" class="routerlink" id="expense">
        <va-icon class="material-icons">paid</va-icon>
        Expenses
        </router-link>
      </va-tab>
    </template>
  </va-tabs>
  <div class="tab2">
    <LogOut/>
  </div>
  <router-view/>
  <br> <br>
  <br>
</template>

<script>
import LogOut from '@/components/LogOut.vue'

export default {
  name: 'App',
  components: {
     LogOut
 },
 mounted: function () {
                setTimeout(function(){ 
                    const elem = document.getElementById('initial');
                    elem.click(); 
                }, 100);
            },
  methods: {
    redirectToExpense() {
      const elem = document.getElementById('expense');
      elem.click(); 
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
.routerlink {
  font-size: 24px;
  color:rgb(0, 0, 0);
}

.routerlink:hover {
  color:rgb(244, 186, 111);
}

.tab1 {
  width:50%;
  height: 60px;
  float:left;
}
.tab2 {
  width:40%;
  height: 60px;
  float:left;
  text-align: right;
}

#dashboardtab {
  text-align: center;
  height: 40px;
  width: 200px;
  border: 2px black;
}
#goalstab {
  text-align: center;
  height: 40px;
  width: 200px;
}
#expensestab {
  text-align: center;
  height: 40px;
  width: 200px;
}
</style>
