<template>
    <h1>Transactions</h1>  
    <br>  

    <div class="row">
      <va-input
        class="flex mb-2 md3"
        placeholder="Filter..."
        v-model="filter"
      />

      <va-checkbox
        class="flex mb-2 md3"
        label="Use Exact Match Filtering"
        v-model="useCustomFilteringFn"
      />

      <va-input
        class="flex mb-2 md3"
        type="number"
        placeholder="Items..."
        label="Items per page"
        v-model.number="perPage"
      />
    </div>
    <va-data-table 
    :items="items" 
    :columns="columns"
    :filter="filter"
    :filter-method="customFilteringFn"
    @filtered="filteredCount = $event.items.length"
    :selectable="true"
    v-model="selectedItems"
    :select-mode="selectMode"
    :selected-color="selectedColor"
    @selectionChange="selectedItemsEmitted = $event.currentSelectedItems"
    :per-page="perPage"
    :current-page="currentPage"
    :striped="true"
    :animated="true"
    >
      <template #cell(actions)="{ rowIndex }">
        <va-button flat icon="edit" @click="openModalToEditItemById(rowIndex)" />
        <va-button flat icon="delete" @click="deleteItemById(rowIndex)" />
      </template>
      <template #bodyAppend>
        <tr><td colspan="10" class="table-example--pagination">
          <va-pagination
            v-model="currentPage"
            input
            :pages="pages"
          />
        </td></tr>
      </template>
    </va-data-table>

    <va-modal
      :model-value="!!editedItem"
      message="Edit item"
      @ok="editItem()"
      @cancel="resetEditedItem()"
    >
      <slot>
        <va-input
          v-for="key in Object.keys(editedItem)"
          :key="key"
          class="my-3"
          :label="key"
          v-model="editedItem[key]"
        />
      </slot>
    </va-modal>

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
      { key: 'date', sortable: true, width: '20%' },
      { key: 'actions', width: '10%' }
    ]
  return{
    fbuser:"",
    count:"",
    items: [], columns,
    updated: false,
    filter: '',
    filtered: [],
    useCustomFilteringFn: false,
    filteredCount: 0,
    selectedItems: [],
    selectedItemsEmitted: [],
    selectMode: 'multiple',
    selectedColor: '#888888',
    perPage: 10,
    currentPage: 1,
    editedItemId: null,
    editedItem: null,
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
      let uid = (eachDoc.uid);
      temp.uid = uid;
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
      let uid = (eachDoc.uid);
      //console.log(String(id), " ID CHECK EXPENSE")
      temp.uid = uid;
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
      let uid = (eachDoc.uid);
      temp.uid = uid;
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
    this.filtered = transactions;
  },              

    async deleteinstrument(user, currType, currID){
        await deleteDoc(doc(db, String(user), "Transactions", currType, currID))
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
    resetEditedItem () {
      this.editedItem = null
      this.editedItemId = null
    },
    deleteItemById (id) {
      var currItem = this.items[id];
      //deleteDoc(doc(db, String(this.fbuser), "Transactions", currItem.type, currItem.id))
      console.log(currItem.id, " delete type check")
      this.deleteinstrument(this.fbuser, currItem.type, currItem.uid);
      this.items = [
        ...this.items.slice(0, id),
        ...this.items.slice(id + 1),
      ]
    },
    editItem () {
      //this.deleteinstrument(this.fbuser, this.editedItem.type, this.editedItem.title);
      this.items = [
        ...this.items.slice(0, this.editedItemId),
        { ...this.editedItem },
        ...this.items.slice(this.editedItemId + 1),
      ]
      this.resetEditedItem()
    },
    openModalToEditItemById (id) {
      this.editedItemId = id
      this.editedItem = { ...this.items[id] }
    },
  },
  computed: {
    customFilteringFn () {
      return this.useCustomFilteringFn ? this.filterExact : undefined
    },
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length
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
.table-example--pagination {
    text-align: center;
    align-self: center;
    vertical-align: middle;
    text-align: -webkit-center;
  }

</style>
