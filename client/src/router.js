import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/news",
      name: "news",
      component: () => import("./components/NewsList")
    },
    {
      path: "/news/:id_berita",
      name: "news-details",
      component: () => import("./components/News")
    },
    {
      path: "/news/add",
      name: "add",
      component: () => import("./components/AddNews")
    }
  ]
});