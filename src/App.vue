<template>
  <va-navbar class="tab1" color="lightblue" shape="true">
    <template #left>
      <va-navbar-item text-align="center">
        <router-link to="/" class="routerlink" id="initial">
        <va-icon class="material-icons">dashboard</va-icon> 
        Dashboard
        </router-link>
      </va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item text-align="center">
        <router-link to="/goals" class="routerlink">
        <va-icon class="material-icons">account_balance</va-icon>
          Goals
        </router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item text-align="center">
        <router-link to="/expenses/false" class="routerlink" id="expense">
        <va-icon class="material-icons">paid</va-icon>
        Expenses
        </router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
  <div class="extra">
    
  </div>
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
  },
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
  /*border-bottom: 2px solid black;*/
}


.tab1 {
  width:60%;
  margin-bottom: 30px;
  float:left;
}
.extra {
  width:20%;
  background-color: lightblue;
  float:left;
  margin-bottom: 30px;
  min-height: 65px;
}
.tab2 {
  background-color: lightblue;
  width:20%;
  height: 65px;
  display: grid;
  float:left;
  margin-bottom: 30px;
}
/*
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
}*/
</style>
