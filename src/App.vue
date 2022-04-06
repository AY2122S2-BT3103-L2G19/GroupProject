<template>
  <div id="navbar" v-if="checkUser()">
  <va-tabs class="my-2"
    stateful
    grow
  >
    <template #tabs>
      <va-tab>
        <router-link to="/" class="routerlink" id="initial">
        ⠀⠀⠀⠀⠀
        <va-icon class="material-icons">dashboard</va-icon> 
        Dashboard⠀⠀⠀⠀⠀
        </router-link>
      </va-tab>
      <va-divider vertical/>
      <va-tab>
        <router-link to="/goals" class="routerlink">
        ⠀⠀⠀⠀⠀
        <va-icon class="material-icons">account_balance</va-icon>
          Goals⠀⠀⠀⠀⠀
        </router-link>
      </va-tab>
      <va-divider vertical/>
      <va-tab>
        <router-link to="/expenses/false" class="routerlink" id="expense">
        ⠀⠀⠀⠀⠀
        <va-icon class="material-icons">paid</va-icon>
        Transactions⠀⠀⠀⠀⠀
        </router-link>
      </va-tab>

      <va-tab>
        <LogOut/>
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
  <hr>
  </div>
  <router-view/>
</template>

<script>
import LogOut from '@/components/LogOut.vue'

export default {
  name: 'App',
  components: {
     LogOut
 },
 mounted() {},
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
  margin-bottom: 10px;
}

.routerlink:hover {
  color:rgb(244, 186, 111);
  /*border-bottom: 2px solid black;*/
}

#navbar {
  float: left;
  margin-top: 10px;
  width: 100%;
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
  margin-right:10px;
  margin-top:5px;
  width:10%;
  height:46px;
  display:grid;
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
/*
.bwt {
  background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  height: 30px;
  line-height: 15px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 4px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}*/

.bwt:hover,
.bwt:focus {
  background-color: #F082AC;
}
</style>
