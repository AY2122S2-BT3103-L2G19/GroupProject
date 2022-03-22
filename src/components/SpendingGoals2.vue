<template>
  <table id="spendingGoalsTable">
    <tr>
      <th>S/N</th>
      <th>Category</th>
      <th>Spent ($)</th>
      <th>Goal (Monthly) ($)</th>
      <th>Remaining Budget ($)</th>
      <th>Percentage spent(%)</th>
      <th>Progress</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </table>
</template>

<script>
// import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "SpendingGoals2",
  components: {},

  mounted() {
    const auth = getAuth();
    this.fbuser = auth.currentUser.email; 

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user.email, " email from goals");
      } else {
        this.$router.push("/login");
      }
    });

    console.log(this.fbuser, " this.fbuser")
    async function display(user) {
      user = "user1";
      let doc = await getDocs(
        collection(db, String(user), "Spending Goals", "Goals")
      );
      let ind = 1;
      doc.forEach((docs) => {
        let docData = docs.data();
        var table = document.getElementById("spendingGoalsTable");
        var row = table.insertRow(ind);
        var Category = docData.Category;
        var goal = docData.Goals;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        cell1.innerHTML = ind;
        cell2.innerHTML = Category;
        cell3.innerHTML = 0;
        cell4.innerHTML = goal;
        cell5.innerHTML = 0;
        cell6.innerHTML = 0;
        cell7.innerHTML = 0;
        cell8.innerHTML = 0;

        var editBut = document.createElement("button");

        editBut.className = "Ebwt";
        editBut.id = "editbutton";
        editBut.innerHTML = "Edit";
        editBut.onclick = function () {};
        cell8.appendChild(editBut);

        var delBut = document.createElement("button");
        delBut.className = "bwt";
        delBut.id = String(Category);
        delBut.innerHTML = "Delete";
        delBut.onclick = function () {
          deleteInstrument(Category, String("user1"));
        };
        cell9.appendChild(delBut);
        ind += 1;
      });
    }

    display("user1");

    async function deleteInstrument(category, user) {
      alert("You are going to delete " + category);
      await deleteDoc(
        doc(db, String(user), "Spending Goals", "Goals", category)
      );
      console.log("Document successfully deleted!");
      let tb = document.getElementById("spendingGoalsTable");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      display(user);
    }
  },

  methods: {},
};
</script>

<style></style>
