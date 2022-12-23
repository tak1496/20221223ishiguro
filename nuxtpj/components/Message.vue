<template>
  <div class="container">
    <div class="div_home">
      <table class="tbl_home">
        <tr>
          <td class="tbl_home_th">ホーム</td>
        </tr>

        <tr v-for="(data, key) in this.$store.state.post_list">
          <td class="tbl_home_td">
            <table class="tbl_post">
              <tr>
                <td>{{ data.users.name }}</td>
                <td v-on:click="like(key)">
                  <img src="/img/heart.png" class="img_icon"/>
                </td>
                <td v-bind:key="key">{{ data.posts_count }}</td>
                <td v-if="id == data.user_id" v-on:click="post_del(data.id)">
                  <img src="/img/cross.png" class="img_icon"/>
                </td>
                <td v-else></td>
                <td v-on:click="comment(data.id)">
                  <img src="/img/detail.png" class="img_icon"/>
                </td>
              </tr>
            </table>
            <div class="div_post">{{ data.post }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      id: null,
      name: null,
      email: null,
      password: null,
      post_list: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.id = this.$store.state.id;
        this.name = this.$store.state.name;
        this.email = this.$store.state.email;
        this.password = this.$store.state.password;
        this.$store.commit('postList');
      } else {
        this.$router.push('/login')
      }
    })
  },
  methods: {
    comment(post_id) { 
      this.$router.push({ path: 'post_id', query: { post_id: post_id} });
    },
    post_del(post_id) { 
      let flg = window.confirm('投稿を削除します');
      if (flg) {
        const sendData = {
          post_id: post_id,
          user_id: this.id,
        };
        this.$store.dispatch('delPost', sendData);
      }
    },
    like(value) {
      const sendData = {
        post_id: this.$store.state.post_list[value].id,
        user_id: this.id,
        posts_count: this.$store.state.post_list[value].posts_count,
        method: 'postList',
        like_id: null
      };
      this.$store.dispatch('like', sendData);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}

.tbl_home {
  width: 100%;
  border-collapse: collapse;
}

.tbl_home_th {
  border: 1px solid #fff;
  width: auto;
  height: 40px;
  padding-left: 20px;
  font-weight: bold;
}

.tbl_home_td {
  border: 1px solid #fff;
  width: auto;
  padding: 15px;
  vertical-align: top;
}

.tbl_post {
  border-collapse: collapse;
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

.div_post {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>