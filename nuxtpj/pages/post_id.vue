<template>
  <div class="main_layout">
    <SideNav />
    <div class="div_comment">
      <table class="tbl_comment">
        <tr>
          <th class="tbl_home_th">ホーム</th>
        </tr>

        <tr>
          <td class="tbl_comment_td">
            <table class="tbl_post">
              <tr>
                <td>{{ this.$store.state.post_user_name }}</td>
                <td v-on:click="like()">
                  <img src="/img/heart.png" class="img_icon" />
                </td>
                <td>{{ this.$store.state.post_count }}</td>

                <td v-if="id == this.$store.state.post_user_id" v-on:click="post_del(post_id)">
                  <img src="/img/cross.png" class="img_icon" />
                </td>
                <td v-else></td>

                <td v-on:click="home()">
                  <img src="/img/detail.png" class="img_icon" />
                </td>
              </tr>
            </table>
            <div>{{ this.$store.state.post }}</div>
          </td>
        </tr>

        <tr>
          <th class="tbl_comment_th">コメント</th>
        </tr>

        <tr v-for="(data, key) in this.$store.state.comment_list">
          <td class="tbl_comment_td">
            <div>{{ data.users.name }}</div>
            <div>{{ data.comment }}</div>
          </td>
        </tr>

        <tr>
          <td class="tbl_comment_td_form">
            <validation-observer ref="obs" v-slot="ObserverProps">
              <validation-provider v-slot="ProviderProps" rules="required|max:120">

                <input type="text" name="コメント" v-model="comment" class="comment" />

                <div class="error">{{ ProviderProps.errors[0] }}</div>
                <div class="div_btn_comment">
                  <button v-on:click="addComment" :disabled="ObserverProps.invalid || !ObserverProps.validated"
                  class="btn_comment">コメント</button>
                </div>
              </validation-provider>
            </validation-observer>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import SideNav from "@/components/SideNav.vue"

export default {
  data() {
    return {
      id: this.$store.state.id,
      name: this.$store.state.name,
      email: this.$store.state.email,
      password: this.$store.state.password,
      comment: '',
      post_id: this.$route.query.post_id,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.id == null) {
          this.$router.push('/login')
        } else {
          const sendData = {
            post_id: this.post_id,
          };
          this.$store.commit('postData', sendData);
          this.$store.commit('commentList', sendData);
        }
      } else {
        this.$router.push('/login')
      }
    })
  },
  components: {
    SideNav
  },
  methods: {
    home() { 
      this.$router.push('/');
    },
    addComment() { 
      const sendData = {
        post_id: this.post_id,
        user_id: this.id,
        user_name: this.name,
        comment: this.comment
      };
      this.$store.dispatch('addComment', sendData)
      this.comment = '';
      this.$refs.obs.reset();
    },
    post_del(post_id) {
      let flg = window.confirm('投稿を削除します');
      if (flg) {
        const sendData = {
          post_id: this.post_id,
          user_id: this.id,
        };
        this.$store.dispatch('delPost', sendData);
        this.$router.push('/');
      }
    },
    like() {
      const sendData = {
        post_id: this.post_id,
        user_id: this.id,
        posts_count: this.$store.state.post_list[0].posts_count,
        method: 'postData',
        like_id: null
      };
      this.$store.dispatch('like', sendData);
    }
  }
}
</script>

<style scoped>
body {
  width: 100%;
}

.main_layout {
  display: flex;
}

.div_comment {
  width: 100%;
}

.tbl_comment {
  width: 100%;
  border-collapse: collapse;
}

.tbl_home_th {
  border: 1px solid #fff;
  width: auto;
  height: 40px;
  padding-left: 20px;
  font-weight: bold;
  text-align: left;
}

.tbl_comment_td {
  border: 1px solid #fff;
  width: auto;
  padding: 15px;
  vertical-align: top;
}

.tbl_post {
  border-collapse: collapse;
}

.tbl_comment_th {
  border: 1px solid #fff;
  width: auto;
  height: 40px;
  padding-left: 20px;
  font-weight: bold;
}

.img_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.tbl_post td {
  padding: 0 4px;
}

.tbl_post td:nth-of-type(5) {
  padding-left: 30px;
}

.tbl_comment_td_form {
  padding: 20px;
}

.comment {
  border-radius: 10px;
  background-color: #000;
  border: 1px solid #fff;
  height: 40px;
  width:90%;
  color: #fff;
  font-size:16pt;
}

.div_btn_comment {
  padding: 10px 20px;
  text-align: right;
}

.btn_comment {
  background-color: blue;
  border-radius: 20px;
  color: #fff;
  font-size: 10pt;
  padding: 10px 20px;
  border: inset 1px #fff;
  cursor: pointer;
}
</style>