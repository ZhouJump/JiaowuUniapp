<template>
	<view class="page">
		<view class="topbox">
			<view class="title">我的收藏<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view v-show="item.star==true" class="goods" v-for="(item,index) in goods">
				<navigator :url="'/pages/apps/ershou/xiangqin?id='+item._id">
					<image class="goodsimg" mode="aspectFill" :src="item.imgUrl"></image>
					<view class="righttext">
						<view class="goodstitle">{{item.title}}</view>
						<view class="goodsprice">{{item.price}}</view>
					</view>
				</navigator>
					<view @click="unstar(item,index)" class="star">取消收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	const goods = uniCloud.importObject('goods',{customUI:true})
	export default {
		data() {
			return {
				id:uni.getStorageSync('userid'),
				goods:[]
			}
		},
		methods: {
			async getmystar(){
				let res = await goods.getmystar({userid:this.id})
				this.goods = res
				for (var i = 0; i < res.length; i++) {
					if(res[i].star){
						let goodsres = await goods.getGoods(res[i].goodsid)
						if(goodsres.length == 0){
							this.goods[i] = {star:false}
						}
						else{
							goodsres[0].price = '￥'+goodsres[0].price
							this.goods[i] = {...this.goods[i],...goodsres[0]}
						}
					}
				}
				
			},
			async unstar(item,index){
				let res = await goods.setstar({goodsid:item._id,userid:this.id,star:false})
				if(res == 'success'){
					uni.showToast({
						title: '取消收藏成功'
					});
				}
				else{
					uni.showToast({
						title: '取消收藏失败'
					});
				}
				this.goods.splice(index,1)
			}
		},
		mounted() {
			this.getmystar()
		}
	}
</script>

<style scoped>
	.star{
		position: absolute;
		right: 10px;
		bottom: 10px;
		background-color: #ffa70e;
		height: 40px;
		line-height: 42px;
		padding-left: 10px;
		padding-right: 10px;
		border-radius: 30px;
		text-align: center;
		color: white;
	}
	.goodstitle{
		margin: 10px;
		font-size: 18px;
	}
	.goodsprice{
		color: #ff9008;
		margin: 10px;
		font-size: 20px;
	}
	.righttext{
		float: left;
	}
	.goods{
		width: 100%;
		height: 120px;
		position: relative;
	}
	.goodsimg{
		width: 100px;
		height: 100px;
		margin-top: 10px;
		margin-left: 10px;
		float: left;
		background-color: lightgrey;
		border-radius: 16px;
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
