<template>
  <Navbar @model-show="modelToggle" />
  <Model
    @model-toggle="modelToggle"
    :status="modelStatus"
    @store-expence="storeExpence"
    @redirectToAddTrans="popup"
  />
  <Expences :allExpences="expences" />
  <ExpenseDisplay />
  <add-transaction-button
    class="redirectChecker"
    @redirectToAddTrans="modelToggle"
  />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Model from "../components/Model.vue";
import Expences from "../components/Expences.vue";
import ExpenseDisplay from "../components/ExpenseDisplay.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddTransactionButton from "../components/AddTransactionButton.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Model,
    Expences,
    ExpenseDisplay,
    AddTransactionButton,
  },
  data() {
    return {
      modelStatus: false,
      expences: {
        balance: 0,
        income: 0,
        expence: 0,
        history: [],
      },
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user.email);
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    modelToggle() {
      console.log(this.modelStatus, " from toggle")
      this.modelStatus = !this.modelStatus;
    },
    storeExpence(payload) {
      const number = parseInt(payload.number);
      if (number > 1) {
        this.expences = {
          ...this.expences,
          income: this.expences.income + number,
          balance: this.expences.balance + number,
          history: [{ title: payload.title, number }, ...this.expences.history],
        };
      } else if (number < 1) {
        this.expences = {
          ...this.expences,
          expence: this.expences.expence + number,
          balance: this.expences.balance + number,
          history: [{ title: payload.title, number }, ...this.expences.history],
        };
      }
      this.modelStatus = false;
    },

    popup() {
      this.modelStatus = true;
      console.log(this.modelStatus, " from popup")
    },
  },
};
</script>

<style></style>
