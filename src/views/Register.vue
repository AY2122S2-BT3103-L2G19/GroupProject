<template>
    <h1>Hello from Register</h1>
    <form>
        <label for="email">Email: </label>
        <input id="email" type="text" v-model="email"/> <br><br>
        <label for="password">Password: </label>
        <input id="password" type="password" v-model="password"/> <br><br>
        <button type="submit" @click.prevent="submitLogin()"> Submit </button>
        <button @click.prevent="()=>this.$router.push('/login')"> Login </button>
    </form>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

export default {
 name:"Login",
 data() {
     return {
         email:"meow@poop.com",
         password:"iwanttodie",
         user:null,
     }
 },
mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            console.log(user.email)
            this.$router.push("/")
        }
    })
},
 methods:{
     submitLogin: function() {
         const auth = getAuth();
         console.log(this.email,this.password,auth);
         createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                this.$router.push("/")
            })
            .catch((error) => alert(error));
     }
}
}
</script>

<style>

</style>