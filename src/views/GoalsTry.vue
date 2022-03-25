<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <NavbarEditSpendingGoals @model-show="modelToggle" />
  <ModelEditSpendingGoals
    @model-toggle="modelToggle"
    :status="modelStatus"
    @added="change"
  />
  <SpendingGoals2 :key="refreshComp" />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from "../components/SpendingGoals2.vue";
import NavbarEditSpendingGoals from "../components/NavbarEditSpendingGoals.vue";
import ModelEditSpendingGoals from "../components/ModelEditSpendingGoals.vue";

export default {
  name: "Goals2",
  components: { SpendingGoals2, NavbarEditSpendingGoals, ModelEditSpendingGoals },
  data() {
    return {
      refreshComp: 0,
      modelStatus: false,
      user: false,
      Goals: {
        Category: "",
        Amount: 0,
      },
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
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
