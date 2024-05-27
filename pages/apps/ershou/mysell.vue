<template>
	<view class="page">
		<view class="topbox">
			<view class="title">我发布的<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view class="goods-item" v-for="goods in mysell">
				<navigator :url="'/pages/apps/ershou/xiangqin?id='+goods._id">
					<image class="goods-image" mode="aspectFill" :src="goods.imgUrl"></image>
					<view class="rightbox">
						<view class="goods-title">{{goods.title}}</view>
						<view class="goods-price">￥{{goods.price}}</view>
					</view>
				</navigator>
				<view v-if="goods.state == 'waitget'" class="goods-button">等待收货</view>
				<view v-if="goods.state == 'waitsent'" @click="gotosent(goods)" class="goods-button">去发货</view>
				<view v-if="goods.state == 'selling'" @click="delgoods(goods)" style="background: palevioletred;" class="goods-button">删除</view>
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
				mysell:[],
				id:uni.getStorageSync('userid'),
				_id:''
			}
		},
		methods: {
			delgoods(goods){
				uni.showModal({
					title:'确认删除',
					content:goods.title,
					success: (res) => {
						if(res.confirm){
							this._id = goods._id
							this.confdel()
						}
					}
				})
			},
			async confdel(){
				let res = await goods.delgoods({_id:this._id})
				if(res == 'sucess'){
						uni.showToast({
							title:'删除完成',
							duration:2000})
						this.getmysell()
				}
				else{
					uni.showToast({
						title:'删除失败',
						duration:2000
					})
				}
			},
			gotosent(goods){
				uni.showModal({
					title:'已经交付给买家了吗？',
					content:goods.address,
					confirmText:'已经交付',
					cancelText:'还没',
					success: (res) => {
						if(res.confirm){
							this._id = goods._id
							this.confsent()
							}
						
					},
				})
			},
			async confsent(){
				let res = await goods.sentgoods({_id:this._id})
				if(res == 'sucess'){
					uni.showToast({
						title:'发货成功',
						duration:2000
					})
					this.getmysell()
				}
				else{
					uni.showToast({
						title:'发货失败',
						duration:2000
					})
				}
			},
			async getmysell(){
				let res = await user.getmysell({id:this.id})
				console.log(res)
				this.mysell = res
			}
		},
		mounted() {
			this.getmysell()
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
