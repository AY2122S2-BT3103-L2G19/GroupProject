<template>
  <div v-if="status">
    <div class="model" @click.self="toggle">
      <div class="model__container">
        <div class="model__form">
          <form @submit.prevent="AddSavingGoals">
            <div class="model__group">
              <h3>Edit Spending Goals</h3>
            </div>
            <div class="model__group">
              <label for="category">Category: </label>

              <select @change="selectCategory($event)" id="category">
                <option value="Short-term Goal">
                  Short-term Goal (less than 1 year)
                </option>
                <option value="Mid-term Goal">
                  Mid-term Goal (1 - 3 years)
                </option>
                <option value="Long-term Goal">
                  Long-term Goal (> 3 years)
                </option>
              </select>
            </div>
            <div class="model__group">
              <label for="date">Desired Start Date: </label>
              <input
                type="date"
                class="model__control"
                placeholder="Start Date"
                v-model="date"
                id="date"
              />
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
              <input
                type="submit"
                value="Add / Edit Saving Goals"
                class="button"
              />
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "ModelSavingGoals",
  props: ["status"],
  data() {
    return {
      title: "Short-term Goal",
      number: null,
      date: "",
      fbuser: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        console.log(currUser.email, " is current user id");
        const userEmail = currUser.email;
        this.user = userEmail;
      } else {
        console.log(currUser, "user not found....");
      }
    });
  },

  methods: {
    toggle() {
      this.$emit("model-toggle");
    },

    async AddSavingGoals() {
      const auth = getAuth();
      this.fbuser = auth.currentUser.email;
      var date2 = "";
      date2 =
        this.date.slice(8, 10) +
        "/" +
        this.date.slice(5, 7) +
        "/" +
        this.date.slice(0, 4);
      this.date = date2;
      await setDoc(
        doc(db, String(this.fbuser), "Saving Goals", "Goals", this.title),
        {
          Category: this.title,
          StartDate: this.date,
          Goals: this.number,
        }
      );
      this.$emit("added");
      window.location.reload();
      this.title = "Short-term Goal";
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
