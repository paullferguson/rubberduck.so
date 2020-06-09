<template>
  <div class="repo">
    <div v-if="repo">
      <h2>{{repo.name}}</h2>
      <p>{{repo.description}}</p>
      <div id="nav">
        <a class="btn" target="_blank" rel="noopener noreferrer"
          :href="repo.html_url">
          View
        </a>
        <a class="btn" target="_blank" rel="noopener noreferrer"
          :href="`${repo.html_url}/pulls`">
          Pull Requests
        </a>
        <a class="btn" target="_blank" rel="noopener noreferrer"
          :href="`${repo.html_url}/issues`">
          Issues
        </a>
        <a class="btn" target="_blank" rel="noopener noreferrer"
          :href="`${repo.html_url}/projects`">
          Project
        </a>
        <a class="btn" target="_blank" rel="noopener noreferrer"
          :href="`${repo.html_url}/wiki`">
          Wiki
        </a>
      </div>
      <h4>Package.json</h4>
      <pre v-if="file" class="pretty-code">
        <code>{{file}}</code>
      </pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  #nav {
    padding: 30px;

    a {
      margin: 0 16px;
      font-weight: bold;

      &.router-link-exact-active {
        color: #20704c;
      }
    }
  }

  .pretty-code {
    text-align: start;
    padding: 16px;
    border-radius: 4px;
    background-color: #EEE;
    color: #20704C;
  }

</style>


<script>

export default {

  name: 'Repo',

  components: {
  },

  data() {
    return {
      repo: null,
      file: null,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      if (this.$route.params.repoName) {
        const xhrRepo = new XMLHttpRequest();
        xhrRepo.open('GET', `/api/repo/${this.$route.params.repoName}`);
        xhrRepo.onload = () => {
          this.repo = JSON.parse(xhrRepo.responseText);
          console.log(this.repo);
        };
        xhrRepo.send();

        const xhrFile = new XMLHttpRequest();
        xhrFile.open('GET', `/api/file/${this.$route.params.repoName}`);
        xhrFile.onload = () => {
          this.file = JSON.parse(xhrFile.responseText);
          // console.log(this.file);
        };
        xhrFile.send();
      }
    },
  },
};

</script>
