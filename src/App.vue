<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
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
    color: #2c3e50;
    margin: 0 64px;
    height: 100%;
  }

  a {
    color: #3f721d;

    &:hover {
      color: #293033;
    }
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

  .btn {
    text-decoration: none;
    border-radius: 4px;
    border: solid 1px black;
    padding: 6px 24px;
    font-size: 16px;
    color: black;
    display: inline-block;
    line-height: 2;
    font-weight: bold;
    transition: all 250ms ease;

    &:hover {
      background-color: rgb(253, 213, 193);
    }

    &.btn--big {
      padding: 8px 32px;
      font-size: 18px;
    }
  }

  main {
    // height: calc( 100% - 82px);
    height: 100%;
    box-sizing: border-box;
    padding-top: 64px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
  }

</style>
