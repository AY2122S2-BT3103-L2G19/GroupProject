<template>
    <h1>Hello from Goals</h1>
    <h2>Spending Goals</h2>
    <SpendingGoals />

    <h2>Saving Goals 2.0</h2>
    <SpendingGoals />
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