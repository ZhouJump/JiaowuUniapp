<template>
	<view class="page">
		<view class="topbox">
			<view class="title">我买到的<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view class="goods-item" v-for="goods in mybuy">
				<navigator :url="'/pages/apps/ershou/xiangqin?id='+goods._id">
					<image class="goods-image" mode="aspectFill" :src="goods.imgUrl"></image>
					<view class="rightbox">
						<view class="goods-title">{{goods.title}}</view>
						<view class="goods-price">￥{{goods.price}}</view>
					</view>
				</navigator>
				<view v-if="goods.state == 'waitsent'" class="goods-button">等待交易</view>
				<view v-if="goods.state == 'waitget'" @click="getgoods(goods)" class="goods-button">确认收货</view>
				<view v-if="goods.state == 'selled'" style="background: white;color: black;" class="goods-button">交易完成</view>
			</view>
		</view>
	</view>
</template>

<script>
	const user = uniCloud.importObject('userInfo')
	const goods = uniCloud.importObject('goods')
	export default {
		data() {
			return {
				mybuy:[],
				id:uni.getStorageSync('userid'),
				_id:''
			}
		},
		methods: {
			getgoods(goods){
				uni.showModal({
					title:'确认收货',
					content:'已经确认货物正常？',
					success: (res) => {
						if(res.confirm){
							this._id = goods._id
							this.confget()
						}	
					},	
				})
			},
			async confget(){
					let res = await goods.getgoods({_id:this._id})
					if(res == 'sucess'){
							uni.showToast({
								title:'确认收货',
								duration:2000
							})
							this.getmybuy()
					}
					else{
						uni.showToast({
							title:'收货失败',
							duration:2000
						})
					}
			},
			async getmybuy(){
				let res = await user.getmybuy({id:this.id})
				this.mybuy = res
			}
		},
		mounted() {
			this.getmybuy()
		}
	}
</script>

<style scoped>
	.goods-button{
		width: 100px;
		height: 40px;
		border-radius: 30px;
		text-align: center;
		line-height: 42px;
		color: white;
		position: absolute;
		right: 10px;
		bottom: 10px;
		background-color: #8181ff;
	}
	.goods-title{
		margin: 10px;
	}
	.goods-price{
		color: #ec410d;
		margin-left: 10px;
	}
	.rightbox{
		float: left;
	}
	.goods-image{
		width: 100px;
		height: 100px;
		margin: 10px;
		margin-bottom: 5px;
		border-radius: 24px;
		float: left;
	}
	.goods-item{
		position: relative;
		width: 100%;
		height: 120px;
	}
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: relative;
	}
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: relative;
	}
	.title
	{
		position: absolute;
		bottom: 60%;
		left: 40px;
		font-size: 20px;
		font-weight: 600;
		color: #232323;
	}
	.appbox{
		background-color: white;
		box-shadow: 0 0 6px lightgray;
		width: calc(100% - 40px);
		height: calc(100% - 140px);
		left: 20px;
		border-radius: 32px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	page
	{
		height: 100%;
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
