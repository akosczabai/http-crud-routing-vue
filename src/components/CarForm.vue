<template>
  <form class="shadow p-3" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label">Brand</label>
      <input
        id="brand"
        type="text"
        class="form-control mb-2"
        v-model="v$.brand.$model"
      />
      <span
        v-if="v$.brand.$errors"
        v-for="error of v$.brand.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Model</label>
      <input
        id="model"
        type="text"
        class="form-control mb-2"
        v-model="v$.model.$model"
      />
      <span
        v-if="v$.model.$errors"
        v-for="error of v$.model.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Year</label>
      <input
        id="year"
        type="number"
        class="form-control mb-2"
        v-model="v$.year.$model"
      />
      <span
        v-if="v$.year.$errors"
        v-for="error of v$.year.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Country</label>
      <input
        id="country"
        type="text"
        class="form-control mb-2"
        v-model="v$.country.$model"
      />
      <span
        v-if="v$.country.$errors"
        v-for="error of v$.country.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Damage</label>
      <select class="form-control mb-2" v-model="v$.damage.$model">
        <option
          v-for="item in Object.values(Damage).filter(
            (x) => typeof x === 'string'
          )"
          :value="Object.values(Damage).indexOf(item)"
        >
          {{ item }}
        </option>
      </select>
      <span
        v-if="v$.damage.$errors"
        v-for="error of v$.damage.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Color</label>
      <input
        id="Color"
        type="text"
        class="form-control mb-2"
        v-model="v$.color.$model"
      />
      <span
        v-if="v$.color.$errors"
        v-for="error of v$.color.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <button v-if="!props.car" class="btn btn-primary">Create car</button>
    <button v-if="props.car" class="btn btn-primary">Update Car</button>
  </form>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import Car, { Damage } from "../models/Car";
import { required, maxLength, minValue, maxValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const props = defineProps({
  car: Object as PropType<Car>,
});

console.log("props:", props);

const emits = defineEmits<{
  change: [car: Car];
}>();

let fields = ref({
  brand: "",
  model: "",
  year: "",
  country: "",
  damage: 0,
  color: "",
});

if (props.car) {
  fields = ref({
    brand: props.car.brand,
    model: props.car.model,
    year: props.car.year.toString(),
    country: props.car.country,
    damage: props.car.damage,
    color: props.car.color,
  });
}

const rules = {
  brand: {
    required,
    maxLength: maxLength(30),
  },
  model: {
    required,
  },
  year: {
    required,
    minValue: minValue(1500),
    maxValue: maxValue(2023),
  },
  country: {
    required,
  },
  damage: {
    required,
  },
  color: {
    required,
  },
};

const v$ = useVuelidate(rules, fields);

async function submit() {
  const isValid = await v$.value.$validate();

  if (isValid) {
    const newCar = ref<Car>({
      brand: v$.value.brand.$model,
      model: v$.value.model.$model,
      year: parseInt(v$.value.year.$model),
      country: v$.value.country.$model,
      damage: v$.value.damage.$model,
      color: v$.value.color.$model,
    });

    emits("change", newCar.value);
  }
}
</script>

<style scoped></style>
