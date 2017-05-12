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
            {{ post.rsvp.length }} Members going
          </a>
        </div>
      </div>
    </div>
    <div class="three wide column">
      <button class="ui primary button" v-on:click="rsvp(post._id)">
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

// Firebase config is defined in Posts.vue
var database = firebase.database();

function writePostData(secretKey, post_id) {
  firebase.database().ref('posts/' + secretKey).set({
    post_id: post_id
  });
  console.log('----> write')
}




export default {
  name: 'detailPost',
  props: ['id'],
  data() {
    return {
      post : { rsvp:[] },
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
    }, // end of getPostId
    rsvp(id) {
      axios.post('http://localhost:3000/posts/' + id + '/addRsvp', {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response);

        console.log(this.listPost);

        if(response.data.hasOwnProperty('_id')) {

          // this.post.rsvp.push(id);
          this.getPostId();
          writePostData(this.secretKey, id);
          console.log("RSVP successful")
        }
        else(
          alert('You have RSVP for this event')
        )

      })
      .catch(error => {
        alert('Please Login to RSVP this Event')
        console.log('Please Login to RSVP this Event')
      })

    } // end of rsvp
  },
  created(){
    this.getPostId()

    let self = this;
    var listenToPost = firebase.database().ref('posts/' + this.secretKey );
    listenToPost.on('value', function(snapshot) {
      // updateStarCount(postElement, snapshot.val());
      console.log("listen: ", snapshot.val());
      // app.changes(snapshot.val().post_id);
      self.getPostId()
      firebase.database().ref('posts/'+self.secretKey).remove();
    })
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
