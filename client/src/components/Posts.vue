<template>
<div class="ui items">
  <div class="ui left action fluid icon input">
    <input type="text" placeholder="Filter by title.." class="home-search-input" v-model="filterTitle">
  </div>
  <hr>

  <div class="ui link cards">
    <div class="card" v-for="post in filteredTitle">
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

// declare firebase here

export default {
  // name: 'posts',
  data() {
    return {
      listPost: [],
      filterTitle: ''
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
		}
  },
  created() {
    this.listItems()
  },
  computed: {
    filteredTitle: function() {
      let self = this;
        return self.listPost.filter(function(post) {
          return post.title.indexOf(self.filterTitle) !== -1;
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
