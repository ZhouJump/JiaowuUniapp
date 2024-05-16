<template>
	<view class="yiyan">
		<image class="image" mode="aspectFill" :src="imgurl"></image>
		<view class="title">每日一言</view>
			<view class="word">
				{{word}}
				<br/>
				<br/>
				<text class="from">
					——
					<text v-if="wordfrom!=''">{{wordfrom}}</text>
					<text v-if="wordfrom==''">佚名</text>
				</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				word:'获取中',
				wordfrom:'',
				imgurl:'',
				imgauthor:''
				
			}
		},
		methods: {
			refresh(){
				uni.request({
					url:'https://apis.tianapi.com/one/index?key=8a04834706f18b032b3262f7055fd2eb',
					success: (res) => {
						this.word = res.data.result.word
						this.wordfrom = res.data.result.wordfrom
						this.imgurl = res.data.result.imgurl
						this.imgauthor = res.data.result.imgauthor
						
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
		position: relative;
		height: 200px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		/* box-shadow: 0 0 4px 2px #f0f0f0; */
		border-radius: 16px;
		overflow: hidden;
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
	.box{
		position: relative;
		width: calc(100% - 20px);
		height: calc(100% - 40px);
		overflow: hidden;
		position: relative;
		border-radius: 8px;
		margin-left: 10px;
		margin-top: -5px;
	}
	.image{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0;
		filter: blur(2px);
	}
	.word{
		line-height: 20px;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		position: absolute;
		top:40px;
		background-color: #ffffff88;
	}
	.from{
		float: right;
	}
</style>
