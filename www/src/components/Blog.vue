<template>
  <div>
    <form @submit.prevent="addMessage" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          v-model="message.message"
          class="form-control"
          id="message"
          rows="3" required></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          v-model="message.imageUrl"
          type="url"
          class="form-control"
          id="imageUrl"
          placeholder="Enter URL to an image">
      </div>
      <button type="submit" class="btn btn-primary">Add Message</button>
    </form>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageUrl" class="mr-3" :src="message.imageUrl" :alt="message.subject" />
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr />
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/messages';

export default {
  data: () => ({
    error: '',
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageUrl: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then((result) => {
        this.messages = result;
        this.message.username = this.$store.getters.username;
        console.log(this.$store.getters.username);
      });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json())
        .then((result) => {
          if (result.details) {
            const error = result.details.map(detail => detail.message).join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.messages.push(result);
            this.message.subject = '';
            this.message.message = '';
            this.message.imageUrl = '';
          }
        });
    },
  },
};
</script>

<style>
img {
  max-width: 150px;
  height: auto;
}
@media only screen and (min-width: 768px) {
  img {
     max-width: 300px;
  }
}
</style>
