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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: 'DailyExpenseChart',
  data () {
    return {
        fbuser: "",
        chartParams:[]
    }
  },
  methods: {
    async updateData() {
      var currUser = "";
      var docs = null;
      /*
      const auth = getAuth();
      const user = auth.currentUser;
      currUser = String(user);
      console.log(currUser, " is current user")
      */
      const auth = getAuth();
      console.log("is auth even retrieved?")
      onAuthStateChanged(auth, (user) => {
      if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;
        currUser = uid;
      } else {
        console.log("no user found")
      // User is signed out
      // ...
      }
      });
      currUser = "meow@poop.com"
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
      this.chartParams = trans;
      //console.log(this.chartParams, " updated chart")
      console.log("daily expense done")
    },
  },
  mounted() {
  
    //this.updateUser();
    /*
    const auth = getAuth();      
    onAuthStateChanged(auth, (user) => {
      if (user) {
      console.log(user.email, " is current user id")
      const userid = user.email;
      this.fbuser = userid;
      } else {
      console.log(user, "user not found....") }
    });
    */
    this.updateData()
  }
}
</script>

<style scoped>
.user {
  margin: auto;
  border: 3px solid grey
}
</style>