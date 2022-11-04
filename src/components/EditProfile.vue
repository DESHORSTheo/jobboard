<template>
<div class="container">
  <h2>Edit account {{userdata['name']}} {{userdata['lastname']}}</h2>

  <p class="success">{{errorData['success']}}</p>
  <p class="error">{{errorData['nameError']}}</p>
  <label v-bind:for="inputName">Name</label><br>
  <input type="text" id="inputName" name="name" v-bind:value="userdata['name']"><br>


  <p class="error">{{errorData['lastnameError']}}</p>
  <label v-bind:for="inputlastname">Lastname</label><br>
  <input type="text" id="inputlastname" v-bind:value="userdata['lastname']"><br>


  <p class="error">{{errorData['emailError']}}</p>
  <label v-bind:for="inputemail">Email</label><br>
  <input type="text" id="inputemail" v-bind:value="userdata['email']"><br>


  <p class="error">{{errorData['phoneError']}}</p>
  <label v-bind:for="inputphone">Phone</label><br>
  <input type="text" id="inputphone" v-bind:value="userdata['phone']"><br>


  <p class="error">{{errorData['cityError']}}</p>
  <label v-bind:for="inputcity">City</label><br>
  <input type="text" id="inputcity" v-bind:value="userdata['city']"><br>


  <p class="error">{{errorData['wishlistError']}}</p>
  <label for="inputwish">Wish post</label>
  <select name="wishpost" id="inputwish">
    <option value="0" :selected="userdata['wishpost'] == 0 ? true : false">----OPEN----</option>
    <option value="1" :selected="userdata['wishpost'] == 1 ? true : false">Informatique</option>
    <option value="2" :selected="userdata['wishpost'] == 2 ? true : false">Artisant</option>
    <option value="3" :selected="userdata['wishpost'] == 3 ? true : false">Immobilier</option>
    <option value="4" :selected="userdata['wishpost'] == 4 ? true : false">Restauration</option>
    <option value="5" :selected="userdata['wishpost'] == 5 ? true : false">Cinema</option>
  </select>

  <button v-on:click="checkUpdate">Update account</button>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditAccount",
  data() {
    return {
      userdata: [],
      errorData: [],
      data: [],
    }
  },


  async created() {
    var data = JSON.parse(localStorage.getItem("session"));
    this.data = data;
    try {
      const response = await axios.get("http://localhost:8080/api/account/id/"+data['id']);
      this.userdata = response.data;
    } catch (e) {
      this.errors.push(e)
    }
  },

  methods: {
    isBD: async function(email){
      const response = await axios.get("http://localhost:8080/api/account/email/" + email);
      var data = await response.data;
      if (data != "error") {
        return true;
      }
      return false;
    },

    checkUpdate: async function () {

      var data = new Object();
      var name = document.getElementById("inputName").value;
      var lastname = document.getElementById("inputlastname").value;
      var email = document.getElementById("inputemail").value;
      var phone = document.getElementById("inputphone").value;
      var wish = document.getElementById("inputwish").value;
      var city = document.getElementById("inputcity").value;

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      var verifint = 0;

      data['name'] = name;
      data['lastname'] = lastname;
      data['email'] = email;
      data['phone'] = phone;
      data['wishpost'] = wish;
      data['city'] = city;

      /** Name checker **/
      if (name == "") {
        data['nameError'] = "Name empty";
      } else {
        data['nameError'] = "";
        verifint++;
      }

      /** Lastname checker **/
      if (lastname == "") {
        data['lastnameError'] = "Lastname empty";
      } else {
        data['lastnameError'] = "";
        verifint++;
      }

      console.log(this.data['email']);
      /** Email checker **/
      if (email == "") {
        data['emailError'] = "email empty";

      } else if (!(email.match(mailformat))) {
        data['emailError'] = "Merci de spécifier un format  valide";

      }else if(this.data['email'] == email){
        data['emailError'] = "";
        verifint++;
      } else if (await this.isBD(email)){
        data['emailError'] = "Email already exist in BD";

      } else{
        data['emailError'] = ""
        verifint++;
      }

      /** Phone checker **/
      if (phone.length != 10) {
        data['phoneError'] = "Merci de specifier le num sans espace avec 06/07."
      } else {
        data['phoneError'] = "";
        verifint++;
      }

      /** Wish post Checker **/
      if (wish == 0) {
        data['wishlistError'] = "Merci de select un choix";
      } else {
        data['wishlistError'] = "";
        verifint++;
      }

      if (city == "") {
        data['cityError'] = "Emtpy";
      } else {
        data['cityError'] = "";
        verifint++;
      }

      if(verifint == 6){
        await axios.put("http://localhost:8080/api/account/"+this.data['id'], data);
        data['success'] = "Data Update :";
      }

      this.errorData = data;
      this.userdata = data;
    }
  }
}


</script>

<style scoped>

.container {
  margin-left : 50px;
  margin-right: 50px;
}
.success{
  background-color: lawngreen;
}
input{
  padding:8px;
  display:block;
  border:none;
  border-bottom:1px solid #ccc;
  width:70%;
}

h2 {
  color : #2F365F; 
}

label {
  color : #2F365F;
}
</style>