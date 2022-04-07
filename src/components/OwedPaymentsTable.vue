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
        <th>Resolve</th>
        </tr>
    </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { setDoc, doc ,deleteDoc, getFirestore } from "firebase/firestore";
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

          let title = (data_required.title)
          let amount = (data_required.amount)
          let date = (data_required.date)
          let desc = data_required.description
          let uid = data_required.uid

          

          var cell0 = row.insertCell(0); var cell1 = row.insertCell(1); var cell2 = row.insertCell(2);
          var cell3 = row.insertCell(3); var cell4 = row.insertCell(4);

          cell0.innerHTML = start_sn; cell1.innerHTML = title; cell2.innerHTML = amount; cell3.innerHTML = date;

          var bu = document.createElement("button")
          bu.className = "bwt"
          bu.id = String(uid)
          bu.title = String(title)
          bu.innerHTML ="Resolve"
          bu.onclick =  () =>{
            resolvePayment(user,title, amount, desc, date, uid)
          }
          cell4.appendChild(bu) 

          start_sn += 1
        });
      }

      async function resolvePayment(user,title, amount, desc, date, uid) {
        console.log(user,title, amount, desc, date, uid);   
        try{
            const docRef = await setDoc(doc(db, String(user), "Transactions", "Income", uid),{
            type: "Income" , title : title, category : "-", amount: amount, date : date, description : desc, uid: uid,
            })
            const docRefDel = await deleteDoc(doc(db, String(user), "Transactions", "Owed Payments", uid))
            console.log(docRef)
            console.log(docRefDel)
            }
          catch(error) {
              console.error("Error adding document: ", error);
          }
        display(user)
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