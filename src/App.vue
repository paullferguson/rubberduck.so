<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/auth">Auth</router-link>
      <router-link to="/profile">Profile</router-link>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 64px;
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      margin: 0 16px;
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #20704c;
      }
    }
  }

  main {
    height: calc( 100% - 82px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
