<template>
  <div class="table">
    <h2 id = "owed_payments_table">Owed Payments</h2>
    <br>
    <table id = "table" class = "va-table">
        <tr>
        <th>S/N</th>
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
import { publish } from "../pubsub.js";

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
          }
      })
    },

  watch : { 
    user() {
      async function display(user) {
        var table = document.getElementById("table")
          while (table.rows.length > 1) {
          table.deleteRow(1);
        }
        let collection_required = await getDocs(collection(db, user, "Transactions", "Owed Payments"));
        if (collection_required == null) {
          return;
        }
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
          bu.innerHTML ='<va-icon class="material-icons" style="color: rgb(44, 130, 224); font-size: 24px;">check</va-icon>'
          bu.onclick =  () =>{
            resolvePayment(user,title, amount, desc, date, uid)
            publish("OPResolved")
          }
          cell4.appendChild(bu) 
          start_sn += 1
        });
      }

      async function resolvePayment(user,title, amount, desc, date, uid) {
        let MyDate = new Date();
        let MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
                    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
                    + MyDate.getFullYear();
        try{
            const docRef = await setDoc(doc(db, String(user), "Transactions", "Income", uid),{
            type: "Income" , title : "Paid by: "+title, category : "-", amount: amount, date : MyDateString, description : desc, uid: uid,
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

<style scoped>
:deep() tr:nth-child(odd) {background-color: #f5f8f9 !important;}

</style>
