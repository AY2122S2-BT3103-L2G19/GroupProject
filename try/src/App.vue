<template>
  <div id="app">
    <h1>Hello</h1>
    <v-grid theme="compact" :source="rows" :columns="columns"></v-grid>
  </div>
</template>

<script>
import VGrid from "@revolist/vue-datagrid";
export default {
  name: "App",
  data() {
    return {
      columns: [
        {
          prop: "name",
          name: "First",
        },
        {
          prop: "details",
          name: "Second",
        },
      ],
      rows: [
        {
          name: "1",
          details: "Item 1",
        },
        {
          name: "2",
          details: "Item 2",
        },
      ],
    };
  },
  components: {
    VGrid,
  },
};
</script>

<style>
#app {
  height: 400px;
  width: 500px;
}
revo-grid {
  height: 50%;
}
</style>
