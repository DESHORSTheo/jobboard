<script >
import EditUser from '../components/EditUser.vue';
import EditAd from '../components/EditAd.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';

export default{
  name: "EditView",
  components: {
    Nav,
    EditUser,
    EditAd,
    Footer
},

}
</script>
<template>
  <main v-if="this.$route.params.action == 'account'">
    <Nav />
    <EditUser />
  </main>
  <main v-else-if="this.$route.params.action == 'adver'">
    <Nav />
    <EditAd />
  </main>
  <main v-else>
    <Nav />
    <h2>Error Action not found {{this.$route.params.id}}</h2>
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
