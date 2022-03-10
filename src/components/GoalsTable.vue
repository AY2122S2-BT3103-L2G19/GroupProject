<template>
  <div id="app">
    <v-grid
      theme="compact"
      :source="rows"
      :columns="columns"
    ></v-grid>
  </div>
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
export default {
  name: "GoalsTable",
  data() {
    return {
      columns: [
        {
          name: "Birth",
          prop: "birthdate",
          columnType: "date",
          size: 150,
        },
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
          birthdate: "2022-08-24",
          name: "1",
          details: "Item 1",
        },
        {
          birthdate: "2022-08-24",
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
  height: 700px;
  width: 500px;
}
revo-grid {
  height: 100%;
}
</style>>
