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
		box-shadow: 0 0 4px 2px #eaeaea;
		line-height: 40px;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.title{
		font-size: 16px;
		padding-left: 20px;
		height: 14px;
		width: 100%;
	}
	.box{
		width: calc(100% - 20px);
		height: calc(100% - 40px);
		overflow: hidden;
		border-radius: 4px;
		overflow-y: auto;
	}
	.item{
		width: 100%;
		height: 80px;
		margin-top: 6px;
		border-radius: 4px;
		position: relative;
		background-color: #d8daff;
	}
	.ksmc{
		font-size: 16px;
		height: 30px;
		padding-left: 16px;
		color: blue;
	}
	.ksmc:nth-child(2){
		font-size: 14px;
		color: #7c7eff;
	}
	.fence{
		width: 6px;
		height: 60px;
		position: absolute;
		background-color: #5454ff;
		top:10px;
		left: 6px;
		border-radius: 3px;
	}
</style>
