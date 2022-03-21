<template>
  <div class="article">
    <h1 class="title">{{currentDateText()}}</h1>
    <h2 class="content"> 
      <iframe src="https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/" width="870" height="160" style="border: none;" name="myFrame"></iframe>
      <p><a href="https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/" target="myFrame">Open Article!</a></p>
    </h2>
  </div>
</template>

<script>
export default {
  methods: {
    currentDateText() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return String(date) + ": Daily Article"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
