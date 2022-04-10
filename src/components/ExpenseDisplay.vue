<template>

    <div class="row">
      <va-input
        class="flex mb-2 md3"
        placeholder="Filter..."
        v-model="filter"
        label="Search for a Transaction"
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
        id="itemspp"
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
    no-data-html="Loading..."
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
          class="mb-0"
          v-model="tempname"
          label="Name"
          placeholder="Ower..."
          v-if="checkOwed()"
        />
        <va-input
          class="mb-0"
          v-model="temptitle"
          label="Title"
          placeholder="Title"
          v-if="!checkOwed()"
        />
        <va-divider/>
        <va-select v-model="tempcategory" :options="options" label="Select Category" v-if="checkType()"/>
        
        <va-divider v-if="checkType()"/>

        <va-input
          class="mb-0"
          v-model="tempamount"
          label="Amount"
          placeholder="$"
        />
        <va-divider/>

        <va-input
          class="mb-0"
          v-model="tempdesc"
          label="Description"
          placeholder="Text here..."
        />
        
        <va-divider/>

        <va-date-input class="mb-4" label="Date" placeholder="dd/mm/yyyy" v-model="tempdate" />

      </slot>
    </va-modal>
    <br>
    <va-button v-if="checkSelected()" color="danger" @click="deleteSelection()" class="mr-4">Delete All Selected Items</va-button>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

export default {
name : "ExpenseDisplay",
components: {},
  data(){
    const columns = [
      { key: 'index', sortable: true, width: '5%' },
      { key: 'date', sortable: true, width: '12%' },
      { key: 'type', sortable: true, width: '12%' },
      { key: 'title', sortable: true, width: '12%' },
      { key: 'category', sortable: true, width: '15%' },
      { key: 'description', sortable: true, width: '25%'},
      { key: 'amount', sortable: true, width: '10%' },
      { key: 'actions', width: '7%' }
    ]
  return{
    options: ["Food & Drink", "Transport", "Entertainment", "Groceries", "Shopping", "Others"],
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
    temptitle: "",
    tempdate : null,
    tempindex : null,
    tempamount: 0,
    tempdesc: "",
    tempcategory: "",
    tempname: "",
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

methods:{
  checkSelected() {
    if (this.selectedItems.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  deleteSelection() {
    if (! confirm("You are going to delete all selected items.")) {
        return;
      }
    for (let i = 0; i < this.selectedItems.length; i++) {
      let currItem = this.selectedItems[i];
      let currType = currItem.type;
      let currUid = currItem.uid;
      this.deleteinstrument(this.fbuser, currType, currUid);
    }
    this.updateData(this.fbuser);
  },
  checkType() {
    if (this.editedItem.type == "Expenses") {
      return true;
    } else {
      return false;
    }
  },
  checkOwed() {
    if (this.editedItem.type == "Owed Payments") {
      return true;
    } else {
      return false;
    }
  },
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
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      let uid = (eachDoc.uid);
      temp.uid = uid;
      temp.type = type;
      temp.name = title;
      temp.title = "Owed By: " + title;
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
      let number = (eachDoc.amount)
      let date = (eachDoc.date)
      let description = (eachDoc.description)
      let uid = (eachDoc.uid);
      temp.uid = uid;
      temp.type = type;
      temp.name = title;
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
    async setinstrument(user, currType, currTitle, currCat, currAmt, currDesc, currDate, currID){
        console.log(user, currType, currTitle, currCat, currAmt, currDesc, currDate, currID)
        await setDoc(doc(db, String(user), "Transactions", currType, currID),
        {
          title: currTitle, category: currCat, amount: currAmt, description: currDesc, uid: currID, date: currDate, type: currType,
        });
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
      this.temptitle = "";
      this.tempuid = null;
      this.temptype = null;
      this.tempdate = null;
      this.tempdesc = "";
      this.tempcategory = "-";
      this.tempindex = null;
      this.tempname = "";
    },
    deleteItemById (id) {
      var currItem = this.items[id];
      console.log(currItem.id, " delete type check")
      if (! confirm("You are going to delete item number " + currItem.index +".")) {
        return;
      }
      this.deleteinstrument(this.fbuser, currItem.type, currItem.uid);
      this.items = [
        ...this.items.slice(0, id),
        ...this.items.slice(id + 1),
      ]
      this.updateData(this.fbuser)
    },
    editItem () {
      if (this.isValidParams) {
        console.log(this.editedItem.uid, "tempuid check")
        var datenum = "";
        if (String(this.tempdate.getDate()).length == 1) {
          datenum = "0" + String(this.tempdate.getDate());
        } else {
          datenum = String(this.tempdate.getDate());
        }
        var datemonth = "";
        if (String(this.tempdate.getMonth() + 1).length == 1) {
          datemonth = "0" + String(this.tempdate.getMonth() + 1);
        } else {
          datemonth = String(this.tempdate.getMonth() + 1);
        }
        var currDate = datenum + "/" +
          datemonth + "/" + String(this.tempdate.getFullYear())

        if (this.editedItem.type == "Expenses" || this.editedItem.type == "Income") {
          this.tempname = this.temptitle
        }
        console.log(this.temptitle)
        this.setinstrument(this.fbuser, this.editedItem.type, this.tempname, 
        this.tempcategory, parseInt(this.tempamount), this.tempdesc, currDate, this.editedItem.uid);
        this.items = [
          ...this.items.slice(0, this.editedItemId),
          { ...this.editedItem },
          ...this.items.slice(this.editedItemId + 1),
        ]
        this.resetEditedItem()
        this.updateData(this.fbuser)
      } else {
        alert("Cannot take empty Values. Please enter the required values.")
      }
    },
    openModalToEditItemById (id) {
      this.editedItemId = id
      var temp = { ...this.items[id] }
      this.editedItem = temp;
      if (this.editedItem.type == "Owed Payments") {
        this.temptitle = this.editedItem.name;
      } else {
        this.temptitle = this.editedItem.title;
      }
      this.tempname = this.editedItem.name;
      this.tempamount = this.editedItem.amount;
      this.tempdesc = this.editedItem.description;
      this.tempcategory = this.editedItem.category;
      const d = new Date();
      let getYear = parseInt(this.editedItem.date.slice(6,10))
      let getMonth = parseInt(this.editedItem.date.slice(3,5)) - 1
      let getDay = parseInt(this.editedItem.date.slice(0,2))
      d.setFullYear(getYear, getMonth, getDay);
      this.tempdate = d;
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
    isValidParams: function() {

      if (this.editedItem.type == "Expenses") {
        if (this.temptitle.trim() == "" || this.tempcategory.trim() == "" || this.tempamount == "" || this.tempdate == "") {
          return false;
        } else {
          return true;
        }
      } else if (this.editedItem.type == "Owed Payments") {
        if (this.tempname.trim() == "" || this.tempamount == "" || this.tempdate == "") {
          return false;
        } else {
          return true;
        }
      } else if (this.editedItem.type == "Income") {
        if (this.temptitle.trim() == "" ||  this.tempamount == "" || this.tempdate == "") {
          return false;
        } else {
          return true;
        }
      }
      return false;
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

<style>
.table-example--pagination {
    text-align: center;
    align-self: center;
    vertical-align: middle;
    text-align: -webkit-center;
    padding: 15px;
  }
#itemspp {
  align-self: right;
  float: right;
}

#app > div:nth-child(2) > div.row > div:nth-child(1) {
  margin:auto;
}

#app > div:nth-child(2) > div.row > div:nth-child(3) {
  margin:auto;
}

#app > div:nth-child(2) > div.row > div:nth-child(2) {
  margin:auto;
}

body > div.va-modal > div.va-modal__container > div > div {
  width: 400px;
}
</style>
