<template>
  <div id="app">
		<navbar></navbar>
		<div class="ui items segment padtop-6 container">
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

</style>
