<script >

import axios from 'axios';
export default{
  data() {
      return {
        feed: [],
        datas: [],
        feedchild: [],
      }
    },
  async created() {
      try {

        var datas = JSON.parse(localStorage.getItem("session"));
        this.datas = datas;
        const response = await axios.get(`http://localhost:8080/api/advertisements/all/`+datas['id'])
        this.feed = response.data
        console.log(response.data);

        for (const feed of response.data) {
          console.log("Annonce "+feed['id']);
          try {
            const response = await axios.get(`http://localhost:8080/api/adcontrol/ad/` + feed['id']);
            this.feedchild[feed['id']] = response.data;
          }catch (e){
            this.errors.push(e)
          }
        }

      } catch (e) {
        this.errors.push(e)
      }
    },

  methods: {
    async getApply(id){
      console.log("test");
      try {
        const response = await axios.get(`http://localhost:8080/api/adcontrol/ad/` + id);
        return response.data;
      }catch (e){
        this.errors.push(e)
      }
    },

    async accept(id){
      const response = await axios.delete(`http://localhost:8080/api/adcontrol/` + id);
      this.$router.go();

      /**
       * Remove AD
       * Add companiesID to user account
       * **/
    },

    async deny(id){
      const response = await axios.delete(`http://localhost:8080/api/adcontrol/` + id);
      this.$router.go();
      //await this.$router.push({name:'manage'});
    },
  }
}
</script>

<template>
  <h2>Manage of :</h2>

  <template v-for="f in feed">
    <div class="adver">
      <h2>Advertisement : #{{f.id}}</h2>
      <p>Publish by : {{f.name}} {{f.lastname}}</p>

      <h3>{{f.title}}</h3>
      <p>{{f.description.substring(0,340).concat(" [...] ")}}</p><br>

      <h2>{{feedchild[f.id].length}} Candidature(s)</h2>
      <template v-if="feedchild[f.id] == ''">
        <p>Aucune candidatures</p>
      </template>
      <template v-else>
        <template v-for="fc in feedchild[f.id]">
          <hr>
          <p>Candidature de : {{fc.name}} {{fc.lastname}}</p>

          <p>Contenu: {{fc.content}}</p>
          <ul>
            <li><a v-on:click="accept(fc.id)">✅ Accept</a></li>
            <li><a v-on:click="deny(fc.id)">❌ Deny</a></li>
          </ul><br>
        </template>
        <br>
        <li><a v-on:click="denyAd(f.id)">🗑 ️Delete this</a></li>
      </template>
    </div>
  </template>

</template>

<style scoped>

.adver{
  background-color: #fff;
  color: black;
  margin-bottom: 30px;
}


</style>
