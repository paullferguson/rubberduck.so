<template>
  <div class="home">
    <img alt="duck logo" src="../assets/logo.png">
    <h4>Login with Github and get handy documentation for your project.</h4>
    <a class="btn" href="/auth/github">Login With Github</a>
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

  .btn {
    text-decoration: none;
    border-radius: 4px;
    border: solid 1px black;
    padding: 8px 32px;
    font-size: 18px;
    color: black;
    display: inline-block;
    line-height: 2;
    font-weight: bold;
    transition: all 250ms ease;

    &:hover {
      background-color: rgb(253, 213, 193);
    }
  }

</style>
