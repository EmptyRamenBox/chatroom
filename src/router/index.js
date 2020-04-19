import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Room from "../views/Room.vue";
import store from "../store"; // Authentication #1

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    // this means the rooms will be dynamic
    path: "/room/:id",
    name: "Room",
    component: Room,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Authentication #1
// If we go a page that is not a login page,
// we will always be redirected to here.
//
//  I cannot go to the home page until I am authenticated
router.beforeEach((to, from, next) => {
  to.name === "Login" || store.getters.getUser ? next() : next("/login");
});

export default router;
