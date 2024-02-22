<template>
  <div class="text-center mb-3" v-if="props.friend">
    <h2>{{ props.friend.name }}</h2>
    <h5>{{ friendIsFavorite ? "(Favorite)" : "" }}</h5>

    <button class="btn btn-danger mt-1" @click="toggleDetails()">
      {{ showDetails ? "Hide details" : "Show details" }}
    </button>
    <button class="btn btn-danger mt-1" @click="toggleFavorite()">
      {{ friendIsFavorite ? "Unmark as favorite" : "Mark as favorite" }}
    </button>
    <button class="btn btn-danger mt-1" @click="remove(props.friend.id)">
      Remove
    </button>

    <ul v-if="showDetails" class="list-group list-group-flush mt-4">
      <li class="list-group-item">Phone: {{ props.friend.phone }}</li>
      <li class="list-group-item">Email: {{ props.friend.email }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  isFavorite: boolean;
}

const props = defineProps({
  friend: Object as PropType<Contact>,
});

const emits = defineEmits<{
  remove: [id: string];
}>();

let showDetails = ref<boolean>(true);
const friendIsFavorite = ref<boolean>(props.friend!.isFavorite);

function toggleDetails() {
  showDetails.value = !showDetails.value;
}

function toggleFavorite() {
  friendIsFavorite.value = !friendIsFavorite.value;
}

function remove(id: string) {
  emits("remove", id);
}
</script>

<style scoped></style>
