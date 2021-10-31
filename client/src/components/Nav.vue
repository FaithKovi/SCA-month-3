<template>
  <div class="header">
    <nav class="container d-flex justify-content-between align-items-center">
      <div>
      <h1>Admin</h1>
      <p class="small mb-0">{{user.email}}</p>
      </div>
      <div> 
    <button  class="app-btn btn btn-lg" v-if="isUserLoggedIn" @click="logout">
      Logout
    </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Nav',
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}

</script>
<style>

</style>