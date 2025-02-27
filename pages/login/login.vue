<template>
	<view class="cont">
		<view class="text">请在下方完成正方教务系统登录</view>
		<iframe class="iframe" :src="baseUrl"></iframe>
		<view @click="back" class="okbutton">完成登录？点我返回</view>
	</view>
</template>

<script>
	import base from "/common/base.js"
	export default {
		data() {
			return {
				baseUrl:base.baseUrl+'xtgl/login_slogin.html',
			}
		},
		methods: {
			back()
			{
				uni.navigateBack(2)
			}
		},
		mounted() {
		},
	}
</script>

<style scoped>
	.cont{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.text{
		height: 40px;
		line-height: 40px;
		margin: 40px 20px 0;
	}
	.iframe
	{
		width: 100%;
		flex: 1;
		border: none;
	}
	.okbutton
	{
		margin: 20px auto 60px;
		width: calc(100% - 40px);
		height: 46px;
		text-align: center;
		line-height: 46px;
		border-radius: 25px;
		background-color: #f1f1f1;
	}
</style>
