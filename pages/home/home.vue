<template>
	<view class="manbox">
		<cast-info></cast-info>
	</view>
</template>

<script>
	import base from "/common/base.js"
	import castInfo from "/pages/home/cast.vue"
	export default {
		data() {
			return {
				week:20
			}
		},
		methods: {
		
		},
		components:{
			castInfo:castInfo
		},
		}
</script>

<style>
	.manbox{
		position: absolute;
		width: 100%;
		height: calc(100% - 120px);
		top: 40px;
		display: flex;
		justify-content: center;
	}
	page{
		height: 100%!important;
	}
</style>
