<template>
  <div class="chart">
    <h4 class="title">Line Chart of expenses</h4>
    <line-chart class = "user" width = 100% :data = "chartParams"></line-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
export default {
  name: 'DailyExpenseChart',
  data () {
    return {
        chartParams:[]
    }
  },
  methods: {
    // const auth = getAuth();
    // this.fbuser = auth.currentUser.email;
    async display(currUser) {
      console.log("Displaying user Expense Chart");
      //currUser = "meow@poop.com";
      console.log(currUser, " user");
      let docs = await getDocs(
        collection(db, String(currUser), "Transactions", "Expenses")
      );

      var trans = [];

      docs.forEach((doc) => {
        let docData = doc.data();
        console.log(docData, " doc data");
        let transDetails = [];
        transDetails.push(docData.Date);
        transDetails.push(docData.Amount);
        trans.push(transDetails);
      });

      
      this.chartParams = trans;
      console.log(this.chartParams, " updated chart")

      return trans;
    },
  },
  mounted() {
    this.display("meow@poop.com");
  }
}
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid grey
}
</style>