<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <NavbarSpendingGoals @model-show="modelToggle" />
  <ModelSpendingGoals
    @model-toggle="modelToggle"
    :status="modelStatus"
    @added="change"
  />
  <SpendingGoals2 :key="refreshComp" />
  <NavbarEditSpendingGoals @model-show="modelToggle2" />
  <ModelEditSpendingGoals
    @model-toggle="modelToggle2"
    :status="modelStatus2"
    @added="change2"
  />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from "../components/SpendingGoals2.vue";
import NavbarSpendingGoals from "../components/NavbarSpendingGoals.vue";
import ModelSpendingGoals from "../components/ModelSpendingGoals.vue";
import NavbarEditSpendingGoals from "../components/NavbarEditSpendingGoals.vue";
import ModelEditSpendingGoals from "../components/ModelEditSpendingGoals.vue";


export default {
  name: "Goals2",
  components: { SpendingGoals2, NavbarSpendingGoals, ModelSpendingGoals, NavbarEditSpendingGoals, ModelEditSpendingGoals },
  data() {
    return {
      refreshComp: 0,
      modelStatus: false,
      modelStatus2: false,
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

    modelToggle2() {
      this.modelStatus2 = !this.modelStatus2;
    },

    change() {
      this.refreshComp += 1;
      this.modelStatus = false;
    },

    change2() {
      this.refreshComp += 1;
      this.modelStatus2 = false;
    },
  },
};
</script>

<style></style>
