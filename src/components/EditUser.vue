<template>

  <h2>Edit account {{userdata['name']}} {{userdata['lastname']}}</h2>

  <label v-bind:for="inputName">Name</label><br>
  <input type="text" id="inputName" v-bind:value="userdata['name']"><br>


  <label v-bind:for="inputlastname">Lastname</label><br>
  <input type="text" id="inputlastname" v-bind:value="userdata['lastname']"><br>


  <label v-bind:for="inputemail">Email</label><br>
  <input type="text" id="inputemail" v-bind:value="userdata['email']"><br>


  <label v-bind:for="inputphone">Phone</label><br>
  <input type="text" id="inputphone" v-bind:value="userdata['phone']"><br>


  <label v-bind:for="inputcity">City</label><br>
  <input type="text" id="inputcity" v-bind:value="userdata['city']"><br>

  <button v-on:click="checkUpdate">Update account</button>
</template>

<script>
import axios from "axios";

export default {
  name: "EditUser",
  data() {
    return {
      userdata: [],
      errorData: [],
    }
  },

  async created() {

    try {
      const response = await axios.get("http://localhost:8080/api/account/id/"+this.$route.params.id);
      this.userdata = response.data;
    } catch (e) {
      this.errors.push(e)
    }
  },

  methods: {
    checkUpdate: async function () {
      var check = 0;
      var name = document.getElementById("inputName").value;
      var lastname = document.getElementById("inputlastname").value;
      var email = document.getElementById("inputemail").value;
      var city = document.getElementById("inputcity").value;
      var phone = document.getElementById("inputphone").value;
      var userdata = new Object();
      if (name == "") {
        console.log()
      } else {
        userdata['name'] = name;
        check++;
      }

      if (lastname == "") {
        userdata['lastname'] = lastname;
      } else {
        userdata['lastname'] = lastname;
        check++;
      }

      if (email == "") {
        userdata['email'] = email;
      } else {
        userdata['email'] = email;
        check++;
      }

      if (phone == "") {
      } else{
        userdata['phone'] = phone;
        check++;
      }

      if (city == "") {
      } else {
        userdata['city'] = city;
        check++;
      }

      if(check == 5){

        console.log(userdata);
        const response = await axios.put("http://localhost:8080/api/account/"+this.$route.params.id, userdata);

      }

    }
  }
}


</script>

<style scoped>
input{
  padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:70%
}
</style>