<template>
	<view class="kaoshi" @click="gotokaoshi">
		<view class="title">近期考试</view>
		<view class="box">
			<view class="item" v-for="item in kaoshi" v-show="(item.kssj.slice(5,7)-0>=month&&item.kssj.slice(8,10)-0>=day)||item.kssj.slice(5,7)-0>month">
				<view class="ksmc">{{item.kcmc}}</view>
				<view class="ksmc">{{item.cdmc}} <text v-show="item.kssj.slice(5,7)-0 > month-0">{{item.kssj.slice(5,7)-0-(month-0)}}月</text>{{item.kssj.slice(8,10)-0-(day-0)}}天后考试</view>
				<view class="fence"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kaoshi:uni.getStorageSync('kaoshi')!=''?JSON.parse(uni.getStorageSync('kaoshi')):'',
				day:0,
				month:0
			}
		},
		methods: {
			gotokaoshi(){
				uni.navigateTo({
					url:'/pages/apps/kaoshi'
				})
			},
			refresh(){
				this.kaoshi=uni.getStorageSync('kaoshi')!=''?JSON.parse(uni.getStorageSync('kaoshi')):''
			}
		},
		mounted() {
			let data = new Date
			this.day = data.getDate()
			this.month = data.getMonth() + 1
			this.refresh()
		}
	}
</script>

<style scoped>
	.kaoshi{
		height: 200px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #f0f0f0;
		line-height: 40px;
		border-radius: 16px;
	}
	.title{
		font-size: 16px;
		padding-left: 20px;
		position: relative;
		color: #323232;
	}
	.box{
		width: calc(100% - 20px);
		height: calc(100% - 40px);
		overflow: hidden;
		overflow-y: auto;
		border-radius: 4px;
	}
	.title{
		font-size: 16px;
		padding-left: 20px;
	}
	.box{
		width: calc(100% - 20px);
		height: calc(100% - 40px);
		overflow: hidden;
		border-radius: 8px;
		overflow-y: auto;
		margin-left: 10px;
		margin-top: -5px;
	}
	.item{
		width: 100%;
		height: 60px;
		margin-bottom: 6px;
		border-radius: 8px;
		position: relative;
		background-color: #eef0ff;
	}
	.ksmc{
		font-size: 16px;
		height: 20px;
		padding-left: 20px;
		color: blue;
	}
	.ksmc:nth-child(2){
		font-size: 14px;
		color: #7c7eff;
	}
	.fence{
		width: 4px;
		height: 40px;
		position: absolute;
		background-color: #5454ff;
		top:10px;
		left: 8px;
		border-radius: 3px;
	}
</style>
