<template>
	<view>
		<web-view id="iframe" :src="baseUrl"></web-view>
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
			start(){
				this.timer = setInterval(this.checkLogin, 500);
			  },
			checkLogin(){
				var pages = getCurrentPages();  
				var page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				var currentWebview = page.$getAppWebview();
				// #endif
				if(currentWebview.children()[0].getURL()!=base.baseUrl+'xtgl/login_slogin.html')
					uni.navigateBack(1)
			},
			back()
			{
				uni.navigateBack(2)
			}
		},
		mounted() {
		        this.start()
		    },
		onUnload() {
			clearInterval(this.timer)
		}
	}
</script>

<style scoped>
	iframe
	{
		width: 100%;
		height: 500px;
		border: none;
	}
	.okbutton
	{
		position: absolute;
		bottom: 120px;
		width: calc(100% - 40px);
		left: 20px;
		height: 46px;
		text-align: center;
		line-height: 46px;
		border-radius: 25px;
		background-color: #f1f1f1;
	}
</style>
