<template>
    <h1>Transactions</h1>    

    <div class="row">
    <va-input
      class="flex mb-2 md6"
      placeholder="Filter..."
      v-model="filter"
    />

    <va-checkbox
      class="flex mb-2 md6"
      label="Use custom filtering function (looks for an exact match)"
      v-model="useCustomFilteringFn"
    />
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :filter="filter"
    :filter-method="customFilteringFn"
    @filtered="filteredCount = $event.items.length"
    id="table"
    :key="count"
  >
        <tr>  
        <th>S.No</th>    
        <th>Date</th>   
        <th>Type</th>
        <th>Title</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
    </va-data-table><br><br>
</template>

<script>

//console.log("in ED")

import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
name : "ExpenseDisplay",
components: {},
  data(){
  return{
    fbuser:"",
    count:"",
    filter: '',
    useCustomFilteringFn: false,
    }
  }, 
  computed: {
    customFilteringFn () {
      return this.useCustomFilteringFn ? this.filterExact : undefined
    },
  },

  mounted(){
  const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        console.log(currUser.email, " is current user id");
        const userEmail = currUser.email;
        this.fbuser = userEmail;
        this.display(this.fbuser);
      } else {
        console.log(currUser, "user not found....");
      }
    }); 
  },
  // this.fbuser = firebase.auth().currentUser.email

  methods:{
    filterExact (source) {
      if (this.filter === '') {
        return true
      }

      return source?.toString?.() === this.filter
    },
  //user becomes an email in display

  async display(user){    
    var owedPayments = await getDocs(collection(db,String(user), "Transactions", "Owed Payments"))  
    var expenses = await getDocs(collection(db,String(user), "Transactions", "Expenses"))   
    var income = await getDocs(collection(db,String(user), "Transactions", "Income"))   

    var ind = 1;
    var transactions = [];

    owedPayments.forEach((docs) => {
      let eachDoc = docs.data();
      let temp = {};
      let type = (eachDoc.type)
      let title = (eachDoc.title)
      let category = (eachDoc.category)
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      temp.type = type;
      temp.title = title;
      temp.category = category;
      temp.amount = number;
      temp.date = date;
      temp.description = description;
      transactions.push(temp);
    })

    expenses.forEach((docs) => {
      let eachDoc = docs.data();
      let temp = {};
      let type = (eachDoc.type)
      let title = (eachDoc.title)
      let category = (eachDoc.category)
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      temp.type = type;
      temp.title = title;
      temp.category = category;
      temp.amount = number;
      temp.date = date;
      temp.description = description;
      transactions.push(temp);
    })

    income.forEach((docs) => {
      let eachDoc = docs.data();
      let temp = {};
      let type = (eachDoc.type)
      let title = (eachDoc.title)
      let category = (eachDoc.category)
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      temp.type = type;
      temp.title = title;
      temp.category = category;
      temp.amount = number;
      temp.date = date;
      temp.description = description;
      transactions.push(temp);
    })
    
    transactions.sort(function(b,a){
      if (a.date.slice(6,10) == b.date.slice(6,10)) {
        if (a.date.slice(3,5) == b.date.slice(3,5)) {
          let aDay = parseInt(a.date.slice(0,2));
          let bDay = parseInt(b.date.slice(0,2));
          return aDay - bDay;
        }
        let aMonth = parseInt(a.date.slice(3,5));
        let bMonth = parseInt(b.date.slice(3,5));
        return aMonth - bMonth;
      }
      let aYear = parseInt(a.date.slice(6,10));
      let bYear = parseInt(b.date.slice(6,10));
      return aYear - bYear;
    })
    
    for (var i = 0; i < transactions.length; i++) {
      var table = document.getElementById("table")
      var row = table.insertRow(ind)
      var yy = transactions[i]
    // type, title, category, number, date, description 
      let type = (yy.type)
      let title = (yy.title)
      let category = (yy.category)
      if (category == "") {
        category = "-";
      }
      var number = (yy.amount)
      var date = (yy.date)
      var description = (yy.description)

      var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6); var cell8 = row.insertCell(7); var cell9 = row.insertCell(8);       

      cell1.innerHTML = ind; cell2.innerHTML = date; cell3.innerHTML = type; cell4.innerHTML = title; 
      cell5.innerHTML = number; cell6.innerHTML = category; cell7.innerHTML = description; 

      cell7.className = "profits"
     
      var bu = document.createElement("button")
      bu.className = "bwt"
      bu.id = String(type)
      bu.title = String(title)
      bu.innerHTML ="Delete"
      bu.onclick =  () =>{
        this.deleteinstrument(user, type, title)
      }
      cell9.appendChild(bu) 

    var bu2 = document.createElement("button")
      bu2.className = "bwt"
      bu2.id = String(type)
      bu2.innerHTML ="Edit"
      bu2.onclick =  ()=>{
        this.editinstrument(title,user)
      }
      cell8.appendChild(bu2)
      ind+= 1   
    }
  },              

    async deleteinstrument(user, currType, currTitle){
        var currentType = currType;
        var currentTitle = currTitle;
        alert("You are going to delete " + currTitle)
        await deleteDoc(doc(db, String(user), "Transactions", currentType, currentTitle))
        let tb = document.getElementById("table")
        //delete everything, make data empty and call the display again
        while (tb.rows.length >1){
            tb.deleteRow(1)
          }
        //document.getElementById("totalProfit").innerHTML=""
        this.display(this.fbuser) 
     },
    
    async editinstrument(title,user) {
        alert("You are going to edit " + title)
        await deleteDoc(doc(db,user,title))
        console.log("working on edit")
    }
    }
  }

</script>

<style>
/*
h1,h2 {
  text-align: center;
  background-color: rgb(175, 214, 221);
  font: 700;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}*/

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th,td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.va-table-responsive {
    overflow: auto;
  }
</style>