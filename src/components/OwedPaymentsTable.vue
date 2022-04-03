<template>
  <div class="table">
    <h2 id = "owed_payments_table">Owed Payments Table</h2>
    <table id = "table" class = "auto-index">
        <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Date of Return</th>
        <th>Category</th>
        <th>Description</th>       
        </tr>
    </table><br><br>
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
        let start_sn = 1;
        
        collection_required.forEach((docs) => {
          let data_required = docs.data()
          var table = document.getElementById("table")
          var row = table.insertRow(start_sn)

          var name = (data_required.Name)
          var amount = (data_required.Amount)
          var date = (data_required.Date)
          var date_of_return = (data_required.Date_Of_Return)
          var category = (data_required.Category)
          var description = (data_required.Description)

          var cell0 = row.insertCell(0); var cell1 = row.insertCell(1); var cell2 = row.insertCell(2);
          var cell3 = row.insertCell(3); var cell4 = row.insertCell(4); var cell5 = row.insertCell(5);
          var cell6 = row.insertCell(6);

          cell0.innerHTML = start_sn; cell1.innerHTML = name; cell2.innerHTML = amount; cell3.innerHTML = date;
          cell4.innerHTML = date_of_return; cell5.innerHTML = category; cell6.innerHTML = description; 

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
table {
    font-family: arial, sans-serif;
    width: 30%;
}
th,td {
    border:1px solid #000000;
    text-align: center;
    padding: 8px;
}

</style>