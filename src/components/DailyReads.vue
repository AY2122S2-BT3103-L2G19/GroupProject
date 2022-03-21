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
  /*mounted() {
    //this.initAritcle()
  },
  data() {
    return {links : [
        "https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/",
        "https://www.google.com.sg",
      ]};
  },*/
  methods: {
    currentDateText() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return String(date) + ": Daily Article"
    },

    //initArticle() {
      
      /* Set a date in the future:
      var start = new Date("March 14, 2021 00:00:00 GMT"),    
      today = new Date(),
      days  = Math.ceil((start.getTime()-today.getTime())/1000/60/60/24); 
      var currArticle = document.getElementById("a");
      currArticle.href = links[days%links.length];
      var currFrame = document.getElementById("currFrame")
      currFrame.src = links[days%links.length];
      
    }
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
