<script setup>
import Manage from '../components/Manage.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';


</script>

<template>
  <main>
    <Nav />
    <Manage />
  </main>
    <Footer />
</template>

<style scoped>
header {
  line-height: 1.5;
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
}
</style>
