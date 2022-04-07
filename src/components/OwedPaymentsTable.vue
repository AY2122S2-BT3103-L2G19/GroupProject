<template>
  <div class="table">
    <h2 id = "owed_payments_table">Owed Payments</h2>
    <br>
    <table id = "table" class = "va-table">
        <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
        </tr>
    </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
      return {
          user: false,
      }
  },

  mounted() {
    const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user=user.email;
            console.log(user.email);
          }
      })
    },

  watch : { 
    user() {
      console.log("updated running")

      async function display(user) {
        var table = document.getElementById("table")
          while (table.rows.length > 1) {
          table.deleteRow(1);
        }
        let collection_required = await getDocs(collection(db, user, "Transactions", "Owed Payments"));
        var start_sn = 1;
        
        collection_required.forEach((docs) => {
          let data_required = docs.data()
          var table = document.getElementById("table")
          var row = table.insertRow(start_sn)

          var title = (data_required.title)
          var amount = (data_required.amount)
          var date = (data_required.date)

          var cell0 = row.insertCell(0); var cell1 = row.insertCell(1); var cell2 = row.insertCell(2);
          var cell3 = row.insertCell(3); 

          cell0.innerHTML = start_sn; cell1.innerHTML = title; cell2.innerHTML = amount; cell3.innerHTML = date;

          start_sn += 1
        });
      }
      
      display(this.user)
      
    } 
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th,td {
    border:1px solid #000000;
    text-align: center;
    padding: 8px;
}

</style>