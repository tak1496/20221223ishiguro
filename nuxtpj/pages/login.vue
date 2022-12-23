<template>
  <div>
    <Header />
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="login">
        <h3>ログイン</h3>
    
        <validation-provider v-slot="ProviderProps" rules="required|email">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="div_form">
            <input type="email" v-model="email" name="メールアドレス" placeholder="メールアドレス" required />
          </div>
        </validation-provider>
    
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="div_form">
            <input type="password" v-model="password" name="パスワード" placeholder="パスワード" required />
          </div>
        </validation-provider>
    
        <div class="div_form">
          <button @click="login" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
        </div>
      </div>
    </validation-observer>
  </div>

</template>


<script>
import firebase from '~/plugins/firebase'
import Header from "@/components/AuthHeader.vue"

export default {
  data() {
    return {
      email: null,
      password: null,
      uid: null
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.search_user();
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
    search_user() {
      const sendData = {
        uid: firebase.auth().currentUser.uid
      }
      this.$store.dispatch('search_user', sendData);
    },
  },
  components: {
    Header
  },
}
</script>

<style scoped>
body {
  background: #000000;
  color: #ffffff;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  padding: 5px 30px;
  text-align: center;
}

.div_form {
  padding: 0px 0px 15px 0px;
}

input[type="email"],
input[type="password"]
{
  border-radius: 8px;
  border: 1px solid gray;
  height: 35px;
  width:300px;
}

button {
  border-radius: 20px;
  background-color: blue;
  color: #fff;
  padding: 8px 20px;
  border:none;
}

button:hover{
  cursor: pointer;
}
</style>