<template>
<div class="ui items">
  <div class="item" v-for="post in listPost[0]">
    <div class="image">
      <img class="ui small image" v-bind:src="post.imageUrl">
    </div>
    <div class="content">
      <a class="header">{{ post.name }}</a>
      <div class="meta">
        <span>{{ post.time }}</span>
      </div>
      <div class="description">
        <p>{{ post.description }}</p>
      </div>
			<div class="extra">
        <div class="ui right floated primary button">
          Buy tickets
          <i class="right chevron icon"></i>
        </div>
        <div class="ui label">Limited</div>
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
