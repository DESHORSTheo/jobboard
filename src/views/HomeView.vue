<script >
import Feed from '../components/Feed.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';

export default{
  name: "HomeView",
  components: {
    Nav,
    Feed,
    Footer
}
}
</script>
<template>
  <main>
    <Nav />
    <Feed />
  </main>
  <Footer />
</template>

<style>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center; 
    padding-right: calc(var(--section-gap) / 2);
  }

}
</style>
