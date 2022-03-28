<template>
  <div class="chart">
    <h4 class="title">Past expenses</h4>
    <line-chart id="linechart" class = "user" width = 100% ytitle="Expenditure ($)" :data = "chartParams"></line-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: 'DailyExpenseChart',
  data () {
    return {
        user: false,
        chartParams:[]
    }
  },
  methods: {
    async updatedData(currUser) {
          var docs = null;
          docs = await getDocs(
          collection(db, currUser, "Transactions", "Expenses"));
          var trans = [];
          docs.forEach((doc) => {
          let docData = doc.data();
          //console.log(docData, " doc data");
          let transDetails = [];
          transDetails.push(docData.Date);
          transDetails.push(docData.Amount);
          trans.push(transDetails);
          });
          
          //this.chartParams = trans;
          //console.log(this.chartParams, " updated chart")
          console.log("daily expense done")
          this.chartParams = trans;
          return trans;
        }
    
  },
  mounted() {
    //this.updateUser();
    const auth = getAuth();      
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
      console.log(currUser.email, " is current user id")
      const userEmail = currUser.email;
      this.user = userEmail;
      this.updatedData(this.user);
      } else {
      console.log(currUser, "user not found....") }
    });
  },
  watch:{
    chartParams() {
    },
    user() {
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
