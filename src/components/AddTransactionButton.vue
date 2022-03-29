<template>
  <button @click="redirectToAddTrans()" class="button addtrans">Add Transaction</button>
</template>

<script>

export default {
  name: "#AddTransactionButton",
  methods: {
    redirectToAddTrans() {
      this.$router.push({ path: '/expenses' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button {
  background-color: #4CAF50; /* Green */
  border: 2px solid black;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 35px;
  margin: 4px 2px;
  cursor: pointer;
  padding: 40px 75px;
  border-radius: 12px;
}
</style>