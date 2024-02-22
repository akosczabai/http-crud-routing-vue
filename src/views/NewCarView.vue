<script setup lang="ts">
import CarForm from "../components/CarForm.vue";
import Car from "../models/Car";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

function addNewCar(car: Car) {
  axios.post("http://localhost:3000/cars", car).then(() => {
    router.push({ name: "cars" });
  });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top mb-4">
    <div class="col-6 pt-4">
      <CarForm @change="addNewCar" />
    </div>
  </div>
</template>
