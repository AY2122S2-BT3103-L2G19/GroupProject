<template>
    <h1>Hello from EditTransaction</h1>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
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