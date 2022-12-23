<template>
  <div class="main_layout">
    <SideNav />
    <Message />
  </div>
</template>

<script>
//import { allowedNodeEnvironmentFlags } from 'process'
import firebase from '~/plugins/firebase'
import SideNav from "@/components/SideNav.vue"
import Message from "@/components/Message.vue"

export default {
  data() {
    return {
      id: this.$store.state.id,
      name: this.$store.state.name,
      email: this.$store.state.email,
      password: this.$store.state.password,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.id == null) { 
          this.$router.push('/login')
        }
      } else {
        this.$router.push('/login')
      }
    })
  },
  components: {
    SideNav,
    Message
  },
}
</script>

<style>
body {
  background: #000000;
  color: #ffffff;
}

a {
  color: #ffffff;
}

.main_layout {
  display: flex;
}
</style>