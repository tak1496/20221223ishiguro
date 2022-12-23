<template>
  <div>
    <Header />
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="register">
        <h3>新規登録</h3>
    
        <validation-provider v-slot="ProviderProps" rules="required|max:20">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="div_form">
            <input v-model="name" type="text" name="ユーザーネーム" placeholder="ユーザーネーム" required />
          </div>
        </validation-provider>
    
        <validation-provider v-slot="ProviderProps" rules="required|email">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="div_form">
            <input v-model="email" type="email" name="メールアドレス" placeholder="メールアドレス" required />
          </div>
        </validation-provider>
    
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="div_form">
            <input v-model="password" type="password" name="パスワード" placeholder="パスワード" required />
          </div>
        </validation-provider>
    
        <div class="div_form">
          <button @click="register" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import Header from "@/components/AuthHeader.vue"

export default {
  data() {
    return {
      id:null,
      name: null,
      email: null,
      password: null,
      uid: null
    };
  },
  methods: {
    register() {
      if (!this.name) {
        alert("ユーザーネームが入力されていません。");
        return;
      }
      if (!this.email) {
        alert("メールアドレスが入力されていません。");
        return;
      }
      if (!this.password) {
        alert("パスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.addUser();
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              return;
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              return;
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              return;
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              return;
              break;
          }
        });
    },
    addUser() {
      const sendData = {
        name: this.name,
        email: this.email,
        password: this.password,
        uid: firebase.auth().currentUser.uid
      };
      this.$store.dispatch('addUser', sendData)
    }
  },
  components: {
    Header
  },
};
</script>

<style scoped>
.register {
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

input[type="text"],
input[type="email"],
input[type="password"] {
  border-radius: 8px;
  border: 1px solid gray;
  height: 35px;
  width: 300px;
}

button {
  border-radius: 20px;
  background-color: blue;
  color: #fff;
  padding: 8px 20px;
  border: none;
}

button:hover {
  cursor: pointer;
}
</style>