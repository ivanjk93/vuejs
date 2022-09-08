<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <router-link to="/" class="hover-off">
      <img alt="Pokemon logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </router-link>

    <div class="wrapper">
      <HelloWorld msg="POKEMON MASTER !" />

      <nav>
        <RouterLink to="/" class="bait">Home</RouterLink>
        <RouterLink to="/pokemonlist" class="bait">Pokemon List</RouterLink>
        <RouterLink to="/inventory" class="bait">Inventory</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.router-link-exact-active.bait {
  background-color: aqua;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.hover-off:hover {
  background-color: white;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
