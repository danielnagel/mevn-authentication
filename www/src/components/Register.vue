<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <fieldset>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            required
            v-model="username"
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            aria-describedby="nameHelp"
          />
          <small
            id="usernameHelp"
            class="form-text text-muted"
          >Your username will be displayed in the blog posts.</small>
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            required
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            aria-describedby="emailHelp"
          />
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
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
        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <input
            required
            v-model="password_confirmation"
            type="password"
            class="form-control"
            id="password_confirmation"
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
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    register() {
      const { username, email, password } = this;
      this.$store
        .dispatch('register', { username, email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.error(err));
    },
  },
};
</script>
