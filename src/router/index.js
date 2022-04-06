import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Expenses from "@/views/Expenses.vue";
import Goals from "@/views/Goals.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/expenses/:togglePopup",
    name: "Expenses",
    component: Expenses,
    props: true
  },
  {
    path: "/goals",
    name: "Goals",
    component: Goals,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
