<template>
	<view>
		<iframe id="iframe" :src="baseUrl + 'xtgl/login_slogin.html'"></iframe>
		<view @click="back" class="okbutton">完成登录？点我返回</view>
	</view>
</template>

<script>
	import base from "/common/base.js"
	export default {
		data() {
			return {
				baseUrl:base.baseUrl
			}
		},
		methods: {
			start(){
				this.timer = setInterval(this.checkLogin, 1000);
			  },
			checkLogin(){
			  var iframeWindow = document.getElementById('iframe').contentWindow;
			  var currentHref = iframeWindow.document.location.href;
			  if(currentHref.includes('index'))
			  {
				this.back()
			  }
			},
			back()
			{
				uni.navigateBack(1)
			}
		},
		mounted() {
		        this.start()
		    }
	}
</script>

<style>
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
