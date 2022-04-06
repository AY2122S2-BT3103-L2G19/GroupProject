<template>
  <div class="flex md6 lg4" style="  margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
  <va-card color="#c2c2c2" class="card">

  <va-card-title class="" style="font-size: 20px">Register</va-card-title>
  <va-vard-content>
  <form>
    <va-input
      class="ml-4 mb-4 mr-4"
      v-model="email"
      label="E-mail"
      placeholder="example@gmail.com"
    />
    <va-input
      class="ml-4 mb-4 mr-4"
      type = "password"
      v-model="password"
      label="Password"
      placeholder="Password"
    />
    <va-input
      class="ml-4 mb-4 mr-4"
      type = "password"
      v-model="password2"
      label="Re-enter Password"
      placeholder="Password"
    />
    <va-button class="mb-2" type="submit" @click.prevent="submitLogin()"> Register </va-button> 
    <p>Already have an account? <a @click.prevent="() => this.$router.push('/login')" style="color:blue; cursor: pointer">Login here! </a></p>
  </form>
  <br />
  </va-vard-content>
  </va-card>
  </div>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

export default {
 name:"Login",
 data() {
     return {
         email:"meow@poop.com",
         password:"iwanttodie",
         password2:"iwanttodie",
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
         if (this.password != this.password2) {
             alert("Passwords entered are not the same!")
             return
         }
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
.card {
    width:600px;
    border-radius: 10px;
}
</style>