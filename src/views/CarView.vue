<script setup lang="ts">
import { ref } from "vue";
import Car from "../models/Car";
import { Damage } from "../models/Car";
import router from "../router";
import axios from "axios";

let cars = ref<Car[]>([]);

cars.value = await loadCars();

async function loadCars() {
  const { data } = await axios.get("http://localhost:3000/cars");
  return data;
}

function confirmDelete(id: number) {
  if (confirm(`Biztos törölni szeretnéd?`)) {
    carDelete(id);
  } else {
    console.log("Cancelled");
  }
}

async function carDelete(id: number) {
  await axios.delete(`http://localhost:3000/cars/${id}`);
  cars.value = await loadCars();
}

function editCar(id: number) {
  router.push({ path: `/edit-car/${id}` });
}
</script>

<template>
  <div class="row flex-grow-1 justify-content-center align-items-top">
    <div class="col-8 text-center pt-4">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Country</th>
            <th>Color</th>
            <th>Damage</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars">
            <td>{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.country }}</td>
            <td>{{ car.color }}</td>
            <td>{{ Object.values(Damage)[car.damage] }}</td>
            <td>
              <button class="btn btn-success me-2" @click="editCar(car.id!)">
                Update
              </button>
              <button @click="confirmDelete(car.id!)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
