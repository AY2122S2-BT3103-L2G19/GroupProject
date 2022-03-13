<template>
  <h1>Hello from Goals</h1>
  <h2>Spending Goals</h2>
  <button>Add Spending Goals</button>
  <SpendingGoals />
  <h2>Saving Goals</h2>
  <button>Add Saving Goals</button>

  <SpendingGoals />
</template>

<script>
import SpendingGoals from "../components/SpendingGoals.vue";
export default {
  name: "Goals",
  components: { SpendingGoals },
};
</script>

<style></style>
