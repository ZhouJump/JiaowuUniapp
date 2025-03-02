<template>
	<view class="out-box">
		<view class="head">
			我的
		</view>
		<view class="outter">
			<view class="cont">
				<view class="info-box">
					<view class="info-item">
						<view class="name">浏览量</view>
						<view class="data">{{userinfo.view}}</view>
					</view>
					<view class="info-item">
						<view class="name">评论量</view>
						<view class="data">{{userinfo.comments}}</view>
					</view>
					<view class="info-item">
						<view class="name">帖子数</view>
						<view class="data">{{userinfo.notes}}</view>
					</view>
				</view>
				<view v-for="note in notes" class="note-item">
					<view class="info">
						<image class="cover" mode="aspectFill" :src="note.cover"></image>
						<view class="text">
							<view class="name">{{note.title}}</view>
							<view :style="{color:note.like!=0?'#ec7152':''}" class="note-data weight">
								<text class="bi bi-fire"></text>{{(note.sortWeight - note.like*4).toFixed(2)}}
								<text v-if="note.like!=0" class="payed-weight"> + {{note.like*4}} = {{note.sortWeight.toFixed(2)}}</text>
							</view>
							<view class="note-data"><text class="bi bi-eye"></text>{{note.view}}</view>
							<view class="note-data"><text class="bi bi-chat-left-text"></text>{{note.comment.length}}</view>
							<view class="note-data"><text class="bi bi-calendar"></text>{{getDate(note.date)}}</view>
						</view>
					</view>
					<view class="handel">
						<view  @click="goto('/pages/apps/shequ/detail?id='+note._id)" class="button">查看帖子</view>
						<view @click="toBuyWeight(note)" class="button">购买权重</view>
						<view @click="deleteNote(note)" class="button">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view @click="gotoHome" class="item">
				主页
			</view>
			<view @click="goToNew" class="item sent">
				<i class="bi bi-plus-lg"></i>
			</view>
			<view class="item">
				我的
			</view>
		</view>
		<view :style="{bottom:weightPop?'0px':'-400px'}" class="buy-weight">
			<view class="weight-title">为{{weightNote.title}}购买权重</view>
			<view class="count">
				<text>购买</text>
				<view class="counter">
					<view @click="subweight()" class="btn">-</view>
					<view class="num">{{needWeight}}</view>
					<view @click="addweight()" class="btn">+</view>
				</view>
				<text>权重</text>
			</view>
			<view class="btn-box">
				<view @click="weightPop = false" class="cancel">
					取消
				</view>
				<view @click="buyWeight()" class="buy">
					<text class="bi bi-alipay"></text>￥{{needWeight*0.25}}购买
				</view>
			</view>
		</view>
		<uni-pay @cancel="payCancel" @fail="payfail" @success="paySuccess" ref="pay"></uni-pay>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				studentid:uni.getStorageSync('userid'),
				userinfo:{
					notes:'加载中',
					comments:'加载中',
					view:'加载中'
				},
				notes:[],
				weightNote:{},
				weightPop:false,
				needWeight:0
			}
		},
		onLoad() {
			this.getUserInfo()
			this.getNotes()
		},
		methods: {
			paySuccess(){
				console.log('pay success')
				this.getNotes()
				this.weightPop=false
				this.needWeight=0
			},
			payCancel(){
				uni.showToast({
					title:'支付取消',
					icon:'none'
				})
			},
			payfail(){
				uni.showToast({
					title:'支付失败',
					icon:'none'
				})
			},
			addweight(){
				this.needWeight += 4
			},
			subweight(){
				if(this.needWeight>3)
					this.needWeight -= 4
			},
			toBuyWeight(note){
				this.weightPop = true
				this.weightNote = note
			},
			buyWeight(){
				if(this.needWeight>0){
					this.order_no = 'test'+Date.now(); // 模拟生成订单号
					// 打开支付收银台
					this.$refs.pay.open({
						total_fee: Math.round((this.needWeight*0.25-0)*100), // 支付金额，单位分 100 = 1元（注意：因为是前端传的，此参数可能会被伪造，回调时需要再校验下是否和自己业务订单金额一致）
						order_no: this.order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
						out_trade_no: this.order_no, // 插件支付单号
						description: '为'+this.weightNote.title+'购买'+this.needWeight*4+'点权重', // 支付描述
						type: 'weight', // 支付回调类型，
						custom: {
							_id:this.weightNote._id,
							weight:this.needWeight,
						}
					})
				}
			},
			async deleteNote(note){
				let that = this
				uni.showModal({
					title:'确认删除',
					content:'确实要删除“'+note.title+'”吗',
					success: async ()=>{
						await community.delNote(note._id)
						that.getNotes()
					}
				})
			},
			getDate(date){
				let mydate = new Date(date)
				return mydate.getDate() + '/' + mydate.getMonth() + '/' + mydate.getFullYear() + ' ' + mydate.getHours() + ':' + mydate.getMinutes()
			},
			async getNotes(){
				let res = await community.getNoteByUserId(this.studentid)
				this.notes = res.data
				console.log(res)
			},
			async getUserInfo(){
				let res = await community.getUserData(this.studentid)
				this.userinfo = res
			},
			gotoHome(){
				uni.redirectTo({
					url:"/pages/apps/shequ/home"
				})
			},
			goto(url){
				uni.navigateTo({
					url:url
				})
			},
			goToNew(){
				uni.navigateTo({
					url: '/pages/apps/shequ/new',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style scoped>
	.buy-weight{
		display: flex;
		flex-direction: column;
		padding: 20px;
		transition-duration: 300ms;
		height: 380px;
		width: 100%;
		position: absolute;
		box-shadow: 0 0 4px #f0f1ff;
		left: 0;
		box-sizing: border-box;
		border-radius: 10px;
		background-color: white;
	}
	.buy-weight .btn-box{
		margin-top: auto;
		margin-bottom: 20px;
		display: flex;
		grid-gap: 20px;
	}
	.btn-box .cancel{
		padding: 10px;
		text-align: center;
		flex: 1;
		border-radius: 8px;
		color: white;
		background-color: #bebebe;
	}
	.btn-box .buy{
		padding: 10px;
		text-align: center;
		flex: 1;
		border-radius: 10px;
		color: white;
		background-color: #1677FF;
	}
	.btn-box .buy .bi{
		margin-right: 10px;
	}
	.buy-weight .weight-title{
		text-align: center;
		font-size: 20px;
	}
	.buy-weight .count{
		align-items: center;
		display: flex;
		margin-top: 40px;
	}
	.count .counter{
		margin: 0 8px;
		overflow: hidden;
		display: flex;
		border-radius: 8px;
		font-size: 18px;
	}
	.counter .btn{
		padding: 6px 12px;
		background-color: #B5B5FF;
		color: white;
	}
	.counter .num{
		padding: 6px 24px;
		background-color: #f0f0ff;
	}
	.out-box{
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.note-item{
		margin-top: 10px;
		padding-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
		width: calc(100% - 20px);
		border-bottom: 1px solid lightgray;
	}
	.note-item:last-child{
		margin-bottom: 40px;
	}
	.note-item .handel{
		display: flex;
		justify-content: space-around;
	}
	.handel .button{
		font-size: 14px;
		flex: 1;
		color: grey;
		margin-top: 10px;
		text-align: center;
	}
	.handel .button:not(:last-child){
		border-right: 1px solid lightgray;
	}
	.note-item .info{
		display: flex;
	}
	.note-item .info .cover{
		width: 80px;
		height: 80px;
		border-radius: 8px;
		margin-right: 8px;
	}
	.note-item .info .text{
		flex: 1;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.info .text .name{
		width: 100%;
	}
	.info .text .note-data{
		font-size: 14px;
		color: grey;
		margin-right: 8px;
	}
	.info .text .note-data.weight{
		width: 100%;
	}
	.text .note-data .bi{
		margin-right: 4px;
	}
	.cont .info-box{
		display: flex;
		justify-content: space-around;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 20px 0;
		margin: 10px;
		box-shadow: 0 0 4px lightgrey;
		width: calc(100% - 20px);
	}
	.info-box .info-item:not(:last-child){
		border-right: 1px solid lightgray;
	}
	.info-box .info-item{
		flex: 1;
		text-align: center;
		color: grey;
	}
	.info-item .data{
		font-size: 14px;
		margin-top: 16px;
	}
	.head{
		height: 80px;
		background-color: #B5B5FF;
		color: white;
		font-size: 20px;
		line-height: 110px;
		text-align: center;
	}
	.bottom{
		height: 60px;
		background-color: #B5B5FF;
		color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.bottom .sent{
		transition-duration: 300ms;
		background-color: #B5B5FF;
		border: 5px solid white;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		position: relative;
		bottom: 20px;
		font-size: 30px;
		box-shadow: 0 0 2px 1px #e6e6e6;
	}
	.outter{
		flex: 1;
		overflow-y: scroll;
	}
	.cont{
		padding: 10px;
		width: calc(100% - 20px);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
