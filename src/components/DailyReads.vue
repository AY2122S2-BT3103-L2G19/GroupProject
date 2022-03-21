<template>
  <div class="article">
    <h1 class="title">{{currentDateText()}}</h1>
    <h2 class="content"> 
      <iframe id="iframe" v-bind:src="data" width="870" height="160" style="border: none;" name="myFrame"></iframe>
      <a v-bind:href="data" target="_blank">Open Article!</a>
    </h2>
  </div>
</template>

<script>

function is_iframeable(weblink) {
  try {
    var req = new XMLHttpRequest();
    req.open('GET', weblink, false);
    req.send(null);
    var option = req.getResponseHeader("x-frame-options")
    if (option == "DENY" || option == "SAMEORIGIN") {
      return false
    } else {
      return true
    }
  } catch (e) {
    return false
  }
}

console.log(is_iframeable("https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/"));

export default {
  data() {
    return {
      data:"https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/"
    }
  },
  methods: {
    currentDateText() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return String(date) + ": Daily Article"
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
