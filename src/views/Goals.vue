<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <button>Add Spending Goals</button>
  <add-spending-goalsbtn />
  <SpendingGoals />
  <h2>Saving Goals</h2>
  <button>Add Saving Goals</button>
  <SpendingGoals />
</template>

<script>
import SpendingGoals from "../components/SpendingGoals.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddSpendingGoalsbtn from '../components/AddSpendingGoalsbtn.vue';

export default {
  name: "Goals",
  components: { SpendingGoals, AddSpendingGoalsbtn },
  data() {
    return {
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
};
</script>

<style></style>
