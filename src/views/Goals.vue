<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <Model
    @model-toggle="modelToggle"
    :status="modelStatus"
    @store-expence="storeExpence"
  />
  <SpendingGoals />
  <h2>Saving Goals</h2>
  <button>Add Saving Goals</button>
  <SpendingGoals />
</template>

<script>
import SpendingGoals from "../components/SpendingGoals.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Model from "../components/Model.vue";

export default {
  name: "Goals",
  components: { SpendingGoals, Model},
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
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #fafafa;
  font-family: sans-serif;
}

</style>
