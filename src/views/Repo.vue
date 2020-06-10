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
      <div class="files">
        <section v-if="file">
          <h2>Details</h2>
          <ul class="h-list">
            <li>License: <strong>{{file.file.license}}</strong></li>
            <li>Keywords:
              <strong>
                <span v-for="(tag, i) in file.file.keywords" :key="i">
                  {{tag}}{{file.file.keywords.length - 1 === i ? '': ', '}}
                </span>
              </strong>
            </li>
            <li>Author: <strong>{{file.file.author}}</strong></li>
          </ul>
        </section>
        <section v-if="scripts">
          <h2>Scripts</h2>
          <ul>
            <li v-for="(script, i) in scripts" :key="i">
              <pre class="pretty-code">
<code><strong>{{script[0]}}</strong> : {{script[1]}}</code>
</pre>
            </li>
          </ul>
        </section>
        <section v-if="dependencies">
          <h2>Docs</h2>
          <h4>Dependencies</h4>
          <ul>
            <li v-for="(dep, i) in dependencies" :key="i">
              <p>
                <strong>{{dep[0]}}</strong> {{dep[1]}}
                <a target="_blank" rel="noopener noreferrer"
                  :href="`https://www.npmjs.com/package/${dep[0]}`">
                  Docs
                </a>
              </p>
            </li>
          </ul>
        </section>
        <section v-if="file">
          <h2>Package.json</h2>
          <pre class="pretty-code"><code>{{file.file}}</code></pre>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .repo {
    max-width: 750px;
    width: 100%;
  }

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

  .h-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    align-content: center;
    justify-content: space-evenly;

    li {
      padding: 8px;
    }
  }

  section {
    margin-bottom: 32px;
  }

  .files {
    margin-bottom: 80px;
    text-align: start;

    ul {
      list-style: none;
      padding-left: 0;
    }
  }

  .pretty-code {
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
      scripts: null,
      dependencies: null,
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
          console.log(this.file);

          this.scripts = Object.keys(this.file.file.scripts)
            .map((key) => [key, this.file.file.scripts[key]]);

          this.dependencies = Object.keys(this.file.file.dependencies)
            .map((key) => [key, this.file.file.dependencies[key]]);
        };
        xhrFile.send();
      }
    },
  },
};

</script>
