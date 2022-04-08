<template>
<br> <br> <br> <br>
<div id="form-head" class="title">Any Issues? Please let us know below!</div>
<br> <br> <br>
<div style="width:700px;" id="form">
  <va-input
      class="mb-4"
      v-model="username"
      label="Name/Email"
      placeholder="Optional"
    />
  <va-input
      class="mb-4"
      v-model="content"
      type="textarea"
      label="Enter feedback here"
      placeholder=""
      :min-rows="15"
      :max-rows="50"
    />
</div>

<va-button size="large" class="mr-2" space-between-items @click="submitFeedback()">
      <va-icon size="large" name="gavel" />
      Submit
      <va-icon size="large" name="shield" />
    </va-button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
export default {
  name: "About",
  components: {
  },
  data() {
    return {
      username:"",
      content: "",
      fbuser:"",
      }
  },
  methods: {
    async submitFeedback() {
      if (this.content.trim() == "") {
        alert("Please enter your feedback");
        return
      }
      if (this.username == "") {
        this.username = "Anonymous User";
      }
      await setDoc(
        doc(db, "Feedback", String(this.fbuser)),
        {
          content: this.content,
          user: this.username,
        })
      alert("Feedback succesfully submitted! Thanks for your time.")
      this.username = "";
      this.content = "";
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.fbuser = user.email;
            console.log(user.email)
        } else {
          this.$router.push("/login")
        }
    })
  }
}
</script>

<style>
#form-head {
  margin-top: 40px;
  font-size:35px;
  text-align: center;
}

#form {
  align-items: center;
  margin: 0 auto;
}
</style>

<style scoped>
</style>
