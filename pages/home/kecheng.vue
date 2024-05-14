<template>
	<view class="kaoshi" @click="gotokebiao">
		<view class="title">今日课程</view>
		<view class="box">
			<view :style="{filter:'hue-rotate('+item.color+'deg)'}" class="item" v-for="item in kaoshi" v-show="item.xqj == xqj && item.zs.includes(zhou)">
				<view class="ksmc">{{item.kcmc}}</view>
				<view class="ksmc">
					<text v-if="item.ks<=5">上午第{{item.ks}}节</text>
					<text v-if="item.ks>5&&item.ks<=9">下午第{{item.ks-5}}节</text>
					<text v-if="item.k>9">晚上第{{item.ks-9}}节</text>
					 {{item.cdmc}} {{item.xm}}
					</view>
				<view class="fence"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import base from "../../common/base.js"
	export default {
		data() {
			return {
				kaoshi:uni.getStorageSync('kebiao')!=''?JSON.parse(uni.getStorageSync('kebiao')):'',
				zhou:base.getWeekInYear() - base.startWeek,
				xqj:base.getWeek()
			}
		},
		methods: {
			gotokebiao(){
				uni.navigateTo({
					url:'/pages/apps/kebiao'
				})
			},
			refresh(){
				this.kaoshi=uni.getStorageSync('kebiao')!=''?JSON.parse(uni.getStorageSync('kebiao')):''
			}
		},
		mounted() {
			
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
		position: relative;;
	}
	.title{
		font-size: 16px;
		padding-left: 20px;
		color: #323232;
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
