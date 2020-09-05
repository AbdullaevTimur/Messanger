<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  --color-black: #35383D;
  --color-white: #FFFFFF;
  --color-blue: #398BFF;
  --color-gray: #B7C0C8;
  --color-lightgray: #F3F6F8;
  --color-darkgray: #7D8790;
  --color-puregray: #E9EDF2;

  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

#app {
  font-family: 'Norms', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--color-black);
  font-size: 16px;
}
</style>
