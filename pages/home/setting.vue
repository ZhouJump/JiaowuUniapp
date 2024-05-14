<template>
	<view @click="gotozujian" class="setting">
		管理小组件
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotozujian(){
				uni.navigateTo({
					url:'/pages/apps/zujian'
				})
			}
		}
	}
</script>

<style scoped>
	.setting{
		width:calc(100% - 40px);
		text-align: center;
		height: 46px;
		line-height: 46px;
		font-size: 16px;
		color: #323232;
		border-radius: 23px;
		background-color: #f5f5f5;
	}
</style>
