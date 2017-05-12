<template>
  <div id="app">
		<navbar></navbar>
		<div id="front" class="ui items segment padtop-6 container">
      <router-view></router-view>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
	data() {
		return {

		}
	}
}
</script>

<style>
/*#front {
  box-shadow: none;
  border: none;
}*/
</style>
