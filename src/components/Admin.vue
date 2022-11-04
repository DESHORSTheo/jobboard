<script >

import axios from 'axios';
export default{
  data() {
      return {
        feed: [],
        users: [],
        errors: [],
        currentFSort:'id',
        currentFSortDir:'asc'
      }
    },

  async created() {
      try {
        const response = await axios.get(`http://localhost:8080/api/advertisements`)
        this.feed = response.data
        const response2 = await axios.get(`http://localhost:8080/api/account`)
        this.users = response2.data
      } catch (e) {
        this.errors.push(e)
      }


    },
  computed:{
    sortedFeed:function() {
      return this.feed.sort((a,b) => {
        let modifier = 1;
        if(this.currentFSortDir === 'desc') modifier = -1;
        if(a[this.currentFSort] < b[this.currentFSort]) return -1 * modifier;
        if(a[this.currentFSort] > b[this.currentFSort]) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentFSort) {
        this.currentFSortDir = this.currentFSortDir==='asc'?'desc':'asc';
      }
      this.currentFSort = s;
    },

    async showFeed(){
      try {
        const response = await axios.get(`http://localhost:8080/api/advertisements`)
        this.feed = response.data
        const response2 = await axios.get(`http://localhost:8080/api/account`)
        this.users = response2.data
      } catch (e) {
        this.errors.push(e)
      }
    },
    async deleteAd(id){
      await axios.delete("http://localhost:8080/api/advertisements/"+id);
      this.showFeed()
    },
    async deleteAccount(id){
      await axios.delete("http://localhost:8080/api/account/"+id);
      this.showFeed();
    },
    editAc(id){
      this.$router.push({name:'edit', params:{id:id, action:"account"}});
    },
    editAd(id){
      this.$router.push({name:'edit', params:{id:id, action:"adver"}});
    }
  }


}


</script>

<template>
  <h2>Advertisements :</h2>
  <table id="feed-control" cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th @click="sort('id')">Reference</th>
        <th @click="sort('name')">Company</th>
        <th>Title</th>
        <th>Description</th>
        <th @click="sort('type')">Type</th>
        <th @click="sort('localisation')">Localisation</th>
        <th @click="sort('wage')">Wage</th>
        <th>Domaine</th>
        <th @click="sort('timerange')">Time range</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="f in sortedFeed">
          <td>#{{ f.id }}</td>
          <td>{{ f.name }}</td>
          <td>{{ f.title }}</td>
          <td>{{ f.description.substring(0,100).concat(" [...]")}}</td>
          <td>{{ f.type }}</td>
          <td>{{ f.localisation }}</td>
          <td>{{ f.wage }}$/y</td>
          <td>{{ f.domain }}</td>
          <td>{{ f.timerange }}h/w</td>
          <td><button v-on:click="deleteAd(f.id)"><span class="material-symbols-rounded">delete</span></button> <button v-on:click="editAd(f.id)"><span class="material-symbols-rounded">edit</span></button>️</td>
        </tr>
    </tbody>
  </table>
  <h2>User :</h2>
  <table id="feed-user" cellpadding="0" cellspacing="0">
    <thead>
    <tr>
      <th>Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Phone</th>
      <th>City</th>
      <th>Whish post</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="u in users">
      <td>{{ u.name }}</td>
      <td>{{ u.lastname }}</td>
      <td>{{ u.email }}</td>
      <td>{{ u.role }}</td>
      <td>{{ u.phone }}</td>
      <td>{{ u.city }}</td>
      <td>{{ u.wishpost }}</td>
      <td><button v-on:click="deleteAccount(u.id)"><span class="material-symbols-rounded">delete</span></button> <button v-on:click="editAc(u.id)"><span class="material-symbols-rounded">edit</span></button>️</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

h2{
  padding: 10px 0px 10px 0px;
  color: #2F365F;
  font-weight: bold;
}
table{
  width: 90%;
}
td{
  text-align: center;
  padding-left: 0.6vw;
  padding-right: 0.6vw;

}

tbody {
  background-color : #F7F3F5;
}

tr {
  color : #2F365F;
}

td > a {
  text-decoration: none;
}
tr:hover{
  background-color: #e2c2b349;
}

th, td {
  border: 1px solid #2F365F;
}
th{
  background-color: #2F365F;
  color: white;
  padding-left: 1vw;
  padding-right: 1vw;
}

.vt-sort:before{
  font-family: FontAwesome;
  padding-right: 0.5em;
  width: 1.28571429em;
  display: inline-block;
  text-align: center;
}

.vt-sortable:before{
  content: "\f0dc";
}

.vt-asc:before{
  content: "\f160";
}

.vt-desc:before{
  content: "\f161";
}

@media (min-width: 1024px) {

}
</style>
