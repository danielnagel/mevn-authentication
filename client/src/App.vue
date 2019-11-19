<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">MEVN</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  width: 90%;
  margin: 20px auto;
}
@media only screen and (min-width: 768px) {
  #app {
    width: 50%;
  }
}
</style>
