<template>
  <div class="profile">
    <div v-if="user">
      <img :alt="user.name + 'avatar'" :src="user.avatar_url">
      <h4>Username
        <a :href="'//' + user.html_url" target="_blank" rel="noopener noreferrer">
          {{ user.login }}
        </a>
      </h4>
      <p>Repos</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',

  components: {
  },

  data() {
    return {
      user: null,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      // is there a user
      if (this.$route.params.userID) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/user/${this.$route.params.userID}`);
        xhr.onload = () => {
          this.user = JSON.parse(xhr.responseText);
          console.log(this.user);
        };
        xhr.send();
      }
    },
  },
};

</script>

<style lang="scss" scoped>

  img {
    max-width: 100%;
    height: 115px;
    border-radius: 4px;
  }

</style>
