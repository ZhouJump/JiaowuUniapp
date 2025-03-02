<template>
	<view class="page">
		<view class="topbox">
			<view class="title">订单详情</view>
		</view>
		<view class="appbox">
			<image mode="aspectFill" class="mainimg" :src="goods.imgUrl"></image>
			<view class="goods-title">{{goods.title}}</view>
			<input placeholder="请简要描述交易时间地点等" v-model="address" class="address"/>
			<view class="price">￥{{goods.price}}</view>
			<view class="buttonpake">
				<view @click="alipay" class="alipay">立即支付 <i class="bi bi-cart-check-fill"></i></view>
				<!-- <view class="wechat">微信支付 <i class="bi bi-wechat"></i></view> -->
			</view>
		</view>
		<uni-pay @cancel="payCancel" @fail="payfail" @success="paySuccess" ref="pay"></uni-pay>
	</view>
</template>

<script>
	const goods = uniCloud.importObject('goods')
	const unipay = uniCloud.importObject('uni-pay-co')
	export default {
		data() {
			return {
				goods:{title:'加载中'},
				order:0,
				address:''
			}
		},
		methods: {
			 async getgoods(id){
				 let res = await goods.getGoods(id)
				 this.goods = res[0]
			 },
			 async getOrder() {
				let res = await this.$refs.pay.getOrder({
					out_trade_no: this.trade_no, // 插件支付单号
					await_notify: true
				});
				if (res) {
					console.log(res.status)
					if(res.status === 1)
						this.paySuccess()
				}
			},
			 paySuccess(){
				 console.log('pay success')
				 uni.navigateTo({
					url:'/pages/apps/ershou/ershou'
				})
			 },
			 payCancel(){
				uni.showModal({
				 		title:'支付已取消'
				 	}) 
			 },
			 payfail(e){
			 	uni.showModal({
			 	 		title:'支付失败',
						content:e.errMsg
			 	 	}) 			 
			 },
			 alipay(){
				this.order_no = 'test'+Date.now(); // 模拟生成订单号
				// 打开支付收银台
				this.$refs.pay.open({
					total_fee: Math.round((this.goods.price-0)*100), // 支付金额，单位分 100 = 1元（注意：因为是前端传的，此参数可能会被伪造，回调时需要再校验下是否和自己业务订单金额一致）
					order_no: this.order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
					out_trade_no: this.order_no, // 插件支付单号
					description: this.goods.title, // 支付描述
					type: 'goods', // 支付回调类型，
					custom: {
						_id:this.goods._id,
						id:uni.getStorageSync('userid'),
						address:this.address
					}
				})
			 }
			// async alipay(){
			// 	this.order = 1
			// 	let res = await this.$refs.pay.createOrder({
			// 		provider:'alipay',
			// 		total_fee: Math.round((this.goods.price-0)*100), // 支付金额，单位分 100 = 1元
			// 		type: 'test', // 支付回调类型
			// 		order_no: 'test'+Date.now(), // 业务系统订单号
			// 		description: this.goods.title, // 支付描述
			// 	});
			//  },
			 // async checkpay(){
				//  if(this.order == 1){
				//  	console.log('ok')
				//  	let res = await goods.byGoods({
				//  		_id:this.goods._id,
				//  		id:uni.getStorageSync('userid'),
				// 			address:this.address
				//  	})
				// 	if(res == 'sucess')
				// 	{
				// 		uni.navigateTo({
				// 			url:'/pages/apps/ershou/ershou'
				// 		})
				// 	}
				//  }
				//  else if(this.order == 2){
				//  	uni.showModal({
				//  		title:'支付失败'
				//  	})
				//  	console.log('fail')
				//  }
			 // }
		},
		mounted() {
			
		},
		onLoad(e) {
			this.getgoods(e.id)
		},
		onShow(){
			this.getOrder()
			//this.checkpay()
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
	.alipay{
		width: 120px;
		height: 40px;
		background-color: #1677FF;
		float: right;
	}
	.wechat{
		width: 120px;
		height: 40px;
		background-color: #1AAC18;
		float: right;
	}
	.price{
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		color: #ff1b0b;
		font-weight: 800;
	}
	.goods-title{
		height: 40px;
		line-height: 40px;
		font-size: 24px;
	}
	.address{
		height: 100px;
		font-size: 18px;
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
