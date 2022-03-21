<template>
  <Navbar @model-show="modelToggle" />
  <Model
    @model-toggle="modelToggle"
    :status="modelStatus"
    @store-expence="storeExpence"
  />
  <Expences :allExpences="expences" />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Model from "../components/Model.vue";
import Expences from "../components/Expences.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";


export default {
  name: "App",
  components: {
    Navbar,
    Model,
    Expences,
  },
  data() {
    return {
      modelStatus: false,
      expences: {
        balance: 0,
        income: 0,
        expence: 0,
        history: [],
      },
      user:false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            console.log(user.email)
        } else {
          this.$router.push("/login")
        }
    })
},
  methods: {
    modelToggle() {
      this.modelStatus = !this.modelStatus;
    },
    storeExpence(payload) {
      console.log(payload, " payload")
      console.log(this.expences, " this expence")
      const number = parseInt(payload.number);
      if (number > 1) {
        this.expences = {
          ...this.expences,
          income: this.expences.income + number,
          balance: this.expences.balance + number,
          history: [{ title: payload.title, number }, ...this.expences.history],
        };
      } else if (number < 1) {
        this.expences = {
          ...this.expences,
          expence: this.expences.expence + number,
          balance: this.expences.balance + number,
          history: [{ title: payload.title, number }, ...this.expences.history],
        };
      }
      this.modelStatus = false;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #fafafa;
  font-family: sans-serif;
}
</style>
