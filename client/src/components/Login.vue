<template>
  <div>
    <h1>Sign in</h1>
    <div class="alert alert-danger alert-dismissible" v-if="isError">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">&times;</button>
      Your username or password is incorrect!
    </div>
    <form @submit.prevent="login">
      <fieldset>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            required
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            required
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            unchanged="false"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isError: false,
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$store
        .dispatch('login', { email, password })
        .then(() => {
          this.isError = false;
          this.$router.push('/');
        })
        .catch(() => {
          if (this.$store.getters.authStatus.includes('error')) {
            this.isError = true;
          }
        });
    },
  },
};
</script>
