<template>
	<view class="manbox">
		<cast-info></cast-info>
		<banner></banner>
		<kaoshi></kaoshi>
	</view>
</template>

<script>
	import base from "/common/base.js"
	import banner from "/pages/home/banner.vue"
	import castInfo from "/pages/home/cast.vue"
	import kaoshi from "/pages/home/kaoshi.vue"
	export default {
		data() {
			return {
				week:20
			}
		},
		methods: {
		
		},
		components:{
			castInfo:castInfo,
			banner:banner,
			kaoshi:kaoshi,
		},
		}
</script>

<style scoped>
	.manbox{
		position: absolute;
		width: 100%;
		height: calc(100% - 120px);
		top: 40px;
		display: flex;
		justify-content: center;
		align-content: start;
		flex-wrap: wrap;
	}
	page{
		height: 100%!important;
	}
</style>
