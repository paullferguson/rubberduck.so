<template>
  <div v-if="user" class="profile">
    <header>
      <img :alt="user.name + 'avatar'" :src="user.avatar_url">
      <h4>
        <a :href="'://' + user.html_url" target="_blank" rel="noopener noreferrer">
          {{ user.login }}
        </a>
      </h4>
    </header>
    <div class="repos">
      <h1>Repos</h1>
      <ul>
        <li v-for="repo in repos" :key="repo.repo_id">
          <h3>
            <router-link :to="`/repo/${repo.name}`">{{repo.name}}</router-link>
          </h3>
          <p>
            {{repo.description}}
            <a :href="'://' + repo.html_url" target="_blank" rel="noopener noreferrer">View on Github</a>
          </p>
        </li>

      </ul>
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
      repos: null,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      // is there a user
      if (this.$route.params.userID) {
        const xhrUser = new XMLHttpRequest();
        xhrUser.open('GET', `/api/user/${this.$route.params.userID}`);
        xhrUser.onload = () => {
          const userArr = JSON.parse(xhrUser.responseText);
          // eslint-disable-next-line prefer-destructuring
          this.user = userArr[0];
          console.log(this.user);
        };
        xhrUser.send();

        const xhrRepo = new XMLHttpRequest();
        xhrRepo.open('GET', `/api/users/repos/${this.$route.params.userID}`);
        xhrRepo.onload = () => {
          this.repos = JSON.parse(xhrRepo.responseText);
          console.log(this.repos);
        };
        xhrRepo.send();
      }
    },
  },
};

</script>

<style lang="scss" scoped>

  .profile {
    max-width: 500px;
    width: 100%;
  }

  img {
    max-width: 100%;
    height: 115px;
    border-radius: 4px;
  }

  .repos {
    text-align: start;

    ul {
      list-style-type: none;
      padding-left: 0;
      margin-bottom: 40px;
    }

    li {
      margin-bottom: 24px;

      h3 {
        margin: 0 0 4px;
      }

      p {
        margin-top: 0;
      }
    }
  }

</style>
