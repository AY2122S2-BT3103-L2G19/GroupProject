<template>
  <div v-if="status">
    <div class="model" @click.self="toggle">
      <div class="model__container">
        <div class="model__form">
          <form @submit.prevent="addExpense">
            <div class="model__group">
              <h3>Add Transaction</h3>
            </div>
            <div class="model__group">
              <label for="type">Transaction Type:   </label>

              <select id="type" v-model ="type">
                <option value="Income">Income</option>
                <option value="Expenses">Expense</option>
                <option value="Owed Payments">Owed Payment</option>
              </select>   
            </div>
            <div class="model__group" v-show="!isOwedPayment">
              <label for="title">Title</label>
              <input
                id="title"
                type="text"
                class="model__control"
                placeholder="Title..."
                v-model="title"
              />
            </div>
              <div class="model__group" v-show="isOwedPayment">
              <label for="name">Name of person owing:</label>
              <input
                id="name"
                type="text"
                class="model__control"
                placeholder="Name..."
                v-model="name"
              />
            </div>
            <div class="model__group">
              <label for="amount">Amount</label>
              <input
                id="amount"
                type="number"
                class="model__control"
                placeholder="Amount..."
                v-model="number"
              />
            </div>
            <div class="model__group" v-show="isExpense">
              <label for="category">Category:   </label>

              <select id="category" v-model = "category">
                <option value="Food & Drink">Food & Drink</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Groceries">Groceries</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>   
            </div>
            <div class="model__group">
              <label for="date">Transaction Date</label>
              <input
                id = "date"
                type= "date"
                class="model__control"
                placeholder="Date..."
                v-model="date"
              />
            </div>
            <div class="model__group" v-show="isOwedPayment">
              <label for="date_due">Payment Due Date</label>
              <input
                id = "date_due"
                type= "date"
                class="model__control"
                placeholder="Date..."
                v-model="date_due"
              />
            </div>
            <div class="model__group">
              <label for="description">Description</label>
              <input
                id="description"
                type="text"
                class="model__control"
                placeholder="Description..."
                v-model="description"
              />
            </div>
            <div class="model__group">
              <button  id = "savebutton"  class="button" type="submit"  @click.prevent="savetofs()"> Add Expense </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
console.log("in AC")
import firebaseApp from '@/firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "ModelExpenses",
  props: ["status"],
  data() {
    return {
      type:"Expenses",
      title: "",
      category:"",
      number: "",
      date:"",
      description:"",
      fbuser: "",
      date_due: "",
      name: "",
      uid: "",
    };
  },
  methods: {
    toggle() {
      this.type="Expenses",
      this.title= "",
      this.category="",
      this.number= "",
      this.date="",
      this.description="",
      this.date_due= "",
      this.name= "",
      this.uid= "",
      this.$emit("model-toggle");
    },
    addExpense() {
      this.$emit("store-expense", { type: this.type, title: this.title, date: this.date, number: this.number});
      this.type = "";
      this.title = "";
      this.number = "";
      this.date = "";
    },
    async savetofs(){   
    
    const auth = getAuth(); 
    this.fbuser = auth.currentUser.email;
    this.isValidParams
    

    if (this.isValidParams){

      try{
        var date = this.date;
        date = date.slice(8,10) + "/" + date.slice(5,7) + "/" + date.slice(0,4);
        this.date = date;
        if (this.type == "Owed Payments") {
          this.title = "Owed by " + this.name;
        }
        //for uid
        var udate = String(new Date());
        this.uid = udate;
        const docRef = await setDoc(doc(db, String(this.fbuser), "Transactions", this.type, this.uid),{
        type: this.type , title : this.title, category : this.category, amount: this.number, date : this.date, description : this.description, date_due : this.date_due, uid: this.uid,
        })
        console.log(docRef)
        this.type= this.title=this.number=this.date=this.description=this.uid = "";
        this.$emit("added")
        }
      catch(error) {
          console.error("Error adding document: ", error);
      }
      this.toggle()
  
    }
    else {
      alert("Cannot take empty Values. Please enter the values")
      
    }
  },

  },
  computed: {
    isExpense: function() {
      return this.type == "Expenses";
    },
    isOwedPayment: function() {
      return this.type == "Owed Payments";
    },
    isValidParams: function() {
      if (this.type == "Expenses") {
        if (this.title.trim() == "" || this.category.trim() == "" || this.number == "" || this.date.trim() == "" || this.description.trim() == "") {
          return false;
        } else {
          return true;
        }
      } else if (this.type == "Owed Payments") {
        if (this.name.trim() == "" || this.date_due.trim() == "" || this.number == "" || this.date.trim() == "" || this.description.trim() == "") {
          return false;
        } else {
          return true;
        }
      } else if (this.type == "Income") {
        if (this.title.trim() == "" ||  this.number == "" || this.date.trim() == "" || this.description.trim() == "") {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
  }
};
</script>

<style scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.model__container {
  background: #fff;
  width: 450px;
  padding: 20px;
  border-radius: 5px;
}
.model__group {
  margin: 15px 0;
}
.model__control {
  border-bottom: 1px solid silver;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  padding: 7px 0;
  outline: none;
}
.button {
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #84bddf; 
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  outline: none;
}
</style>