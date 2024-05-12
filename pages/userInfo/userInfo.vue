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
		<view v-if="loginstate == 'online'" @click="logout" class="quitbutton">退出登录</view>
	</view>
</template> 

<script>
	import base from "/common/base.js"
	export default {
		data() {
			return {
				loginstate:uni.getStorageSync('loginstate'),
				name:uni.getStorageSync('username'),
				xueyuan:uni.getStorageSync('userxueyuan'),
				id:uni.getStorageSync('userid'),
				fx:uni.getStorageSync('userfx'),
				zy:uni.getStorageSync('userzy'),
			}
		},
		methods: {
			logout(){
				var that = this
				uni.request({
					url:base.baseUrl+'logout',
					success() {
						that.checkLogin()
						uni.showToast({
							title:'已退出登录',
							duration:2000
						})
					}
				})
			},
			gotologin(){
				uni.navigateTo({
					url:'/pages/login/login',
				})
			},
			checkLogin()	{
				console.log(this.loginstate,this.name)
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
							uni.setStorageSync('loginstate',this.loginstate)
							uni.setStorageSync('username',this.name)
							uni.setStorageSync('userxueyuan',this.xueyuan)
							uni.setStorageSync('userid',this.id)
							uni.setStorageSync('userfx',this.fx)
							uni.setStorageSync('userzy',this.zy)
					},
					fail(res) {console.log("失败"+res)}
				})
			}
		},
		mounted() {
			this.checkLogin()
		}
	}
</script>

<style scoped>
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
		bottom: 54%;
		left: 40px;
		font-size: 20px;
		font-weight: 600;
		color: #232323;
	}
	.schoolnamebox
	{
		position: absolute;
		bottom: 45%;
		left: 41px;
		font-size: 12px;
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
		z-index: 2;
		text-align: center;
		line-height: 80px;
		color: lightgray;
		font-size: 50px;
	}
	.infobox
	{
		background-color: white;
		width: calc(100% - 40px);
		height: 100px;
		left: 20px;
		border-radius: 16px;
		top:120px;
		position: absolute;
		box-sizing: border-box;
		padding: 16px;
	}
	.infobox view{
		font-size: 16px;
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
