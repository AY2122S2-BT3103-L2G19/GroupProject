import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Expenses from "@/views/Expenses.vue";
import AddTransaction from "@/views/AddTransaction.vue";
import Goals2 from "@/views/Goals2.vue";
import EditTransaction from "@/views/EditTransaction.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses,
  },
  {
    path: "/add",
    name: "AddTransaction",
    component: AddTransaction,
  },
  {
    path: "/goals",
    name: "Goals2",
    component: Goals2,
  },
  {
    path: "/edit",
    name: "EditTransaction",
    component: EditTransaction,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
