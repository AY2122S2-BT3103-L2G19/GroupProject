<template>
  <div v-if="status">
    <div class="model" @click.self="toggle">
      <div class="model__container">
        <div class="model__form">
          <form @submit.prevent="AddSpendingGoals">
            <div class="model__group">
              <h3>Add Spending Goals</h3>
            </div>
            <div class="model__group">
              <label for="category">Category: </label>

              <select @change="selectCategory($event)" id="category">
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Groceries">Groceries</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div class="model__group">
              <input
                type="number"
                class="model__control"
                placeholder="Target"
                v-model="number"
              />
            </div>
            <div class="model__group">
              <input type="submit" value="Add Spending Goals" class="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "ModelSpendingGoals",
  props: ["status"],
  data() {
    return {
      title: "Food & Drink",
      number: null,
      fbuser: "",
    };
  },
  mounted() {
    const auth = getAuth();
    // this.fbuser = auth.currentUser.email;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    toggle() {
      this.$emit("model-toggle");
    },

    async AddSpendingGoals() {
      const auth = getAuth();
      console.log(auth, " auth from Add spending goals");
      this.fbuser = auth.currentUser.email;
      console.log(this.fbuser, " fbuser from Add spending goals");
      await setDoc(
        doc(db, String(this.fbuser), "Spending Goals", "Goals", this.title),
        {
          Category: this.title,
          Goals: this.number,
        }
      );
      this.$emit("added");
      window.location.reload();
      this.title = "Food & Drink";
      this.number = "";
    },

    selectCategory(event) {
      this.title = event.target.value;
    },
  },
};
</script>

<style scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.model__container {
  background: #fff;
  width: 450px;
  padding: 20px;
  border-radius: 5px;
}
.model__group {
  margin: 15px 0;
}
.model__control {
  border-bottom: 1px solid silver;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  padding: 7px 0;
  outline: none;
}
.button {
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #84bddf;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  outline: none;
}
</style>
