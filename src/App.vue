<template>
  <div id="navbar" v-if="checkUser()" class="tab-wrapper">
  <va-tabs class="tab1"
    stateful
    grow
  >
    <template #tabs>
      <va-tab>
        <router-link to="/" class="routerlink" id="initial">
        <va-icon class="material-icons">dashboard</va-icon> 
        Dashboard
        </router-link>
      </va-tab>
      <va-divider vertical/>
      <va-tab>
        <router-link to="/goals" class="routerlink">
        <va-icon class="material-icons">account_balance</va-icon>
          Goals
        </router-link>
      </va-tab>
      <va-divider vertical/>
      <va-tab>
        <router-link to="/expenses/false" class="routerlink" id="expense">
        <va-icon class="material-icons">paid</va-icon>
        Transactions
        </router-link>
      </va-tab>
      <va-divider vertical/>
    </template>
  </va-tabs>
  <!--
  <va-navbar shape class="tab1" color="lightblue">
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
        Transactions
        </router-link>
      </va-navbar-item>
    </template>
  </va-navbar>-->
  </div>
  <div class="extra" v-if="checkUser()">
    
  </div>
  <div class="tab2" v-if="checkUser()">
    <LogOut/>
  </div>
  <br>
  <br>
  <br>
  <hr>
  <router-view/>
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
    },
    checkUser() {
      if (this.$route.path == '/' || this.$route.path == '/goals' || this.$route.path == '/expenses/true' || this.$route.path=='/expenses/false') {
        return true;
      }
      return false;
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
}

.routerlink {
  font-size: 24px;
  color:rgb(0, 0, 0);
}

.routerlink:hover {
  color:rgb(244, 186, 111);
  /*border-bottom: 2px solid black;*/
}

#navbar {
  float: left;
  margin-top: 10px;
  width: 50%;
}

/*
.extra {
  width:30%;
  background-color: lightblue;
  float:left;
  margin-bottom: 30px;
  min-height: 65px;
}*/
.tab2 {
  width:10%;
  height: 65px;
  display: grid;
  float:right;
  margin-bottom: 10px;
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
