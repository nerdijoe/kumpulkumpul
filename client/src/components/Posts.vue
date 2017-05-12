<template>
<div class="ui items">
  <div class="ui left action fluid icon input">

    <input type="text" placeholder=" Search" class="home-search-input" v-model="inputSearch">
    <div type="submit" class="ui large primary button searchbtn" v-on:click="searchPost">Search</div>

  </div>
  <hr>

  <div class="ui link cards">
    <div class="card" v-for="post in listPost[0]">
      <div class="image">
        <img v-bind:src="post.imageUrl">
      </div>
      <div class="content">
        <div class="header">{{ post.title }}</div>
        <div class="meta">
          <a>{{ post.time }}</a>
        </div>
        <div class="description">
          {{ post.description }}
        </div>
      </div>
      <div class="extra content">
        <span class="right floated ui red button" v-on:click="singlePost(post._id)">
				Read More
      	</span>
        <span class="left floated ui orange button">
        <i class="users icon"></i>
        {{post.rsvp.length}} people join
      </span>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'posts',
  data() {
    return {
      listPost: []
    }
  },
  methods: {
    listItems() {
      let self = this
      axios.get('http://localhost:3000/posts', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          if (response.config.headers.token == null) {
            alert('Please login!')
          } else {
            self.listPost = []
            self.listPost.push(response.data)
            console.log('postnya ', response)
          }
        })
        .catch(error => {
          alert('Please login!')
          console.log("Please login!")
        })
    },
		singlePost(id){
			this.$router.push('/detail-post/'+id);
		}
  },
  created() {
    this.listItems()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
