<template>
    <v-btn :rounded="false" elevation="0" small>delete</v-btn>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: ["rowIndex", "prop"],
});

// export default {
//     name: "DeleteBtn"
// }
</script>


<style>

</style>