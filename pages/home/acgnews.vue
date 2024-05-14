<template>
	<view class="acgnews">
		<view class="title">ACG日报</view>
		<swiper class="swiper">
			<swiper-item v-for="(item,index) in list">
					<image class="image" mode="aspectFill" :src="item.picUrl"></image>
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
						console.log(this.list)
					}
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
		padding-left: 20px;
		margin-top: 10px;
		position: absolute;
		color: #323232;
	}
	.word{
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		position: relative;
	}
</style>
