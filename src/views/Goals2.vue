<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <NavbarSpendingGoals @model-show="modelToggle" />
  <ModelSpendingGoals
    @model-toggle="modelToggle"
    :status="modelStatus"
    @store-expence="storeGoals"
  />
  <spending-goals-2 />
 
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from '../components/SpendingGoals2.vue';
import NavbarSpendingGoals from "../components/NavbarSpendingGoals.vue";
import ModelSpendingGoals from "../components/ModelSpendingGoals.vue";

export default {
  name: "Goals2",
  components: {SpendingGoals2, NavbarSpendingGoals, ModelSpendingGoals},
  data() {
    return {
      modelStatus: false,
      user: false,
      Goals: {
        Category: "",
        Amount: 0,
      }
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

    storeGoals(payload) {
      console.log(payload, " payload")
      this.modelStatus = false;
    },
  },
};
</script>

<style></style>
