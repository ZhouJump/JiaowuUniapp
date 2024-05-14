<template>
	<view class="yiyan">
		<view class="title">舔狗日记</view>
		<view class="word">{{word}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				word:'获取中',	
			}
		},
		methods: {
			refresh(){
				uni.request({
					url:'https://apis.tianapi.com/tiangou/index?key=8a04834706f18b032b3262f7055fd2eb',
					success: (res) => {
						this.word = res.data.result.content	
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
	.yiyan{
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #f0f0f0;
		border-radius: 16px;
	}
	.title{
		font-size: 16px;
		padding-left: 20px;
		margin-top: 10px;
		position: relative;
		color: #323232;
	}
	.word{
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		position: relative;
	}
</style>
