<template>
    <h1>Hello from Goals</h1>
    <h2>Spending Goals</h2>
    <SpendingGoals />
    <h2>Saving Goals</h2>
    <SpendingGoals />


    <h2>Testing from Goals Page</h2>
    <h2>Testing from Saving Page</h2>
</template>

<script>
import SpendingGoals from '../components/SpendingGoals.vue'
export default {
  name: "Goals",
  components: { SpendingGoals },
}
</script>

<style>

</style>