<template>
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
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/blog">Blog</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <ul v-if="isLoggedIn" class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
        <ul v-else class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link text-success" to="/register">Sign up</router-link>
          </li>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
