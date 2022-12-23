import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      id: null,
      name: null,
      email: null,
      password: null,
      post_list: [],
      comment_list: null,
      like: null,
      post_user_id: null,
      post_user_name: null,
      post_count: null,
      post: null
    },
    mutations: {
      setUser(state, value) {
        state.id = value.id;
        state.name = value.name;
        state.email = value.email;
        state.password = value.password;
      },
      async postList(state) {
        await this.$axios.get("http://127.0.0.1:8000/api/post/")
        .then(result => {
          state.post_list = result.data.data;
          state.post_list = JSON.stringify(state.post_list)
          state.post_list = JSON.parse(state.post_list)
        });
      },
      async postData(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/post/post_data", sendData)
          .then(result => {
            let pos = result.data.data;
            pos = JSON.stringify(pos)
            pos = JSON.parse(pos)
            state.post_user_id = pos.user_id;
            state.post_user_name = pos.users.name;
            state.post_count = pos.posts_count;
            state.post = pos.post;
        });
      },
      async commentList(state,sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/comment/comment_list", sendData)
        .then(result => {
          state.comment_list = result.data.data;
          state.comment_list = JSON.stringify(state.comment_list)
          state.comment_list = JSON.parse(state.comment_list)
        });
      }
    },
    actions: {
      async addUser(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/user/", sendData)
        .then(result => {
          let value = {
            id: result.data.data.id,
            name: result.data.data.name,
            email: result.data.data.email,
            password: result.data.data.password,
          }
          state.commit('setUser', value);
          alert('登録しました');
          this.$router.push({ path: '/' });
        });
      },

      async search_user(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/user/search", sendData)
          .then(result => {
          let value = {
            id: result.data.data.id,
            name: result.data.data.name,
            email: result.data.data.email,
            password: result.data.data.password,
          }
          state.commit('setUser', value);

          this.$router.push({ path: '/' });
        });
      },
    
      async addPost(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/post/", sendData)
        .then(result => {
          state.commit('postList');
          alert('登録しました');
        });
      },

      async delPost(state, sendData) {
        await this.$axios.delete("http://127.0.0.1:8000/api/post/"+ sendData.post_id)
        .then(result => {
          state.commit('postList', sendData.user_id);
        });
      },

      async addComment(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/comment/", sendData)
          .then(result => {
          state.commit('commentList', sendData);
          alert('コメントを登録しました');
        });
      },

      async like(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/like/like_search", sendData)
        .then(result => {
          state.like = result.data.data;
          state.like = JSON.stringify(state.like)
          state.like = JSON.parse(state.like)

          sendData.like_id = state.like[0].id
          if (state.like[0].id) {
            state.dispatch('delLike', sendData);
          }
        }).catch(function (error) {
          state.dispatch('addLike', sendData);
        });
      },

      async addLike(state, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/like", sendData)
          .then(result => {
          switch (sendData.method) {
            case 'postList':
              state.commit('postList');
              break;
            case 'postData':
              state.commit('postData', sendData);
              break;
          }
        });
      },

      async delLike(state, sendData) {
        let id = sendData.like_id;
        await this.$axios.delete("http://127.0.0.1:8000/api/like/"+ id)
        .then(result => {
          switch (sendData.method) {
            case 'postList':
              state.commit('postList');
              break;
            case 'postData':
              state.commit('postData', sendData);
              break;
          }
        });
      },

    }
  })
}

export default createStore