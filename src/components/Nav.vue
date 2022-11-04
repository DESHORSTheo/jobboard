<script >

const connect = true;

import axios from 'axios';
export default{
  data() {
    return {
      isConnect: false,
      datas: "",
      modal: 0, // 0 None ; 1 Login ; 2 Register ; 3 Create companies
      dataLogin: [],
      dataRegister: [],
      dataCompanie: [],
    }
  },

   beforeMount() {
    if(localStorage.getItem("session") != null){
      var datas = JSON.parse(localStorage.getItem("session"));
      this.isConnect = true;
      this.datas = datas;
    }
  },
  methods: {
    toggleModal: function(id){
      console.log('hey')
      console.log(id)
    },    
 login: function(){
      if(this.dataLogin == ""){
        this.dataLogin['email'] = "";
        this.dataLogin['password'] = "";
        this.dataLogin['emailError'] = "";
        this.dataLogin['passwordError'] = "";
      }
      this.modal = 1;
      var modal = document.getElementById("login");
      modal.style.display = "block";
    },

    createCompanie: function(){
      if(this.dataCompanie == ""){
        this.dataCompanie['name'] = "";
        this.dataCompanie['descritpion'] = "";
        this.dataCompanie['nameError'] = "";
        this.dataCompanie['descritpionError'] = "";
      }
      this.modal = 3;
      var modal = document.getElementById("modal");
      modal.style.display = "block";
    },

    register: function(){
      if(this.dataRegister == ""){
        this.dataRegister['email'] = "";
        this.dataRegister['emailError'] = "";
        this.dataRegister['password'] = "";
        this.dataRegister['passwordError'] = "";
        this.dataRegister['passwordc'] = "";
        this.dataRegister['passwordcError'] = "";
        this.dataRegister['name'] = "";
        this.dataRegister['nameError'] = "";
        this.dataRegister['lastname'] = "";
        this.dataRegister['lastnameError'] = "";
        this.dataRegister['phone'] = "";
        this.dataRegister['phoneError'] = "";
        this.dataRegister['wishlist'] = "";
        this.dataRegister['wishlistError'] = "";
        this.dataRegister['city'] = "";
        this.dataRegister['cityError'] = "";
      }
      this.modal = 2;
      var modal = document.getElementById("modal");
      modal.style.display = "block";
    },

    checkIdentL: async function() {
      var data = new Object();
      var email = document.getElementById("loginemailInput").value;
      var password = document.getElementById("loginpasswordInput").value;
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      data['email'] = email;
      data['password'] = password;
      //Email empty
      if (email == "") {
        data['emailError'] = "Merci de specifier un email";
        this.dataLogin = data;
        //Regex email
      } else if (!(email.match(mailformat))) {
        data['emailError'] = "Merci de spécifier un format  valide";
        this.dataLogin = data;
        //Verif email BDD
      } else if (!await this.isBD(email)) {
        data['emailError'] = "Cet email n'existe pas";
        this.dataLogin = data;
      } else {
        data['emailError'] = "";
        this.dataLogin = data;
      }

      if (password == "") {
        data['passwordError'] = "Merci de specifier un password";
        this.dataLogin = data;
      } else if (await !this.verifyCredential(email, password)) {
        data['passwordError'] = "Ce mot de passe ne corespond pas";
        this.dataLogin = data;
      } else {
        var modal = document.getElementById("modal");
        modal.style.display = "none";

        const response2 = await axios.get("http://localhost:8080/api/account/email/" + email);
        var data2 = await response2.data;
        localStorage.setItem('session', JSON.stringify(data2));

        this.$router.push({name: this.$router.name})

      }
    },

    checkCompanies: async function(){
      var data = new Object();
      var name = document.getElementById("createNameInput").value;
      var desc = document.getElementById("createDescInput").value;
      data['name'] = name;
      data['description'] = desc;
      var verif = 0;

      if(name == "")data['nameError'] = "Name empty";
      else{
        data['nameError'] = "";
        verif++;
      }

      if(desc == "") data['descriptionError'] = "Description empty";
      else{
        data['descriptionError'] = "";
        verif++;
      }

      if (verif == 2) {

        console.log("company encore");
        //Create companie
        console.log(data);
        const response = await axios.post("http://localhost:8080/api/companies/", data);

        console.log(response.data['id']);
        var dataU = new Object();
        dataU['companies'] = response.data['id'];
        dataU['role'] = 1;
        const response2 = await axios.post("http://Localhost:8080/api/account/companie/"+this.datas['id'], dataU)
        var modal = document.getElementById("modal");
        this.datas['companiesid'] = response.data['id'];
        this.datas['role'] = 1;
        localStorage.setItem("session", JSON.stringify(this.datas));
        modal.style.display = "none";
        return;
      }
      this.dataCompanie = data;
    },

    checkIdentR: async function(){
      var data = new Object();
      var name = document.getElementById("registernameinput").value;
      var lastname = document.getElementById("registerlastnameinput").value;
      var email = document.getElementById("registeremailInput").value;
      var password = document.getElementById("registerpasswordInput").value;
      var passwordc = document.getElementById("registerpasswordcInput").value;
      var phone = document.getElementById("registerphoneinput").value;
      var wish = document.getElementById("registerwishlistInput").value;
      var city = document.getElementById("registercityInput").value;

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      var verifint = 0;

      data['name'] = name;
      data['lastname'] = lastname;
      data['password'] = password;
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

      /** Email checker **/
      if (email == "") {
        data['emailError'] = "email empty";

      } else if (!(email.match(mailformat))) {
        data['emailError'] = "Merci de spécifier un format  valide";

      } else if (await this.isBD(email)) {
        data['emailError'] = "Email already exist in BD";

      } else {
        data['emailError'] = ""

        console.log("here");
        verifint++;
      }

      console.log("here");
      /** Password checker **/
      if (password == "") {
        data['passwordError'] = "Empty password";
      } else if (password.length < 8) {
        data['passwordError'] = "8 char min";
      } else if (passwordc == "") {
        data['passwordcError'] = "Empty password";
      } else if (password != passwordc) {
        data['passwordError'] = "Les mdp ne correspondent pas";
      } else {
        data['passwordError'] = "";
        data['passwordcError'] = "";
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
      /** ALL TEST PASSED **/
      if (verifint == 7) {
        //Send data to  api for create account and connect first time


        console.log(data);
        //Create account
        const response = await axios.post("http://localhost:8080/api/account/", data);

        //Get data info of new account
        const response2 = await axios.get("http://localhost:8080/api/account/email/" + email);
        var data2 = await response2.data;

        var modal = document.getElementById("modal");
        modal.style.display = "none";
        localStorage.setItem('session', JSON.stringify(data2));
        return;
      }
      this.dataRegister = data;

    },
    isBD: async function(email){
      const response = await axios.get("http://localhost:8080/api/account/email/" + email);
      var data = await response.data;
      if (data != "error") {
        return true;
      }
      return false;
    },

    verifyCredential: async function(email, password) {
      var data = new Object();
      data['email'] = email;
      data['password'] = password;
      console.log("check email"+email+" with pwd : "+password);

      data = JSON.stringify(data);
      console.log("Envoie des valeur :" +data);
      const response = await axios.post("http://localhost:8080/api/account/verif/", data);
      console.log("data sand "+data);
      var data = response.data;
      console.log(data);

      if (data['message'] == null) {
        console.log("Aucun msg err erreor");
        return true;
      }
      console.log("Message")
      return false;
    },

    adminpage: function(){
      this.$router.push({name:'admin'});
    },
    home: function(){
      this.$router.push({name:'home'});
    },
    manage: function(){
      this.$router.push({name:'manage'});
    },

    companies: function(){
      this.$router.push({name:'companie', params:{id:this.datas['companiesid']}});
    },
    edit: function(){
      this.$router.push({name:'editaccount'});
    },
    logout: function(){
      localStorage.removeItem("session");
      this.isConnect = false;
      this.$router.push({name: this.$router.name})
    }
  }
}
</script>

<template>

  <nav>
    <ul  v-if="isConnect">
      <li><h3>JobBoard</h3></li>
      <li>      <p>Bonjour {{datas['name']}} {{datas['lastname']}}</p></li>
      <li>
        <div>
          <span class="material-symbols-rounded">home_app_logo</span>
          <a v-on:click="home()">Home</a>
        </div>
      </li>
      <li v-if="datas['role'] == 1 || (datas['role'] == 0 && datas['companiesid'] != null)">
        <div>
          <span class="material-symbols-rounded">assured_workload</span>
          <a v-on:click="companies()">My companies</a>
        </div>
      </li>
      <li v-if="(datas['role'] == 0 && datas['companiesid'] == null)">
        <div>
          <span class="material-symbols-rounded">add_home_work</span>
          <a v-on:click="createCompanie()">Create comapnies</a>
        </div>
      </li>
      <li v-if="datas['role'] == 2">
        <div>
          <span class="material-symbols-rounded">admin_panel_settings</span>
          <a v-on:click="adminpage()">Administration</a>
        </div>
      </li>
      <li v-if="datas['role'] == 1">
        <div>
          <span class="material-symbols-rounded">edit</span>
          <a v-on:click="manage()">Manage Advertisements</a>
        </div>
      </li>
      <li>
        <div>
          <span class="material-symbols-rounded">settings</span>
            <a v-on:click="edit()">Edit my profile</a>
        </div>
      </li>
      <li>
        <div>
          <span class="material-symbols-rounded">logout</span>
          <a v-on:click="logout()">Log out</a>
        </div>
      </li>
    </ul>
    <ul v-else>

      <li><h3>JobBoard</h3></li>
      <li>
        <div>
          <a v-on:click="login()">Login</a>
        </div>
      </li>
      <li><a v-on:click="register()">Register</a></li>
    </ul>
  </nav>


    <div class="modal" id="modal" v-bind:style="{display: 'block'}" v-if="this.modal == 1">
      <div class="modal-content" >
        <span onclick="hidemodal()" class="close">&times;</span>
        <h2>Se connecter</h2>

        <p>{{dataLogin['emailError']}}</p>

        <input id="loginemailInput" placeholder="Email" type="email" name="email" :value="dataLogin['email']" required> <br>

        <p>{{dataLogin['passwordError']}}</p>
        <input id="loginpasswordInput" placeholder="Password" type="password" name="password"  :value="dataLogin['password']" required> <br>

        <button v-on:click="checkIdentL()">Se connecter</button>
      </div>
    </div>
    <div class="modal" id="modal" v-bind:style="{display: 'block'}" v-else-if="this.modal == 2">
      <div class="modal-content" >

        <h2>S'inscrire</h2>
        <span onclick="hidemodal()" class="close">&times;</span>

        <p class="error">{{dataRegister['nameError']}}</p>
        <input id="registernameinput" placeholder="Name" type="text" name="name" :value="dataRegister['name']" required> <br>

        <p class="error">{{dataRegister['lastnameError']}}</p>
        <input id="registerlastnameinput" placeholder="Lastname" type="text" name="lastname" :value="dataRegister['lastname']" required> <br>

        <p class="error">{{dataRegister['passwordError']}}</p>
        <input id="registerpasswordInput" placeholder="Password" type="password" name="password"  required> <br>

        <p class="error">{{dataRegister['passwordcError']}}</p>
        <input id="registerpasswordcInput" placeholder="Confirmation" type="password"  required> <br>

        <div>
          <div>
          <p class="error">{{dataRegister['emailError']}}</p>
          <input id="registeremailInput" placeholder="Email" type="email" name="email" :value="dataRegister['email']" required> <br>
          </div>
        <div>
          <p class="error">{{dataRegister['phoneError']}}</p>
          <input id="registerphoneinput" placeholder="Tel" type="tel" name="phone" :value="dataRegister['phone']" required> <br>
        </div>
        </div>
        <p class="error">{{dataRegister['cityError']}}</p>
        <input id="registercityInput" placeholder="City" type="text" name="city" :value="dataRegister['city']" required> <br>

        <p class="error">{{dataRegister['wishlistError']}}</p>
        <label for="registerwishlistInput">Wish post</label>
        <select name="wishpost" id="registerwishlistInput">
          <option value="0">----OPEN----</option>
          <option value="1">Informatique</option>
          <option value="2">Artisant</option>
          <option value="3">Immobilier</option>
          <option value="4">Restauration</option>
          <option value="5">Cinema</option>
        </select>

        <button v-on:click="checkIdentR()">S'incrire</button>
      </div>
    </div>
    <div class="modal" id="modal" v-bind:style="{display: 'block'}" v-else-if="this.modal == 3">
    <div class="modal-content">
      <span onclick="hidemodal()" class="close">&times;</span>
      <h2>Create companie</h2>
      <p class="error">{{dataCompanie['nameError']}}</p>
      <input id="createNameInput" placeholder="Companie name" type="text" name="name" :value="dataCompanie['name']" required> <br>
      <p class="error">{{dataCompanie['descriptionError']}}</p>
      <textarea name="description" id="createDescInput" placeholder="Description" cols="30" rows="10"  required>{{dataCompanie['description']}}</textarea>

      <button v-on:click="checkCompanies()">Create companie</button>
    </div>
  </div>
</template>

<style scoped>

nav ul li h3{
  left: -200px;
}

nav ul li p{
  top: 20px;
  left: -50px;
}
li div{
  display: flex;
  flex-direction: column;
}
li div span{
  margin-left: auto;
  margin-right: auto;
}
.error{
  background-color: #c34242;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-radius: 10px;

}

h3{
  font-weight: 300 bold;
  font-size: 3em;
  color: #2F365F;;
}

li{
  list-style-type: none;
  margin: 0;
  display: inline-block;
  padding: 0;
  padding: 0px 10px 0px 10px ;
}
/* CSS Modal  */
nav{
  text-align: right;
  width: 100vw;
  margin-bottom: 30px;
  color: #2F365F;
  padding-right: 5%;
  background-color: white;
}

nav p {
font-weight: bold;

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

/* The Close Button */
.close {
  position: absolute;
  color: rgb(147, 141, 141);
  font-size: 30px;
  font-weight: bold;
  right: 0.8rem;
  top: 0.3rem;
  z-index: 3;
}
.close:hover,
.close:focus {
  color: #2F365F;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

a,
.green {
  text-decoration: none;
  color: #2F365F;
}

@media (hover: hover) {
  a:hover {
    padding: 8px;
    background-color: #2f365f52;
    cursor: pointer;
    transition: all 0.2s ease-out;
    border-radius: 4px;
  }
}

</style>
