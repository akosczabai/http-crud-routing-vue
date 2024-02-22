<script setup lang="ts">
import MovieForm from "../components/MovieForm.vue";
import Movie from "../models/Movie";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const movieId = parseInt(router.currentRoute.value.params.id as string);
const response = await axios.get("http://localhost:3000/movies/" + movieId);
const movie = response.data;

function updateMovie(movie: Movie) {
  axios.patch("http://localhost:3000/movies/" + movieId, movie).then(() => {
    router.push({ name: "movies" });
  });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top mb-4">
    <div class="col-6 pt-4">
      <MovieForm :movie="movie" @change="updateMovie" />
    </div>
  </div>
</template>
