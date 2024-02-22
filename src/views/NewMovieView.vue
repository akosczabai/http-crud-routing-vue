<script setup lang="ts">
import MovieForm from "../components/MovieForm.vue";
import Movie from "../models/Movie";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

function addNewMovie(movie: Movie) {
  axios.post("http://localhost:3000/movies", movie).then(() => {
    router.push({ name: "movies" });
  });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top mb-4">
    <div class="col-6 pt-4">
      <MovieForm @change="addNewMovie" />
    </div>
  </div>
</template>
