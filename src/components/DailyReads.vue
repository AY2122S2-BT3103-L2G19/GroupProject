<template>
  <div class="article">
    <h2 class="content"> 
      <iframe id="iframe" v-bind:src="article" width=100% height="600" name="myFrame"></iframe>
      <va-button color="cadetblue" icon="open_in_new" v-bind:href="article" target="_blank">Open your {{currentDateText()}}</va-button>
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
  mounted() {
    this.dailyArticleRotate();
  },
  data() {
    return {
      articles:["https://dollarsandsense.sg/4-reasons-financial-literacy-important-young-singaporeans/",
                "https://dollarsandsense.sg/financial-planning-101-for-parents-of-children-with-added-needs-in-singapore/",
                "https://dollarsandsense.sg/the-pros-and-cons-of-selling-your-endowment-plan-in-singapore/"],
      article: ""
    }
  },
  methods: {
    currentDateText() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return String(date) + ": Daily Article"
    },
    dailyArticleRotate() {
      const current = new Date();
      const currentDate = current.getDate();
      const articleNumber = currentDate % 2;
      this.article = this.articles[articleNumber]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
#iframe{
  border:2px;
  border-color:darkgray;
}*/
va-button{
  margin: 4px;
  padding: 0px 6px 0px 6px;
}
</style>
