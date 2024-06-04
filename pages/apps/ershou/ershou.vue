<template>
	<view>
		<view class="topbox">
			<view class="title">
				<text @click="choose=0" :class="{titlechoose:choose==0}">海鲜市场</text>
				<text @click="choose=1" :class="{titlechoose:choose==1}">寄售</text>
				<text @click="choose=2" :class="{titlechoose:choose==2}">消息</text>
				<text @click="choose=3" :class="{titlechoose:choose==3}">我的</text>
			</view>
		</view>
		<view class="appbox">
			<swiper :current="choose" @change="changepage" duration="100" class="swiper">
				<swiper-item>
					<view class="shop">
						<view class="search">
							<input @input="searchgoods" class="search-input"/>
							<i class="bi bi-search search-button"></i>
						</view>
						<view class="fitter">
							<span @click="pricefitter" :class="[fitterway[0]==0?'fitter-item':'fitter-item-unactive']">价格 <i :class="['bi',!fitterway[1]?'bi-chevron-down':'bi-chevron-up']"></i></span>
							<span @click="datefitter" :class="[fitterway[0]==1?'fitter-item':'fitter-item-unactive']">发布时间 <i :class="['bi',!fitterway[1]?'bi-chevron-down':'bi-chevron-up']"></i></span>
						</view>
						<view class="goodlist">
							<view @click="gotoxiangqing(goods._id)" v-show="goods.show!=false" v-for="goods in goodlist" class="gooditem">
								<image mode="aspectFill" :src="goods.imgUrl" class="goods-image"></image>
								<view class="goods-title">{{goods.title}}</view>
								<view class="goods-price">￥{{goods.price}}</view>
							</view>
							<view style="height: 1px;" class="gooditem"></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="sell">
						<view @click="chooseimg" class="sell-cover">
							<image :src="imgurl" mode="aspectFill"</image>
							<i class="bi bi-cloud-arrow-up cover-edit"></i>
						</view>
						<input v-model="selltitle" placeholder="输入商品标题" class="sell-title"/>
						<input v-model="sellprice" placeholder="输入商品价格" class="sell-price"/>
						<span class="rmb">￥</span>
						<view :style="{backgroundColor:isloading?'#afb1ff':'#615cff'}" @click="uploadGoods" class="upload-button">{{isloading?'上传中...':'上架商品'}}<i v-show="!isloading" class="bi bi-cart-plus"></i></view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="message">
						<view v-for="item in message.msg" class="messageitem">
							<navigator :url="'/pages/apps/ershou/chat?id='+item.id">
								<view :style="{filter: 'hue-rotate('+item.id/360+'deg)'}" class="avtar">{{item.name.slice(-1)}}</view>
								<view class="user">
									<view class="username">{{item.name}}</view>
									<view class="usermessage">{{item.chat.text}}</view>
								</view>
							</navigator>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="my">
						<view class="myinfo">
							<view class="namebox">{{ name }}</view>
							<view class="idbox">{{ id }}</view>
							<view class="infocard">
								<view class="balance">余额:￥{{userinfo.balance}}</view>
								<view class="getbalance">取现 <i class="bi bi-upload"></i></view>
							</view>
							<view class="icolist">
								<navigator url="/pages/apps/ershou/mysell">
									<view class="icoitem">
										<i class="bi bi-bag-check-fill"></i>
										<view>我发布的</view>
										<text class="dot">{{userinfo.mysell}}</text>
									</view>
								</navigator>
								<navigator url="/pages/apps/ershou/mybuy">
									<view class="icoitem">
										<i class="bi bi-cart-check-fill"></i>
										<view>我买到的</view>
										<text class="dot">{{userinfo.mybuy}}</text>
									</view>
								</navigator>
								<navigator url="/pages/apps/ershou/myselled">
									<view class="icoitem">
										<i class="bi bi-credit-card-fill"></i>
										<view>我卖出的</view>
										<text class="dot">{{userinfo.myselled}}</text>
									</view>
								</navigator>
							</view>
						</view>
						<view class="navlist">
							<navigator url="/pages/apps/ershou/dizhi">
								<view class="navitem">
									地址管理<i class="bi bi-geo-alt-fill"></i>
								</view>
							</navigator>
							<navigator url="/pages/apps/ershou/shoucang">
								<view class="navitem">
									我的收藏<i class="bi bi-star-fill"></i>
								</view>
							</navigator>
							<view class="navitem">
								账户绑定<i class="bi bi-alipay"></i>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<i @click="clickadd" :style="{rotate:choose==1?'45deg':'0deg'}" class="bi bi-plus-lg add-button"></i>
	</view>
</template>

<script>
	const goods = uniCloud.importObject('goods',{customUI: true})
	const user = uniCloud.importObject('userInfo',{customUI: true})
	export default {
		data() {
			return {
				choose:0,
				currchoose:0,
				goodlist:[
					{title:'加载中',price:'加载中',imgUrl:''},
				],
				mygood:[],
				id:uni.getStorageSync('userid'),
				name:uni.getStorageSync('username'),
				selltitle:'',
				sellprice:'',
				imgurl:'',
				fitterway:[1,1],
				isloading:false,
				userinfo:{},
				message:{msg:[]},
				timer:''
				}
		},
		methods: {
			gotoxiangqing(id){
				uni.navigateTo({
					url:'/pages/apps/ershou/xiangqin?id='+id
				})
			},
			searchgoods(res){
				console.log(res.detail.value)
				this.goodlist.forEach(element=>{
					if(element.title.includes(res.detail.value)||res.detail.value=='')
						element.show = true
					else
						element.show = false
				})
			},
			pricefitter(){
				if(this.fitterway[0] == 0)
					this.fitterway[1] = !this.fitterway[1]
				this.fitterway[0] = 0
				let way = 0
				if(this.fitterway[1])
					way = 1
				else
					way = -1
				this.goodlist.sort((a,b)=>{
					if (a.price-0<b.price-0) {
					    return -1*way;
					  }
					if (a.price-0>b.price-0) {
					    return 1*way;
					  }
					return 0;
				})
			},
			datefitter(){
				if(this.fitterway[0] == 1)
					this.fitterway[1] = !this.fitterway[1]
				this.fitterway[0] = 1
				let way = 0
				if(this.fitterway[1])
					way = 1
				else
					way = -1
				this.goodlist.sort((a,b)=>{
					if (a.date<b.date) {
					    return -1*way;
					  }
					if (a.date>b.date) {
					    return 1*way;
					  }
					return 0;
				})
				
			},
			clickadd(){
				if(this.choose==1)
					this.choose = this.currchoose
				else
					{
						this.currchoose = this.choose
						this.choose = 1
					}
			},
			changepage(e){
				this.choose = e.detail.current
			},
			checklogin(){
				if(this.id=='')
				{
					uni.showModal({
						title:'请先登录',
						success: (res) => {
							uni.navigateBack(1)
							if(res.confirm)
								{
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
						}
					})
				}
			},
			chooseimg(){
				uni.chooseImage({
					sizeType:'compressed',
					count:1,
					success: (res) => {
						this.imgurl=res.tempFilePaths[0]
					}
				})
			},
			async getgoods(){
				this.goodlist = await goods.getGoods()
			},
			async uploadGoods(){
				if(this.isloading==true)
					return
				if(this.imgurl==''||this.selltitle==''||this.sellprice=='')
				{
					uni.showToast({
						title:'请将图片和信息填写完整',
						position:'center',
						duration:2000
					})
					return
				}
				else{
					this.isloading = true
					let cloudPath=Date.now() + '.jpg'
					await uniCloud.uploadFile({
						cloudPath: cloudPath,
						filePath:this.imgurl,
						success: async (res) => {
							let goodsres = await goods.addGoods({title:this.selltitle,price:this.sellprice,imgUrl:res.fileID,seller:this.id,state:'selling'})
							this.selltitle = ''
							console.log(goodsres)
							this.sellprice = ''
							this.imgurl = ''
							this.isloading = false
							this.getgoods()
						}
					})
				}
			},
			async getuserinfo(){
				let res = await user.getuser({id:this.id})
				if(res == 'error')
				{
					uni.showModal({
						title:'获取用户数据失败'
					})
				}
				else{
					this.userinfo = res
				}
			},
			getmsg(){
				let message = uni.getStorageSync('message')
				if(message == '')
					this.message = {msg:[]}
				else
					this.message = JSON.parse(uni.getStorageSync('message'))
			},
			start(){
				this.timer =  setInterval(()=>{
					this.getmsg()
				},2000)
			}
		},
		mounted() {
			this.checklogin()
			this.getgoods()
			this.getuserinfo()
		},
		onShow() {
			this.getgoods()
			this.getuserinfo()
			this.start()
		},
		onHide() {
			clearInterval(this.timer)
		}
	}
</script>

<style scoped>
	page{
	height: 100%!important;
	}
	.user{
		float: left;
		height: 100%;
		margin-left: 10px;
	}
	.username{
		margin-top: 6px;
		font-size: 18px;
	}
	.usermessage{
		color: gray;
	}
	.avtar{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #615cff;
		text-align: center;
		line-height: 64px;
		color: white;
		font-size: 30px;
		font-weight: bold;
		float: left;
	}
	.messageitem{
		padding: 10px;
		width: 100%;
		height: 60px;
		position: relative;
	}
	.message{
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
	}
	.icolist{
		width: calc(100% - 20px);
		margin-left: 10px;
		height: 80px;
		position: absolute;
		top:280px;
		display: flex;
		justify-content: space-around;
		color: gray;
	}
	.icoitem view{
		font-size: 14px;
		width: 100%;
		text-align: center;
	}
	.icoitem i{
		display: inline-block;
		font-size: 30px;
		margin-left: 15px;
		margin-top: 12px;
	}
	.icoitem{
		width: 60px;
		height: 100%;
		position: relative;
	}
	.dot{
		background-color: gray;
		color: white;
		position: absolute;
		font-size: 12px;
		height: 16px;
		line-height: 18px;
		padding-left:4px ;
		padding-right:4px ;
		border-radius: 20px;
		border: 1.5px solid white;
		right: 6px;
		top: 6px;
	}
	.navlist{
		width: clac(100% - 20px);
		margin: 10px;
		height: 400px;
	}
	.navitem{
		height: 60px;
		line-height: 60px;
		width: calc(100% - 20px);
		border-top: 1px solid #eeeeee;
		border-bottom: 1px solid  #eeeeee;
		font-size: 16px;
		color: #939393;
		padding-left: 20px;
		margin-top: -1px;
	}
	.navitem i{
		float: right;
		margin-right: 20px;
		font-size: 26px;
		color: lightgray;
	}
	.add-button{
		position: absolute;
		bottom: 0;
		font-size: 40px;
		line-height: 64px;
		background-color: #615cff;
		color: white;
		width: 60px;
		height: 60px;
		border-radius: 60px;
		text-align: center;
		left: calc(50% - 38px);
		bottom: 50px;
		border: 8px solid white;
		transition-duration: 100ms;
	}
	/* 我的 */
	.getbalance{
		color: white;
		position: absolute;
		right: 30px;
		bottom: 16px;
		opacity: 0.6;
		font-size: 16px;
	}
	.balance{
		position: absolute;
		top:50px;
		left: 20px;
		font-size: 24px;
		font-weight: 600;
		color: white;
	}
	.infocard{
		box-shadow: inset -2px 2px 2px 1px white;
		box-shadow: -2px 2px 2px 1px lightgray;
		width: calc(100% - 20px);
		height: 180px;
		margin: 10px;
		position: absolute;
		top:80px;
		border-radius: 16px;
		background-image: linear-gradient(30deg,#706bff,#dc89ff);
	}
	.idbox{
		position: absolute;
		left: 100px;
		top:60px;
		font-size: 14px;
		color: gray;
	}
	.namebox{
		position: absolute;
		left: 100px;
		font-size: 20px;
		font-weight: 800;
		top:24px;
	}
	.myinfo{
		width: 100%;
		height: 360px;
	}
	.my{
		width: 100%;
		height: 100%;
		position: relative;
	}
	/* 我的结束 */
	/* 寄售 */
	.upload-button{
		width: calc(100% - 20px);
		margin-left: 10px;
		height: 40px;
		line-height: 46px;
		background-color: #615cff;
		color: white;
		border-radius: 16px;
		text-align: center;
	}
	.rmb{
		position: relative;
		margin-left: 10px;
		font-size: 30px;
		color: #ff1b0b;
		bottom: 46px;
		font-weight: 600;
	}
	.sell-price{
		width: calc(100% - 20px);
		margin-left: 10px;
		font-size: 30px;
		color: #ff1b0b;
		box-sizing: border-box;
		padding-left: 26px;
		font-weight: 600;
	}
	.sell-title{
		width: calc(100% - 20px);
		margin-left: 10px;
		font-size: 20px;
	}
	.sell{
		width: 100%;
		height: ;
	}
	.sell-cover{
		width: calc(100% - 20px);
		height: 400px;
		background-color: #e4e5ff;
		margin: 10px;
		border-radius: 24px;
		position: relative;
		overflow: hidden;
	}
	.sell-cover image{
		width: 100%;
		height: 100%;
	}
	.cover-edit{
		position: absolute;
		background-color: #615cff;
		color: white;
		font-size: 24px;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 44px;
		right: 10px;
		bottom: 10px;
		border-radius: 12px;
		opacity: 0.6;
	}
	/* 寄售结束 */
	/* 海鲜市场 */
	.shop{
		width: 100%;
		height: 100%;
	}
	.search{
		width: calc(100% - 20px);
		margin: 10px;
		height: 40px;
		box-sizing: border-box;
		border-radius: 20px;
		border: solid 2px #615cff;
		position: relative;
	}
	.search-button{
		position: absolute;
		width: 40px;
		height: 40px;
		line-height: 38px;
		font-size: 22px;
		right: -6px;
		color: #615cff;
	}
	.search-input{
		width: 100%;
		height: 100%;
		padding-left: 24px;
		padding-right: 44px;
		box-sizing: border-box;
		position: absolute;
	}
	.fitter{
		font-size: 14px;
		margin-left: 16px;
	}
	.fitter-item{
		background-color: #615cff;
		color: white;
		padding: 4px 8px 4px 8px;
		margin: 0 4px 0 4px;
		border-radius: 20px;
		box-sizing: border-box;
		border: solid 2px #615cff;
	}
	.fitter-item-unactive{
		background-color: white;
		color: #615cff;
		border: solid 2px #615cff;
		padding: 4px 8px 4px 8px;
		margin: 0 4px 0 4px;
		box-sizing: border-box;
		border-radius: 20px;
	}
	.goodlist{
		margin: 10px;
		box-sizing: border-box;
		width: calc(100% - 20px);
		border-radius: 8px;
		height: calc(100% - 100px);
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: space-around;
		overflow: hidden;
		overflow-y: scroll;
	}
	.gooditem{
		width: calc(50% - 15px);
		height: 260px;
		margin-bottom: 10px;
		border-radius: 8px;
		overflow: hidden;
		position: relative;
	}
	.goods-title{
		font-size: 13px;
		position: absolute;
		width: 100%;
		overflow: hidden;
		padding: 4px;
		box-sizing: border-box;
		bottom: 24px;
	}
	.goods-price{
		font-size: 18px;
		position: absolute;
		width: 100%;
		padding: 4px;
		font-weight: 600;
		box-sizing: border-box;
		bottom: 0;
		color: #ff1b0b;
	}
	.goods-image{
		width: 100%;
		height: 208px;
		background-color: #e4e5ff;
		border-radius: 8px;
	}
	/* 海鲜市场结束 */
	.swiper{
		width: 100%;
		height: 100%;
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
		font-size: 18px;
		font-weight: 600;
		color: gray;
		transition-duration: 200ms;
	}
	.title text{
		margin-right: 12px;
		transition-duration: 200ms;
	}
	.titlechoose{
		color: black;
		font-size: 20px;
		transition-duration: 200ms;
	}
	.appbox{
		background-color: white;
		width: calc(100% - 40px);
		height: calc(100% - 180px);
		left: 20px;
		border-radius: 32px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
	}
	
</style>
