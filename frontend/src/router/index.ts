import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "主页"
    }
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Registration.vue"),
    meta: {
      title: "注册"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/404",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/NotFound.vue"),
    meta: {
      title: "404"
    }
  },
  {
    path: "/*",
    redirect: { name: "notFound" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
