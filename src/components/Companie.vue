<script >

import axios from 'axios';
export default{
  data() {
      return {
        datas: [],
        id: 0,
        companie: [],
        members: [],
        advertisements: [],
        dataAd: [],
        modal: 0,
      }
    },
  async created() {
      try {

        var datas = JSON.parse(localStorage.getItem("session"));
        this.id = this.$route.params.id;

        const reponse = await axios.get("http://localhost:8080/api/companies/"+this.$route.params.id);
        this.companie = reponse.data;
        console.log("--------");
        console.log(reponse.data);

        this.datas = datas;
        const member = await axios.get("http://localhost:8080/api/companies/members/"+this.$route.params.id);
        this.members = member.data;
        console.log("--------");
        console.log(member.data);

        const adv = await axios.get("http://localhost:8080/api/companies/adv/"+this.$route.params.id);
        this.advertisements = adv.data;
        console.log("--------");
        console.log(adv.data);

      } catch (e) {
        this.errors.push(e)
      }
    },

  methods: {
    createAd: function(){
      if(this.dataLogin == ""){
        this.dataAd['title'] = "";
        this.dataAd['description'] = "";
        this.dataAd['titleError'] = "";
        this.dataAd['descriptionError'] = "";
      }
      this.modal = 5;
      var modal = document.getElementById("modal");
      modal.style.display = "block";
    },
    checkAdvertisement: async function(){
      var data = new Object();
      var title = document.getElementById("createNameInput").value;
      var desc = document.getElementById("createDescInput").value;
      var localisation  = document.getElementById("createLocalisationInput").value;
      var time  = document.getElementById("createTimeInput").value;
      var type  = document.getElementById("createTypeInput").value;
      var wage  = document.getElementById("createWageInput").value;

      data['title'] = title;
      data['description'] = desc;
      data['wage'] = wage;
      data['localisation'] = localisation;
      data['timerange'] = time;
      data['type'] = type;
      data['wage'] = wage;
      var verif = 0;

      if(title == "")data['titleError'] = "Title empty";
      else{
        data['titleError'] = "";
        verif++;
      }

      if(desc == "") data['descriptionError'] = "Description empty";
      else{
        data['descriptionError'] = "";
        verif++;
      }

      if (verif == 2) {
        var locals = JSON.parse(localStorage.getItem("session"));
        data['companiesid'] = locals['companiesid'];
        data['domain'] = "Informatique";
        //Create companie
        console.log(data);
        const response = await axios.post("http://localhost:8080/api/advertisements/", data);

        var modal = document.getElementById("modal");
        modal.style.display = "none";
        return;
      }
      this.dataCompanie = data;
    },
  }
}
</script>

<template>
  <div class="adverc">
  <h2>Company : {{this.companie['name']}}</h2>
  <p>{{this.companie['description']}}</p>

    <h2>Members</h2>
  <template v-for="m in members">
    <p v-if="m.role == 1">CEO {{m.name}}</p><p v-else>Employee {{m.name}}</p>
  </template>

    <br>

    <template v-if="advertisements.length == 0">
      <div class="adverc">
        <h2>Aucune annonce publiée</h2>

      </div>
    </template>
    <template v-else v-for="f in advertisements">
      <div class="adverc">
        <h45>Advertisement : #{{f.id}}</h45>
        <p>Publish by : {{f.name}} {{f.lastname}}</p>

        <h3>{{f.title}}</h3>
        <p>{{f.description.substring(0,340).concat(" [...] ")}}</p><br>
      </div>
    </template>
    <button v-on:click="createAd()">Create advertisements</button>
  </div>

  <div class="modal" id="modal" v-bind:style="{display: 'block'}" v-if="this.modal == 5">
    <div class="modal-content">
      <span onclick="hidemodal()" class="close">&times;</span>
      <h2>Create companie</h2>
      <p class="error">{{dataAd['titleError']}}</p>
      <input id="createNameInput" placeholder="Title advertisements" type="text" name="name" :value="dataAd['title']" required> <br>
      <p class="error">{{dataAd['descriptionError']}}</p>
      <textarea name="description" id="createDescInput" placeholder="Description" cols="30" rows="10"  required>{{dataAd['description']}}</textarea>
      <p class="error">{{dataAd['typeError']}}</p>
      <input id="createTypeInput" placeholder="Type " type="text" name="name" :value="dataAd['type']" required> <br>
      <p class="error">{{dataAd['localisationError']}}</p>
      <input id="createLocalisationInput" placeholder="Localisation " type="text" name="name" :value="dataAd['localisation']" required> <br>

      <p class="error">{{dataAd['wageError']}}</p>
      <input id="createWageInput" placeholder="Wage " type="text" name="name" :value="dataAd['wage']" required> <br>


      <p class="error">{{dataAd['timeError']}}</p>
      <input id="createTimeInput" placeholder="Time range" type="text" name="name" :value="dataAd['time']" required> <br>

      <button v-on:click="checkAdvertisement()">Create companie</button>
    </div>
  </div>
</template>

<style scoped>

.adverc{
  background-color: #fff;
  color: black;
  margin-bottom: 30px;
}
.modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  flex-direction: column;
  margin: 15%; /* 15% from the top and centered */
  background-color: rgb(235, 233, 229);
  text: black;
  padding: 15px;
  border: 4px solid #F7F1ED;
  width: 33%; /* Could be more or less, depending on screen size */
  margin-right: auto;
  margin-left: auto;
  border-radius: 2%;
}
input, textarea{
  margin-bottom: 2%;
  border-radius: 4px;
  border: 1px solid rgb(96, 106, 114);
  font-size: 13px;
  font-weight: 600;
  font-size: 16px;
}
input[type=text], input[type=password], textarea {
  width: 100%;
  padding: 8px 20px;
}
::placeholder{
  color: rgba(0,0,0,0.4);
}
.modal-content > h2{
  font-size: 24px;
  color: #373f47;
  text-align: center;
  margin-bottom: 20px;
}
.modal-content > div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

input[type=email], input[type=tel] {
  width: 100%;
  padding: 12px 20px;

}
.modal-content button{
  background-color: rgb(32, 31, 31); /* Green */
  border: none;
  color: white;
  padding-top: 11px;
  padding-bottom: 11px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  border-radius: 6px;
  font-size: 20px;
  height: auto;
  font-weight: 700;
}
</style>
