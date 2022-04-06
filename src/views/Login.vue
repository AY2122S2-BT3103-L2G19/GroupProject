<template>
  <div class="flex md6 lg4" style="margin: auto">
  <va-card color="#c2c2c2" class="flex">

  <va-card-title class="justify-center">Login</va-card-title>
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
    <va-button class="mb-2" type="submit" @click.prevent="submitLogin()"> Login </va-button> 
    <!-- <va-button @click.prevent="() => this.$router.push('/register')">
      Register
    </va-button> -->
    <p>Don't have an account? <a @click.prevent="() => this.$router.push('/register')" style="color:blue; cursor: pointer">Register here! </a></p>
  </form>
  <br />
  </va-vard-content>
  </va-card>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
// import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const db = getFirestore(firebaseApp);
console.log(db);

export default {
  name: "Login",
  data() {
    return {
      email: "meow@poop.com",
      password: "iwanttodie",
      user: null,
      
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user.email);
        this.$router.push("/");
      }
    });
  },
  methods: {
    submitLogin: function () {
      const auth = getAuth();
      console.log(this.email, this.password, auth);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          this.$router.push("/");
        })
        .catch((error) => alert(error));
    },
  },
};
</script>

<style></style>
