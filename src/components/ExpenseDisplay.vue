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
    :selectable="selectable"
    v-model="selectedItems"
    :select-mode="selectMode"
    :selected-color="selectedColor"
    @selectionChange="selectedItemsEmitted = $event.currentSelectedItems"
    />

    <va-alert class="mt-3" border="left">
      <span>
        Selected items (click to unselect):
        <va-chip
          class="ml-2"
          :key="item.index"
          v-for="item in selectedItemsEmitted"
          @click="unselectItem(item)"
        >
          {{ item.index }}
        </va-chip>
      </span>
    </va-alert>

    <va-alert class="mt-3" border="left">
    <span>
      Number of filtered items:
      <va-chip>{{ filteredCount }}</va-chip>
    </span>
  </va-alert>
    
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
name : "ExpenseDisplay",
components: {},
  data(){
    const columns = [
      { key: 'index', sortable: true, width: '8%' },
      { key: 'type', sortable: true, width: '15%' },
      { key: 'title', sortable: true, width: '15%' },
      { key: 'category', sortable: true, width: '15%' },
      { key: 'amount', sortable: true, width: '10%' },
      { key: 'date', sortable: true, width: '37%' }
    ]
  return{
    fbuser:"",
    count:"",
    items: [], columns,
    updated: false,
    filter: '',
    useCustomFilteringFn: false,
    filteredCount: 0,
    selectable: true,
    selectedItems: [],
    selectedItemsEmitted: [],
    selectMode: 'multiple',
    selectedColor: '#888888',
    }
  }, 

  mounted(){
  const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        const userEmail = currUser.email;
        this.fbuser = userEmail;
        this.updateData(this.fbuser);
        this.checkData();
      } else {
        console.log(currUser, "user not found....");
      }
    }); 
  },
  // this.fbuser = firebase.auth().currentUser.email

methods:{
  //user becomes an email in display
  checkData() {
    this.updated = true;
    return this.updated;
  },

  async updateData(user){    
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
      //let category = (eachDoc.category)
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      temp.type = type;
      temp.title = "Ower is " + title;
      temp.category = "-";
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
      //let category = (eachDoc.category)
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      temp.type = type;
      temp.title = title;
      temp.category = "-";
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

    transactions.forEach((item)=>{
      item.index = ind;
      ind++;
    })
    this.items = transactions;
    this.filteredCount = transactions.length;
  },              

    async deleteinstrument(user, currType, currTitle){
        var currentType = currType;
        var currentTitle = currTitle;
        if (!confirm("You are going to delete " + currTitle)){
          return
        }
        await deleteDoc(doc(db, String(user), "Transactions", currentType, currentTitle))
        let tb = document.getElementById("table")
        //delete everything, make data empty and call the display again
        while (tb.rows.length >1){
            tb.deleteRow(1)
          }
        //document.getElementById("totalProfit").innerHTML=""
        this.updateData(this.fbuser) 
     },
    
    async editinstrument(title,user) {
        alert("You are going to edit " + title)
        await deleteDoc(doc(db,user,title))
        console.log("working on edit")
    },
    filterExact (source) {
      if (this.filter === '') {
        return true
      }

      return source?.toString?.() === this.filter
    },
    unselectItem (item) {
      const index = this.selectedItems.indexOf(item)
      this.selectedItems = [
        ...this.selectedItems.slice(0, index),
        ...this.selectedItems.slice(index + 1),
      ]
    },
  },
  computed: {
    customFilteringFn () {
      return this.useCustomFilteringFn ? this.filterExact : undefined
    },
  },
  watch: {
    selectable (value) {
      if (!value) {
        this.selectedItems = []
      }
    },
  },
  }

</script>

<style scoped>
/*
  .table-example--pagination {
    text-align: center;
    /*text-align: -webkit-center;
  }
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
}

*/
</style>