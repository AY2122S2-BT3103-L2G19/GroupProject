<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <NavbarSpendingGoals @model-show="modelToggle" />
  <ModelSpendingGoals
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
import NavbarSpendingGoals from '../components/NavbarSpendingGoals.vue';
import ModelSpendingGoals from '../components/ModelSpendingGoals.vue';

export default {
  name: "Goals",
  components: { SpendingGoals, NavbarSpendingGoals, ModelSpendingGoals },
  data() {
    return {
      modelStatus: false,
      user:false,
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
  },
};
</script>

<style></style>
