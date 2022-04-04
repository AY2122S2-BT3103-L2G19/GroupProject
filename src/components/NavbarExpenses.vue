<template>
  <nav>
    <button class="button" @click="openModel">Add Transaction</button>
  </nav>
</template>

<script>
export default {
  name: "NavbarExpenses",
  methods: {
    openModel() {
      this.$emit("model-show");
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 60px;
  background: rgb(250, 242, 242);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #84bddf;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
