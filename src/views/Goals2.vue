<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <NavbarSpendingGoals @model-show="modelToggle" />
  <ModelSpendingGoals
    @model-toggle="modelToggle"
    :status="modelStatus"
    @added="change"
  />
  <SpendingGoals2 :key="refreshComp"/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from "../components/SpendingGoals2.vue";
import NavbarSpendingGoals from "../components/NavbarSpendingGoals.vue";
import ModelSpendingGoals from "../components/ModelSpendingGoals.vue";

export default {
  name: "Goals2",
  components: { SpendingGoals2, NavbarSpendingGoals, ModelSpendingGoals },
  data() {
    return {
      refreshComp: 0,
      modelStatus: false,
      // user: false,
      Goals: {
        Category: "",
        Amount: 0,
      },
    };
  },

  mounted() {
    const auth = getAuth();
    console.log(auth.currentUser, " auth from goals2")
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user.email, "  email from on auth state change")
      }
    });
    console.log(auth.currentUser, " auth from goals2 after changed")
  },

  methods: {
    modelToggle() {
      this.modelStatus = !this.modelStatus;
    },

    change() {
      this.refreshComp += 1;
      this.modelStatus = false;
    },
  },
};
</script>

<style></style>
