<template>
	<view class="page">
		<view class="topbox">
			<view class="title">{{goods.title}}</view>
		</view>
		<view class="appbox">
			<image mode="aspectFill" class="mainimg" :src="goods.imgUrl"></image>
			<view class="price">￥{{goods.price}}</view>
			<view class="buttonpake">
				<view @click="checkout" v-if="goods.state == 'selling'" class="buy">我要了 <i class="bi bi-bag-heart-fill"></i></view>
				<view @click="gotochat" class="chat">聊一聊 <i class="bi bi-chat-dots-fill"></i></view>
			</view>
		</view>
	</view>
</template>

<script>
	const goods = uniCloud.importObject('goods')
	export default {
		data() {
			return {
				goods:{title:'加载中'}
			}
		},
		methods: {
			gotochat(){
				uni.navigateTo({
					url:'/pages/apps/ershou/chat?id=' + this.goods.seller
				})
			},
			checkout(){
				uni.navigateTo({
					url:'/pages/apps/ershou/checkout?id='+this.goods._id
				})
			},
			 async getgoods(id){
				 let res = await goods.getGoods(id)
				 this.goods = res[0]
			 }
		},
		mounted() {
			
		},
		onLoad(e) {
			this.getgoods(e.id)
		}
	}
</script>

<style scoped>
	.buttonpake{
		position: absolute;
		right: 10px;
		bottom: 20px;
		color: white;
		line-height: 40px;
		text-align: center;
		border-radius: 20px;
		overflow: hidden;
		font-size: 16px;
	}
	.chat{
		width: 100px;
		height: 40px;
		background-color: seagreen;
		float: right;
	}
	.buy{
		width: 100px;
		height: 40px;
		background-color: #615cff;
		float: right;
	}
	.price{
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		position: absolute;
		bottom: 20px;
		left: 10px;
		color: #ff1b0b;
		font-weight: 800;
	}
	.mainimg{
		width: 100%;
		height: 300px;
		background-color: #e4e5ff;
		border-radius: 32px;
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
