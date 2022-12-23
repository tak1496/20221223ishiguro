<template>
  <div class="layout">
    <div>
      <img class="logo" src="/img/logo.png" />
    </div>
    <ul>
      <li v-on:click="home" class="home">ホーム</li>
      <li v-on:click="logout" class="logout">ログアウト</li>
    </ul>
    <div class="div_share">
      <p>シェア</p>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <textarea name="シェア" v-model="post" class="share"></textarea>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <div class="div_btn_share">
          <button v-on:click="addPost" :disabled="ObserverProps.invalid || !ObserverProps.validated" class="btn_share">シェアする</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
//import { allowedNodeEnvironmentFlags } from 'process';
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      id: this.$store.state.id,
      name: this.$store.state.name,
      email: this.$store.state.email,
      password: this.$store.state.password,
      post: ''
    }
  },
  methods: {
    home() {
      this.$router.replace('/')
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました')
          this.$router.replace('/')
        })
    },
    addPost() {
      const sendData = {
        user_id: this.id,
        user_name: this.name,
        post: this.post
      };
      this.$store.dispatch('addPost', sendData)
      this.post = '';
      this.$refs.obs.reset();
    },
  }
}
</script>

<style scoped>
.layout {
  padding: 10px 20px 10px 10px;
}

.logo {
  width: 100px;
}

li{
  padding: 10px 0;
  list-style: none;
}

li:hover {
  cursor: pointer;
}

.home:before {
  content: '';
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url(/img/home.png) no-repeat;
  background-size: contain;
  vertical-align: middle;
  padding-right: 10px;
}

.logout:before {
  content: '';
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url(/img/logout.png) no-repeat;
  background-size: contain;
  vertical-align: middle;
  padding-right: 10px; 
}

.div_share {
  padding: 0 0 0 30px;
}

.share {
  height: 120px;
  width:200px;
  border-radius: 10px;
  background-color: #000;
  border:1px solid #fff;
  color: #fff;
  font-size:16pt;
  padding:10px;
}

.div_btn_share {
  text-align: right;
  padding: 10px;
}

.btn_share {
  background-color: blue;
  border-radius: 20px;
  color: #fff;
  font-size:12pt;
  padding: 10px;
  border:inset 1px #fff;
}

.btn_share:hover {
  cursor: pointer;
}
</style>