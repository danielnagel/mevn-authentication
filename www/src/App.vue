<template>
  <div>
    <Navigation />
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

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
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
