<template>
	<view class="manbox">
		<cast-info></cast-info>
		<banner></banner>
		<kaoshi ref="kaoshi"></kaoshi>
		<kecheng ref="kecheng"></kecheng>
	</view>
</template>

<script>
	import base from "/common/base.js"
	import banner from "/pages/home/banner.vue"
	import castInfo from "/pages/home/cast.vue"
	import kaoshi from "/pages/home/kaoshi.vue"
	import kecheng from "/pages/home/kecheng.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			refresh(){
				this.$refs.kaoshi.refresh()
				this.$refs.kecheng.refresh()
			}
		},
		components:{
			castInfo:castInfo,
			banner:banner,
			kaoshi:kaoshi,
			kecheng:kecheng
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
