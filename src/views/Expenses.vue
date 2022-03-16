<template>
    <h1>Hello from Expenses</h1>
    <ExpensesInput/>
</template>

<script>
import ExpensesInput from '../components/ExpensesInput.vue'
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  name: "Expenses",
  components: { ExpensesInput },
  data() {
    return {
        user:false,
    }
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
}

</script>

<style>

</style>