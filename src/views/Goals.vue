<template>
  <NavbarSpendingGoals @model-show="modelToggle" />
  <ModelSpendingGoals
    @model-toggle="modelToggle"
    :status="modelStatus"
    @added="change"
  />
  <SpendingGoals2 :key="refreshComp" />
  <NavbarSavingGoals @model-show="modelToggle2" />
  <ModelSavingGoals
    @model-toggle="modelToggle2"
    :status="modelStatus2"
    @added="change2"
  />
  <saving-goals :key="refreshComp2" />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SpendingGoals2 from "../components/SpendingGoals2.vue";
import NavbarSpendingGoals from "../components/NavbarSpendingGoals.vue";
import ModelSpendingGoals from "../components/ModelSpendingGoals.vue";
import NavbarSavingGoals from "../components/NavbarSavingGoals.vue";
import ModelSavingGoals from "../components/ModelSavingGoals.vue";
import SavingGoals from '../components/SavingGoals.vue';

export default {
  name: "Goals2",
  components: {
    SpendingGoals2,
    NavbarSpendingGoals,
    ModelSpendingGoals,
    NavbarSavingGoals,
    ModelSavingGoals,
    SavingGoals,
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
      } else {
        this.$router.push("/login")
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

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th,td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.va-table-responsive {
    overflow: auto;
  }
  </style>
