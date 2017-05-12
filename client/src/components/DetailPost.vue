<template>

<div class="ui internally celled grid">
  <div class="row">
    <div class="nine wide column">
      <div class="ui card">
        <div class="image">
          <img v-bind:src="post.imageUrl" draggable="true" data-bukket-ext-bukket-draggable="true">
        </div>
        <div class="content">
          <a class="header">{{ post.title }}</a>
          <div class="meta">
            <span class="date">{{ post.time }}</span>
          </div>
          <div class="description">
            {{ post.place }}
          </div>
        </div>
        <div class="extra content">
          <a>
            <i class="user icon"></i>
            22 Friends
          </a>
        </div>
      </div>
    </div>
    <div class="three wide column">
      <button class="ui primary button">
        <i class="user icon"></i>
          Join or RSVP
      </button>
    <div class="ui list">
      <div class="item" v-for="user in post.rsvp">
        <img class="ui avatar image" v-bind:src="user.imageUrl" draggable="true" data-bukket-ext-bukket-draggable="true">
        <div class="content">
          <a class="header">{{user.name}}</a>
          <div class="description">On going</div>
        </div>
      </div>
  </div>
  </div>
  </div>
  
</div>
</div>
</template>
<script>
export default {
name: 'detailPost',
props: ['id'],
data() {
return {
post : {},
}
},
  methods: {
    getPostId() {
let self = this
axios.get(`http://localhost:3000/posts/${this.id}`, {
headers: {
token: localStorage.getItem('token')
}
})
.then(response => {
if (response.config.headers.token == null) {
alert('Please login!')
} else {
self.post = response.data
console.log('postnya ', response)
}
})
.catch(error => {
alert('Please login!')
console.log("Please login!")
})
},
  },
  created(){
    this.getPostId()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>