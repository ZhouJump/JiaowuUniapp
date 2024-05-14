<template>
	<view class="banner">
		<swiper circular indicator-dots="true" indicator-color="#B5B5FF" indicator-active-color="#0000ff" autoplay interval="4000">
			<swiper-item></swiper-item>
			<swiper-item></swiper-item>
			<swiper-item></swiper-item>
		</swiper>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo')
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.banner{
		height: 200px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #f0f0f0;
		line-height: 40px;
		border-radius: 16px;
		display: flex;
	}
	swiper{
		width: 100%;
		height: 100%;
	}
	swiper-item{
		
	}
</style>
