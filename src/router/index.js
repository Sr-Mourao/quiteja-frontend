import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/home.vue";

Vue.use(VueRouter);

const UsersView = () => import("../views/users.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
