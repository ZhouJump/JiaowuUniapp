<template>
	<view class="kaoshi">
		<view class="title">近期考试</view>
		<view class="box">
			<view class="item" v-for="item in kaoshi" v-show="(item.kssj.slice(5,7)-0>=month&&item.kssj.slice(8,10)-0>=day)||item.kssj.slice(5,7)-0>month">
				<view class="ksmc">{{item.kcmc}}</view>
				<view class="ksmc">{{item.cdmc}}</view>
				<view class="ksmc"><text v-show="item.kssj.slice(5,7)-0 > month-0">{{item.kssj.slice(5,7)-0-(month-0)}}月</text>{{item.kssj.slice(8,10)-0-(day-0)}}天后考试</view>
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
			
		},
		mounted() {
			let data = new Date
			this.day = data.getDate()
			this.month = data.getMonth() + 1
		}
	}
</script>

<style scoped>
	.kaoshi{
		height: 180px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #eaeaea;
		line-height: 40px;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.title{
		font-size: 14px;
		padding-left: 20px;
		height: 14px;
		width: 100%;
	}
	.box{
		width: calc(100% - 20px);
		height: calc(100% - 40px);
		overflow: hidden;
		overflow-y: auto;
	}
	.item{
		width: 100%;
	}
</style>
