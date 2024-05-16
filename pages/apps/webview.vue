<template>
	<web-view progress update-title :src="src"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		methods: {
			
		},
		onLoad(e) {
			let index = e.url.indexOf('http',6)
			this.src = e.url.slice(index)
		}
	}
</script>

<style>

</style>
