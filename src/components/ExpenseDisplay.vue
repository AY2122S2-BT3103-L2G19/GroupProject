<template>
    <h1>Transactions</h1>    

    <table id = "table" class = "auto-index" :key="count">
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
    </table><br><br>

     <h2 id = "totalProfit">  </h2> 

</template>

<script>

//console.log("in ED")

import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
name : "ExpenseDisplay",
components: {},
  data(){
  return{
    fbuser:"",
    count:"",

    }
  }, 

  mounted(){
  const auth = getAuth();      
  this.fbuser = auth.currentUser.email; 
  // this.fbuser = firebase.auth().currentUser.email
  this.display(this.fbuser)},

  methods:{
  //user becomes an email in display

  async display(user){    
    let z = await getDocs(collection(db,String(user), "Transactions", "Owed Payments"))   
    let ind = 1;
    //var tp = 0

    z.forEach((docs) => {
      let yy = docs.data()
      var table = document.getElementById("table")
      var row = table.insertRow(ind)
    // type, title, category, number, date, description 
      var type = (yy.type)
      var title = (yy.title)
      var category = (yy.category)
      var number = (yy.number)
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
      bu.id = String(title)
      bu.innerHTML ="Delete"
      bu.onclick =  ()=>{
        this.deleteinstrument(title,user)
      }
      cell9.appendChild(bu) 

    var bu2 = document.createElement("button")
      bu2.className = "bwt"
      bu2.id = String(title)
      bu2.innerHTML ="Edit"
      bu2.onclick =  ()=>{
        this.editinstrument(title,user)
      }
      cell8.appendChild(bu2)
      ind+= 1   
    }) 
  },              

    async deleteinstrument(title,user){      
        alert("You are going to delete " + title)
        await deleteDoc(doc(db,user,title))
        let tb = document.getElementById("table")
        //delete everything, make data empty and call the display again
        while (tb.rows.length >1){
            tb.deleteRow(1)
          }
        //document.getElementById("totalProfit").innerHTML=""
        this.display(this.fbuser) 
     },
    
    async editinstrument(title,user) {
        alert("You are going to delete " + title)
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

/*tr:nth-child(even) {
  background-color: #e3edee;
}*/

th,td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

/*.bwt{
    color:rgb(248, 240, 240);
    background-color: rgb(122, 139, 197);
}*/
</style>