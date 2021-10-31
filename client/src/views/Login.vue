<template>
  <div class="auth-wrapper">
    <div class="col-lg-6 mx-auto form-holder">
    <form @submit.prevent="loginUser" class="app-form">
      <div class="mt-5">
        <h4 class="text-center app-heading">
          Welcome, Admin!
        </h4>
        <p class="text-center text-muted app-paragraph">
          Login to get started
        </p>
      </div>
      <div class="form-group">
			<input type="email" name="" class="form-input" v-model="email" placeholder="Email" required>
		</div>
		<div class="form-group">
			<input type="password" name="" class="form-input" v-model="password" placeholder="Password" required>
		</div>
    <div class="mt-3 mb-3 d-flex justify-content-center" v-if="isLoading">
      <div class="loader"></div>
    </div>
    <button type="submit" class="app-btn btn btn-lg">Login</button>
    <div class="mt-4">
      <p class="text-muted small">Don't have an account? Contact Admin to get an account </p>
    </div>
    </form>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  data() {
    return {
    email:'',
    password:'',
    isLoading:false
    }
  },
   head: {
    title: {
      inner: 'Student Admin - Login'
    },
    },
  methods: {
    loginUser(){
      this.isLoading = true;
      AuthService.login({
        email: this.email,
				password: this.password
      }).then(res => {
        if(res.data.error) {
      this.$swal(`${res.data.error}`);
       this.isLoading = false;
        } else {
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
        this.isLoading = false
        this.$router.push({
					name: 'Dashboard'
				});
        }

      }).catch(error=> {
        console.log(error);
         this.isLoading = false;
      })
      
    },
  }
}
</script>
<style>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-wrapper  .form-holder {
  box-shadow: 0 10px 8rem rgba(0,0,0,0.08);
  min-height: 300px;
  text-align: center;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
}
.auth-wrapper  .form-holder form {
  width: 100%;
}
</style>