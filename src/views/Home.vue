<template>
  <div class="home">
    <img alt="duck logo" src="../assets/logo.png">
    <h4>Login with Github and get handy documentation for your project.</h4>
    <a class="btn btn--big" href="/auth/github">Login With Github</a>
  </div>
</template>

<script>

export default {
  name: 'Home',

  components: {
    // LandingPage,
  },

  created() {
    this.checkUserData();
  },

  methods: {
    checkUserData() {
      // is there a user
      if (this.$route.query.user) {
        // Returning data hack from Express. If user redirect to /user
        this.$router.push(`profile/${this.$route.query.user}`);
      }
    },
  },
};

</script>

<style lang="scss" scoped>

  h4 {
    padding: 16px;
  }

</style>
