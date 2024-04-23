<template>
	<view>
		{{week}}
	</view>
</template>

<script>
	import base from "/common/base.js"
	export default {
		data() {
			return {
				week:base.getWeek()
			}
		},
		methods: {
		
		},
		}
</script>

<style>

</style>
