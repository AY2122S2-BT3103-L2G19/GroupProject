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
import getFirestore from "firebase/firestore"
const db = getFirestore(firebaseApp);


export default {
  name: "ModelSpendingGoals",
  props: ["status"],
  data() {
    return {
      title: "Food & Drink",
      number: null,
    };
  },
  methods: {
    toggle() {
      this.$emit("model-toggle");
    },

    async AddSpendingGoals() {
      // this.$emit("store-Goals", { title: this.title, number: this.number });
      this.$emit("store-expence", { title: this.title, number: this.number });
      await setDoc(doc(db, "user1", "Spending Goals", this.title), {
        Category: this.title,
        Goals: this.number,
      });
      this.title = "Food & Drink";
      this.number = "";
    },

    // addTodo() {
    //   firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .collection("todos")
    //     .add({
    //       title: this.todo.title,
    //       createdAt: new Date(),
    //       isCompleted: false,
    //     });
    // },

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
