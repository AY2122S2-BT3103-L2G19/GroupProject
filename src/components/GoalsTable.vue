<template>
  <div id="app">
    <v-grid
      v-if="grid === 1"
      key="1"
      theme="compact"
      :source="rows"
      :columns="columns"
    ></v-grid>
  </div>
</template>

<script>
export default {};
</script>
import VGrid from "@revolist/vue-datagrid"; export default { name: "App", data()
{ return { columns: [{ prop: "name", name: "First", }, { prop: "details", name:
"Second", }], rows: [{ name: "1", details: "Item 1", }] }; }, components: {
VGrid, }, };
<style></style>
