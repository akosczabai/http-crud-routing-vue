<template>
  <form class="shadow p-3" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input
        id="title"
        type="text"
        class="form-control mb-2"
        v-model="v$.title.$model"
      />
      <span
        v-if="v$.title.$errors"
        v-for="error of v$.title.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Genres</label>
      <input
        id="genres"
        type="text"
        class="form-control mb-2"
        v-model="v$.genres.$model"
      />
      <span
        v-if="v$.genres.$errors"
        v-for="error of v$.genres.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Release Date</label>
      <input
        id="releaseDate"
        type="text"
        class="form-control mb-2"
        v-model="v$.releaseDate.$model"
      />
      <span
        v-if="v$.releaseDate.$errors"
        v-for="error of v$.releaseDate.$errors"
        :key="error.$uid"
        class="text-danger"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <input
        id="description"
        type="text"
        class="form-control mb-2"
        v-model="v$.description.$model"
      />
      <span
        v-if="v$.description.$errors"
        v-for="error of v$.description.$errors"
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
    <button v-if="!props.movie" class="btn btn-primary">Create movie</button>
    <button v-if="props.movie" class="btn btn-primary">Update Movie</button>
  </form>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import Movie from "../models/Movie";
import { required, maxLength, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const props = defineProps({
  movie: Object as PropType<Movie>,
});

console.log("props:", props);

const emits = defineEmits<{
  change: [movie: Movie];
}>();

let fields = ref({
  title: "",
  genres: "",
  releaseDate: "",
  description: "",
  country: "",
});

if (props.movie) {
  fields = ref({
    title: props.movie.title,
    genres: props.movie.genres,
    releaseDate: props.movie.releaseDate,
    description: props.movie.description,
    country: props.movie.country,
  });
}

const rules = {
  title: {
    required,
    maxLength: maxLength(50),
  },
  genres: {
    required,
    minValue: minLength(2),
    maxLength: maxLength(50),
  },
  releaseDate: {
    required,
  },
  description: {
    required,
    minValue: minLength(10),
    maxLength: maxLength(150),
  },
  country: {
    required,
    minValue: minLength(2),
    maxLength: maxLength(50),
  },
};

const v$ = useVuelidate(rules, fields);

async function submit() {
  const isValid = await v$.value.$validate();

  if (isValid) {
    const newMovie = ref<Movie>({
      title: v$.value.title.$model,
      genres: v$.value.genres.$model,
      releaseDate: v$.value.releaseDate.$model,
      description: v$.value.description.$model,
      country: v$.value.country.$model,
    });

    emits("change", newMovie.value);
  }
}
</script>

<style scoped></style>
