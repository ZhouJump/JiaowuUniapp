<template>
	<view class="acgnews">
		<view class="title">ACG日报</view>
		<swiper autoplay circular class="swiper">
			<swiper-item @click="goto(item.url)" v-for="(item,index) in list">
					<image class="image" mode="aspectFill" :src="item.picUrl"></image>
					<view class="newstitle">{{item.title}}></view>
					<view class="from">{{item.source}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]	
			}
		},
		methods: {
			refresh(){
				uni.request({
					url:'https://apis.tianapi.com/dongman/index?key=8a04834706f18b032b3262f7055fd2eb',
					success: (res) => {
						this.list = res.data.result.newslist
					}
				})
			},
			goto(url){
				uni.navigateTo({
					url:'/pages/apps/webview?url='+url
				})
			}
		},
		mounted() {
			this.refresh()
		}
	}
</script>

<style scoped>
	.acgnews{
		position: relative;
		height: 200px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #f0f0f0;
		border-radius: 16px;
		overflow: hidden;
	}
	.from{
		position: absolute;
		right: 8px;
		top:8px;
		font-size: 14px;
		padding: 4px 8px 4px 8px;
		background-color: #00000088;
		border-radius: 20px;
		color: white;
	}
	.newstitle{
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 14px;
		padding: 8px;
		box-sizing: border-box;
		color: white;
		background-image: linear-gradient(#00000000,#000000ff);
	}
	.swiper{
		position: absolute;
		top:0;
		width: 100%;
		height: 100%;
	}
	.image{
		width: 100%;
		height: 100%;
	}
	.title{
		font-size: 16px;
		margin-top: 4px;
		margin-left: 4px;
		position: absolute;
		color: #323232;
		padding: 4px 8px 4px 8px;
		background-color: white;
		border-radius: 20px;
		z-index: 2;
	}
	.word{
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		position: relative;
	}
</style>
