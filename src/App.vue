<template>
  <div id="navbar" v-if="checkUser()">
  <va-tabs class="my-2"
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
      <va-divider vertical />
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
      <va-tab>
        <router-link to="/about" class="routerlink" id="about">
        <va-icon class="material-icons">question_answer</va-icon>
        Contact Us
        </router-link>
      </va-tab>
      <va-divider vertical/>
      <va-tab>
        <div id="logout">
        <LogOut />
        </div>
      </va-tab>
    </template>
  </va-tabs>
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
      if (this.$route.path == '/' || this.$route.path == '/goals' || this.$route.path == '/expenses/true' || this.$route.path=='/expenses/false' || this.$route.path=='/about') {
        return true;
      }
      return false;
    }
  },
  created(){
        document.title = "Expense Buddy"
    },
}
</script>

<style>
/*#logout{
  margin: auto;
}*/

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
}

#navbar {
  float: left;
  padding-top: 10px;
  width: 100%;
  background-color:aliceblue;
  border-bottom: solid 2px black;
}
.tab2 {
  margin-right:10px;
  margin-top:5px;
  width:10%;
  height:46px;
  display:grid;
  float:right;
  margin-bottom: 10px;
}

.bwt:hover,
.bwt:focus {
  background-color: #F082AC;
}

.va-tab .va-tab__content {
  padding: 0;
}
.va-tab__content a {
  width: 100%;
}

</style>
