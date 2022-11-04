<script >
import axios from 'axios';

export default {
  data() {
    return {
      feed: [],
      errors: [],
      show: 0,
      data: [],
    }
  },

  async created() {
    this.data = JSON.parse(localStorage.getItem("session"));
    console.log(this.data)
    try {
      const response = await axios.get(`http://localhost:8080/api/advertisements`)
      this.feed = response.data
    } catch (e) {
      this.errors.push(e)
    }

    console.log(this.feed)
  },

  methods: {
    manage: function () {
      this.$router.push({ name: 'manage' });
    },


    hide: function (id) {
      const modal = document.getElementById(id)
      modal.style.display = "none"
    },

    async applyfunction(id) {
      const reponse = await axios.get("http://localhost:8080/api/advertisements/" + id);
      var data = await reponse.data;
      let name = data['name']
      id = data['id']
      console.log(name);

      const modal = document.getElementById(id)
      modal.style.display = "block"
    }
  }
}

</script>

<template>
  <div class="publications">
    <div class="publication-container">
      <ul>
        <li class="publication" v-for="f in feed">
          <div class="image-header">
            <img :src="'/src//assets/'+f.compagnieimg" width="200" height="100">
          </div>
          <h3>{{f.title}}</h3>
          <h2>{{f.name}}</h2>

          <div class="description" v-if="show != f.id">
            <p>
              {{f.description.substring(0,250).concat(" ’[...] ")}}
            </p>
          </div>
          <div class="description" v-else>
            <p>{{f.description}}</p>
            <hr>
            <p><i class="fa fa-map"></i> Lieu : {{f.localisation}}</p>
            <p><i class="fa fa-money"></i> Rémunération : {{f.wage}} €/an</p>
            <p><i class="fa fa-clock"></i> Temps : {{f.timerange}}h/semaine</p>
            <p> <i class="fa fa-hourglass"></i> Type : {{f.type}}</p>
            <!--<button v-if="f.companiesid == this.data['companies']" v-on:click="manage">
            Manage
          </button>-->
            <div class="apply">
              <button v-on:click="applyfunction(f.id)">Apply</button>
            </div>
            <div class="modal-feed" :id="f.id" v-if="data === null">
              <div class="modal-feed-content">
                <div class="modal-feed-content">
                  <div class="modal-header">
                    <h2>Apply for {{f.name}}</h2>
                    <span v-on:click="hide(f.id)" class="close">&times;</span>
                  </div>
                  <form>
                    <div class="input-group">
                      <input id="nameInput" type="text" name="name" required placeholder="First name"> <br>
                      <input id="lastNameinput" type="text" name="lastname" required placeholder="Last name"> <br>
                    </div>

                    <div class="input-group email">
                      <input id="emailInput" type="email" name="email" required placeholder="E-mail"> <br>
                    </div>

                    <label for="messageInput">Message</label>
                    <div class="input-group-message">
                      <textarea name="content" id="messageInput" cols="30" rows="10"></textarea>
                      <input type="hidden" name="accountid" value="0">
                    </div>

                    <div class="submit">
                      <input type="hidden" name="adid" value="${id}">
                      <input type="submit" value="Send">
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="modal-feed" :id="f.id"  v-else>
              <div class="modal-feed-content">
                <div class="modal-feed-content">
                  <div class="modal-header">
                    <h2>Apply for {{f.name}}</h2>
                    <span v-on:click="hide(f.id)" class="close">&times;</span>
                  </div>
                  <form>
                    <div class="input-group">
                      <input id="nameInput" type="text" name="name" required :value="data.name" readonly> <br>
                      <input id="lastNameinput" type="text" name="lastname" required  :value="data.lastname" readonly> <br>
                    </div>

                    <div class="input-group email">
                      <input id="emailInput" type="email" name="email" required  :value="data.email" readonly> <br>
                    </div>

                    <label for="messageInput">Message</label>
                    <div class="input-group-message">
                      <textarea name="content" id="messageInput" cols="30" rows="10"></textarea>
                      <input type="hidden" name="accountid" value="0">
                    </div>

                    <div class="submit">
                      <input type="hidden" name="adid" value="${id}">
                      <input type="submit" value="Send">
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
          <div class="learn">
            <button v-if="show != f.id" v-on:click="show = f.id">Learn more</button>
            <button v-else v-on:click="show = 0">Learn less</button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div id="modalform"></div>
</template>

<style scoped>
.image-header img {
  height: 45px;
  width: auto;
}

.modal-feed {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.input-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 12px 0px;
}

.input-group input {
  width: 100%;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid rgb(96, 106, 114);
  font-size: 13px;
  outline: none;
  font-size: 16px;
}

/* Modal Content/Box */

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
}


.modal-feed-content {
  padding: 0px 18px;
  background: rgb(235, 233, 229);
  width: 600px;
  height: 350px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 165px;
  border-radius: 4px;
}

.close {
  color: rgb(147, 141, 141);
  font-size: 30px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: #2F365F;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease-out;
}


.email input {
  width: 100%;
}

label {
  color: black;
}

.input-group-message textarea {
  width: 100%;
  height: 100px;
  resize: none;
  border-radius: 4px;
  border: 1px solid rgb(96, 106, 114);
  font-size: 13px;
  font-size: 16px;
  outline: none;
  padding: 12px;
}

.submit {
  display: flex;
  justify-content: center;
  margin: 12px 0px;
}

.submit input {
  font-weight: 600;
  background: rgb(66, 65, 65);
  color: #F7F7F7;
  padding: 7px 36px;
  border-radius: 8px;
  border: 1px solid rgb(66, 65, 65);
  cursor: pointer;
}

.submit input:hover {
  background: #F7F7F7;
  color: rgb(66, 65, 65);
  border: 1px solid rgb(66, 65, 65);
}

/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */

hr {
  margin-top: 1vh;
  margin-bottom: 2vh;
}

i {
  padding: 1vh;
}

.publications {
  /* width: 60%; */
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  background: #F7F7F7;
}

.publication {
  background: white;
  margin: 48px 0;
  padding: 12px 24px;
}

.publication-container {
  /* text-align: center; */
}

.description p {
  text-align: justify;
}

p,
h2,
h3 {
  color: black;
}

h2 {
  font-weight: 600;
}



.description {
  width: 50vw;
}

.learn {
  display: flex;
  justify-content: end;
}

.learn button {
  border: none;
  padding: 0;
  background: transparent;

}

.learn button:hover {
  border-bottom: 1px solid black;
}

.apply {
  display: flex;
  justify-content: center;
  margin: 24px 0px;
}

.apply button {
  font-weight: 600;
  background: rgb(66, 65, 65);
  color: #F7F7F7;
  padding: 7px 36px;
  border-radius: 8px;
  border: 1px solid rgb(66, 65, 65);
}

.apply button:hover {
  background: #F7F7F7;
  color: rgb(66, 65, 65);
  border: 1px solid rgb(66, 65, 65);
}


/* li {
  list-style: none;
  margin-bottom: 1vw;
  margin-top: 1vw;
  background-color: white;
  padding: 2%;
  width: 60vw;
  color: black;
  border-radius: 3px;
}

li p {
  padding-bottom: 15px;
  color: black;
}

li button {
  float: right;
  background-color: #F7F3F5;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: black;
  width: 80%;
}

h2 {
  text-align: right;
  top: -40px;
  font-size: 1.2rem bold;
  font-weight: 300;
  margin-bottom: 0.4rem;
  font-style: #C0A9BD;
} */
</style>
