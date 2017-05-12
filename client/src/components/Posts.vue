<template>
<div class="ui items">
  <div class="ui left action fluid icon input">
    <input type="text" placeholder="Filter by title.." class="home-search-input" v-model="filterTitle">
  </div>
  <hr>

  <div class="ui link cards">
    <div class="card" v-for="post in filteredTitle">
      <div class="image" v-on:click="singlePost(post._id)">
        <img v-bind:src="post.imageUrl">
      </div>
      <div class="content">
        <div class="header"><a v-on:click="singlePost(post._id)"> {{ post.title }} </a></div>
        <div class="meta">
          <a>{{ post.time }}</a>
        </div>
        <div class="description">
          {{ post.description }}
        </div>
      </div>
      <div class="extra content">

        <span class="left floated ui orange button">
          <i class="users icon"></i>
          {{post.rsvp.length}} Members going
        </span>

        <span class="right floated ui green button" v-on:click="rsvp(post._id)">
          RSVP
        </span>

      </div>
    </div>
  </div>

</div>
</template>



<script>

// declare firebase here

// require('dotenv').config();

// var config = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId
// };
// firebase.initializeApp(config);

var config = {
  apiKey: "AIzaSyA5qfMCJQY2hNWUfoqrCliwgNtm2nsoLUE",
  authDomain: "noobijoe.firebaseapp.com",
  databaseURL: "https://noobijoe.firebaseio.com",
  projectId: "noobijoe",
  storageBucket: "noobijoe.appspot.com",
  messagingSenderId: "252696857462"
};
firebase.initializeApp(config);


var database = firebase.database();

function writePostData(secretKey, post_id) {
  firebase.database().ref('posts/' + secretKey).set({
    post_id: post_id
  });
  console.log('----> write')
}


export default {
  // name: 'posts',
  data() {
    return {
      listPost: [],
      filterTitle: '',
      secretKey: 'secretKey'
    }
  },
  methods: {
    listItems() {
      let self = this;
      axios.get('http://localhost:3000/posts', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          if (response.config.headers.token == null) {
            alert('Please login!')
          } else {
            self.listPost = response.data.records;
            console.log('postnya ', response.data.records);
          }
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    },
		singlePost(id){
			this.$router.push('/detail-post/'+id);
		},
    rsvp(id) {
      // alert(`id='${id}'`)

      axios.post('http://localhost:3000/posts/' + id + '/addRsvp', {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response);

        console.log(this.listPost);

        if(response.data.hasOwnProperty('_id')) {

          this.listPost.map( p => {
            if(p.id == id) {
              p.rsvp.push(id)
            }
          })

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


    }
  },
  created() {
    this.listItems()

    let self = this;
    var listenToPost = firebase.database().ref('posts/' + this.secretKey );
    listenToPost.on('value', function(snapshot) {
      // updateStarCount(postElement, snapshot.val());
      console.log("listen: ", snapshot.val());
      // app.changes(snapshot.val().post_id);
      self.listItems()
      firebase.database().ref('posts/'+self.secretKey).remove();

    });

  },
  computed: {
    filteredTitle: function() {
      let self = this;
        return self.listPost.filter(function(post) {
          let lowerCaseTitle = post.title.toLowerCase();
          return lowerCaseTitle.indexOf(self.filterTitle) !== -1;
        })
    }
  }

} // end of export





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
