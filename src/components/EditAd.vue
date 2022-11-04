<template>

  <h2>Edit Advertisement #{{addata['id']}}</h2>

  <label for="inputName">Name</label><br>
  <input type="text" name="name" id="inputName" v-bind:value="addata['title']"><br>

  <label for="inputDesc">Description : </label><br>
  <textarea  id="inputDesc" cols="100" rows="40">{{addata['description']}}</textarea><br>

  <label for="inputType">Type</label><br>
  <input type="text" id="inputType" v-bind:value="addata['type']"><br>

  <label for="inputwage">Wage</label><br>
  <input type="number" id="inputwage" v-bind:value="addata['wage']"><br>

  <label for="inputtime">Time range</label><br>
  <input type="text" id="inputtime" v-bind:value="addata['timerange']"><br>

  <button v-on:click="checkUpdate">Update account</button>
</template>

<script>
import axios from "axios";

export default {
  name: "EditAd",
  data() {
    return {
      addata: [],
    }
  },

  async created() {

    try {
      const response = await axios.get("http://localhost:8080/api/advertisements/"+this.$route.params.id);
      this.addata = response.data;
    } catch (e) {
      this.errors.push(e)
    }
  },

  methods: {

  }
}


</script>

<style scoped>
input{
  padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:70%
}
</style>