<template>
<div class="navbar">
  <nav class="ui menu red inverted navbar page grid" style="margin-bottom: 0px">
    <a href="" class="brand item"><h2>{{ logo }}</h2></a>
    <div class="right menu" v-if="login">
      <div class="item"><button class="ui green button" id="btnLogin">Sign in</button></div>
      <div class="item"><button class="ui orange button" id="btnSignup">Sign up</button></div>
      <div class="item"><a class="ui primary button" v-on:click="loginFB">SignIn FB</a></div>
    </div>
    <div class="right menu" v-else>
      <div class="item">
        <h3>Welcome, {{ signin.username }}</h3></div>
      <div class="item"><button class="ui yellow button" v-on:click="signOut">Sign out</button></div>
    </div>
  </nav>

  <div class="ui small modal four grid" id="modalLogin">
    <i class="close icon"></i>
    <div class="ui center aligned header">
      <h3>Sign in</h3>
    </div>
    <div class="ui content grid container">
      <div class="content">
        <div class="ui form fluid">
          <div class="field">
            <label>Username</label>
            <input class="ui left action fluid icon input" v-model="signin.username" placeholder="Username" type="text">
          </div>
          <div class="field">
            <label>Password</label>
            <input class="ui left action fluid icon input" v-model="signin.password" placeholder="Password" type="password">
          </div>

          <button id="btnSubmitLogin" class="ui button green" v-on:click="onLogin">Sign in</button>
        </div>
      </div>
    </div>

  </div>

  <div class="ui small modal four grid" id="modalSignup">
    <i class="close icon"></i>
    <div class="ui center aligned header">
      <h3>Sign up</h3>
    </div>

    <div class="ui doubling stackable content grid container">
      <div class="content">
        <div class="ui fluid form">
          <div class=" field">
            <label>Name</label>
            <input class="ui left action fluid icon input" v-model="signup.name" placeholder="Name" type="text">
          </div>
          <div class=" field">
            <label>Username</label>
            <input v-model="signup.username" placeholder="Username" type="text">
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="signup.password" placeholder="Password" type="password">
          </div>
          <div class=" field">
            <label>Email</label>
            <input v-model="signup.email" placeholder="Email" type="email">
          </div>
          <div class=" field">
            <label>Phone</label>
            <input v-model="signup.phone" placeholder="Phone" type="text">
          </div>
          <div class=" field">
            <label>Image Url</label>
            <input v-model="signup.imageUrl" placeholder="Image Url" type="text">
          </div>
          <button id="btnSubmitRegister" class="ui button blue" v-on:click="onRegister">Sign up</button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      logo: 'MeetupYuk',
      login: true,
      signin: {
        username: '',
        password: ''
      },
      signup: {
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        imageUrl: '',
				role: 'client'
      }
    }
  },
  methods: {
    onLogin: function() {
      let self = this
      axios.post('http://localhost:3000/auth/signin', {
				username: self.signin.username,
				password: self.signin.password,
        })
        .then(response => {
          if (response.data.hasOwnProperty('error')) {
            self.message = response.data.error.errmsg
          } else {
            console.log(response)
            self.login = false;
            localStorage.setItem('token', response.data);
            this.$router.push('/posts');
          }
        })
        .catch(error => {
          alert('error')
          console.log(error)
        })
    },
    onRegister: function() {
      let self = this
      axios.post('http://localhost:3000/auth/signup', {
          name: self.signup.name,
          username: self.signup.username,
          password: self.signup.password,
					email: self.signup.email,
					phone: self.signup.phone,
					imageUrl: self.signup.imageUrl,
          role: self.signup.role
        })
        .then(response => {
          if (response.data.hasOwnProperty('err')) {
            console.log(response.data);
            console.log(err);
          } else {
						self.signin.username = self.signup.username,
						self.signin.password = self.signup.password,
            self.onLogin()
            console.log(response);
          }
        })
        .catch(err => {
          alert('error')
        })
    },

    signOut: function() {
      localStorage.removeItem('token');
      let self = this
      self.login = true;
      FB.logout(function(response) {
        console.log('sudah logout');
      });
      window.location.href = 'index.html'
    },
    loginFB: function() {
      let self = this
      FB.login(function(response) {
        if (response.status === 'connected') {
          FB.api('/me', 'GET',
					{
            fields: 'first_name,last_name,name,id'
          },
					 function(response) {
            if (response) {
							self.signin.username = response.first_name + "_" + response.last_name
							self.signin.password = response.name
              self.signup.name = response.name
              self.signup.username = response.first_name + "_" + response.last_name
              self.signup.password = response.name
              self.signup.email = `${response.name}@facebook.com`
							self.signup.phone = "085794279912"
							self.signup.imageUrl = "www.facebook.com"
              self.onRegister()
            } else {
              console.log('belum login')
            }
						console.log('FB ',response)
          });
        } else if (response.status === 'not_authorized') {
          console.log('We are not logged in.')
        } else {
          console.log('You are not logged into Facebook.');
        }
      }, {
        scope: 'email'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
