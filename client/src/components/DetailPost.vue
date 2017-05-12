<template>
<div>
  <div class="ui internally celled grid">
    <div class="row">
      <div class="ten wide column">
        <div class="ui segment">
          <img class="ui centered medium image" v-bind:src="post.imageUrl">
          <p>{{ post.description }}</p>
          </div>
      </div>
      <div class="three wide column">
        <!-- <img class="ui centered medium image" v-bind:src="post.rsvp.imageUrl"> -->
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
