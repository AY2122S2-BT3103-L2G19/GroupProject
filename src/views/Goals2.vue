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
  <h2>Saving Goals</h2>
  <NavbarSavingGoals @model-show="modelToggle2" />
  <ModelSavingGoals
    @model-toggle="modelToggle2"
    :status="modelStatus2"
    @added="change2"
  />
  <saving-goals :key="refreshComp2" />
  <saving-goals-chart />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from "../components/SpendingGoals2.vue";
import NavbarSpendingGoals from "../components/NavbarSpendingGoals.vue";
import ModelSpendingGoals from "../components/ModelSpendingGoals.vue";
import NavbarSavingGoals from "../components/NavbarSavingGoals.vue";
import ModelSavingGoals from "../components/ModelSavingGoals.vue";
import SavingGoals from '../components/SavingGoals.vue';
import SavingGoalsChart from '../components/SavingGoalsChart.vue';

export default {
  name: "Goals2",
  components: {
    SpendingGoals2,
    NavbarSpendingGoals,
    ModelSpendingGoals,
    NavbarSavingGoals,
    ModelSavingGoals,
    SavingGoals,
    SavingGoalsChart,
  },
  data() {
    return {
      refreshComp: 0,
      refreshComp2: 0,
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
      this.refreshComp2 += 1;
      this.modelStatus2 = false;
    },
  },
};
</script>

<style></style>
