<template>
  <div class="hello">
		<h1></h1>
		<img id="front" class="ui centered massive image" src="../assets/logo2.png">
		<!-- <h1 class="ui centered align header">Meetup-Yuk.com </h1> -->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Meetup Yuk'
    }
  },
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .ui.massive.image {
  width: auto;
 }

</style>
