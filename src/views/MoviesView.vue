<script setup lang="ts">
import { ref } from "vue";
import Movie from "../models/Movie";
import router from "../router";
import axios from "axios";

let movies = ref<Movie[]>([]);

movies.value = await loadMovies();

async function loadMovies() {
  const { data } = await axios.get("http://localhost:3000/movies");
  return data;
}

function confirmDelete(id: number) {
  if (confirm(`Biztos törölni szeretnéd?`)) {
    movieDelete(id);
  } else {
    console.log("Cancelled");
  }
}

async function movieDelete(id: number) {
  await axios.delete(`http://localhost:3000/movies/${id}`);
  movies.value = await loadMovies();
}

function editMovie(id: number) {
  router.push({ path: `/edit-movie/${id}` });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top">
    <div class="col-8 text-center pt-4">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genres</th>
            <th>Release Date</th>
            <th>Description</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies">
            <td>{{ movie.title }}</td>
            <td>{{ movie.genres }}</td>
            <td>{{ movie.releaseDate }}</td>
            <td>{{ movie.description }}</td>
            <td>{{ movie.country }}</td>

            <td>
              <button
                class="btn btn-success me-2"
                @click="editMovie(movie.id!)"
              >
                Update
              </button>
              <button @click="confirmDelete(movie.id!)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
