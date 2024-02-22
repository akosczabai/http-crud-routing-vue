import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CarView from "../views/CarView.vue";
import NewCarView from "../views/NewCarView.vue";
import EditCarView from "../views/EditCarView.vue";
import MoviesView from "../views/MoviesView.vue";
import NewMovieView from "../views/NewMovieView.vue";
import EditMovieView from "../views/EditMovieView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/cars", component: CarView, name: "cars" },
  { path: "/new-car", component: NewCarView, name: "new-car" },
  { path: "/edit-car/:id", component: EditCarView, name: "edit-car" },
  { path: "/movies", component: MoviesView, name: "movies" },
  { path: "/new-movie", component: NewMovieView, name: "new-movie" },
  { path: "/edit-movie/:id", component: EditMovieView, name: "edit-movie" },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
