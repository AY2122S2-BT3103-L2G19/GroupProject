<template>
<div>
  <NavbarExpenses @model-show="modelToggle" />
  <ModelExpenses
    @model-toggle="modelToggle"
    :status="modelStatus"
    :data = "data"
    @store-expense="storeExpense"
    @added = "change"
    
  />
  <br>
  <ExpenseDisplay
    :key ="refresh"
    @model-show="modelToggle"/>
</div>
</template>

<script>
import NavbarExpenses from "../components/NavbarExpenses.vue";
import ModelExpenses from "../components/ModelExpenses.vue";
import ExpenseDisplay from "../components/ExpenseDisplay.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";


export default {
  name: "App",
  components: {
    NavbarExpenses,
    ModelExpenses,
    ExpenseDisplay,
    },
  props: {
    togglePopup: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      modelStatus: false,
      refresh: 0,
      expenses: {
        balance: 0,
        income: 0,
        expense: 0,
        history: [],
      },
      data:null,
      user:false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            console.log(user.email)
        } else {
          this.$router.push("/login")
        }
    })
    if (this.togglePopup == "true") {
      this.modelStatus = true;
    }
},
  methods: {
    change() {
      this.refresh += 1;
    },
    modelToggle(value) {
      console.log(value);
      this.data = value
      this.modelStatus = !this.modelStatus;
    },
    storeExpense(payload) {
      const number = parseInt(payload.number);
      if (number > 1) {
        this.expenses = {
          ...this.expenses,
          income: this.expenses.income + number,
          balance: this.expenses.balance + number,
          history: [{ type: payload.type, title: payload.title, date: payload.date, number }, ...this.expenses.history],
        };
      } else if (number < 1) {
        this.expenses = {
          ...this.expenses,
          expense: this.expenses.expense + number,
          balance: this.expenses.balance + number,
          history: [{ type: payload.type, title: payload.title, date: payload.date, number }, ...this.expenses.history],
        };
      }
      this.modelStatus = false;
    },
  },
};
</script>

<style>

</style>