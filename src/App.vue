<script setup lang="ts"></script>

<template>
  <Suspense>
    <div class="container-fluid min-vh-100 d-flex flex-column">
      <div class="row flex-grow-2">
        <div class="col-12 p-0">
          <nav class="navbar navbar-expand-lg gray-color white-font">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Ákos</a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="navbar-nav white-font">
                  <router-link to="/" class="nav-link">Home</router-link>
                  <router-link to="/cars" class="nav-link">Cars</router-link>
                  <router-link to="/new-car" class="nav-link"
                    >New Car</router-link
                  >
                  <router-link to="/movies" class="nav-link"
                    >Movies</router-link
                  >
                  <router-link to="/new-movie" class="nav-link"
                    >New Movie</router-link
                  >
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <router-view></router-view>
      <div class="row flex-grow-2 gray-color white-font">
        <div class="col-12 text-center pt-3 pb-3">2023 Progmasters</div>
      </div>
    </div>
  </Suspense>
</template>

<style scoped></style>
