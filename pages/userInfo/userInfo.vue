<template>
	<view>
		<view class="topbox">
			<view v-if="loginstate != 'logout'" class="namebox">{{name}}<i class="bi bi-caret-right-fill"></i></view>
			<view v-if="loginstate == 'logout'" @click="gotologin" class="namebox">立即登录<i class="bi bi-caret-right-fill"></i></view>
			<view v-if="loginstate != 'logout'" class="schoolnamebox">{{xueyuan}}</view>
			<view class="avtarbox"><i class="bi bi-person-fill"></i></view>
		</view>
		<view class="infobox">
			<view v-if="loginstate != 'logout'">学号:{{id}}</view>
			<view v-if="loginstate != 'logout'">专业:{{zy}}</view>
			<view v-if="loginstate != 'logout'">方向:{{fx}}</view>
			<i v-if="loginstate == 'offline'" @click="gotologin" class="bi bi-arrow-clockwise refresh"></i>
		</view>
		<view v-if="loginstate == 'online'" class="quitbutton">退出登录</view>
	</view>
</template> 

<script>
	import base from "/common/base.js"
	export default {
		data() {
			return {
				loginstate:localStorage.getItem('loginstate'),
				name:localStorage.getItem('username'),
				xueyuan:localStorage.getItem('userxueyuan'),
				id:localStorage.getItem('userid'),
				fx:localStorage.getItem('userfx'),
				zy:localStorage.getItem('userzy'),
			}
		},
		methods: {
			gotologin(){
				uni.navigateTo({
					url:'/pages/login/login',
				})
			},
			checkLogin()	{
				uni.request({
					url:base.baseUrl+'cjcx/cjcx_cxXsgrcj.html?doType=query&xnm=2023&xqm=12',
					success: (res) => {
						if(res.data.length != undefined)
						  {
							console.log('登录失效')
							if(this.loginstate == undefined || this.loginstate == 'logout')
								this.loginstate = 'logout'
							else
								this.loginstate = 'offline'
						  }
					  else
						  {
							  this.loginstate = 'online'
							  console.log(res.data.items[0])
							  this.name = res.data.items[0].xm
							  this.xueyuan = res.data.items[0].zsxymc
							  this.id = res.data.items[0].xh
							  this.fx = res.data.items[0].zyfxmc
							  this.zy = res.data.items[0].zymc
						  }
						  localStorage.setItem('loginstate',this.loginstate)
						  localStorage.setItem('username',this.name)
						  localStorage.setItem('userxueyuan',this.xueyuan)
						  localStorage.setItem('userid',this.id)
						  localStorage.setItem('userfx',this.fx)
						  localStorage.setItem('userzy',this.zy)
					}
				})
			}
		},
		mounted() {
			this.checkLogin()
		}
	}
</script>

<style>
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: relative;
	}
	.namebox
	{
		position: absolute;
		bottom: 40%;
		left: 40px;
		font-size: 20px;
		font-weight: 600;
		color: #232323;
	}
	.schoolnamebox
	{
		position: absolute;
		bottom: 30%;
		left: 41px;
		font-size: 10px;
		color: #232323;
	}
	.avtarbox{
		position: absolute;
		background-color: gray;
		width: 80px;
		height: 80px;
		border-radius: 40px;
		right: 40px;
		bottom: 30%;
		text-align: center;
		line-height: 80px;
		color: lightgray;
		font-size: 50px;
	}
	.infobox
	{
		background-color: white;
		box-shadow: 0 0 6px lightgray;
		width: calc(100% - 40px);
		height: 100px;
		left: 20px;
		border-radius: 8px;
		top:180px;
		position: absolute;
		box-sizing: border-box;
		padding: 16px;
	}
	.infobox view{
		font-size: 14px;
		margin: 2px;
	}
	.quitbutton
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
		color: palevioletred;
	}
	.refresh
	{
		font-size: 30px;
		background: blue;
		width: 40px;
		height: 40px;
		display: block;
		color: white;
		text-align: center;
		line-height: 40px;
		border-radius: 20px;
		position: absolute;
		right: 20px;
	}
</style>
