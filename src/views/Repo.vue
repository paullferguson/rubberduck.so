<template>
  <div class="repo">
    <div v-if="repo">
      <h2>{{repo.name}}</h2>
      <h4>Package.json</h4>
      <pre v-if="file">
        <code>
          {{file}}
        </code>
      </pre>
    </div>
  </div>
</template>

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
          // console.log(this.repo);
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
