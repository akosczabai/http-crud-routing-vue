<script setup lang="ts">
import CarForm from "../components/CarForm.vue";
import Car from "../models/Car";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const carId = parseInt(router.currentRoute.value.params.id as string);
const response = await axios.get("http://localhost:3000/cars/" + carId);
const car = response.data;

function updateCar(car: Car) {
  axios.patch("http://localhost:3000/cars/" + carId, car).then(() => {
    router.push({ name: "cars" });
  });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top mb-4">
    <div class="col-6 pt-4">
      <CarForm :car="car" @change="updateCar" />
    </div>
  </div>
</template>
