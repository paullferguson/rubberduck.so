
<script>
import LandingPage from './components/LandingPage.vue';

export default {
  name: 'App',
  components: {
    LandingPage,
  },
};
</script>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <LandingPage msg="Welcome to an App"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
