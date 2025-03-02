<template>
	<view class="out-box">
		<view class="head">
			校园圈
		</view>
		<scroll-view @refresherrefresh="refresh" @scrolltolower="getAllNote" refresher-enabled="true" :refresher-triggered="refresher" scroll-y="true" class="outter">
			<view class="cont">
				<view @click="goto('/pages/apps/shequ/detail?id='+item._id)" class="item" v-for="item in items">
					<view class="cover">
						<image mode="aspectFill" :src="item.cover"></image>
						<view class="box">
							<view><i class="bi bi-eye"></i> {{ item.view }}</view>
							<view><i class="bi bi-chat-left-text"></i> {{ item.comment.length }}</view>
						</view>
					</view>
					<view class="title">
						{{ item.title }}
					</view>
				</view>
				<view class="loading">{{more?'加载中...':'没有更多了'}}</view>
			</view>
		</scroll-view>
		<view class="bottom">
			<view class="item">
				主页
			</view>
			<view @click="goToNew" class="item sent">
				<i class="bi bi-plus-lg"></i>
			</view>
			<view @click="gotoMyInfo" class="item">
				我的
			</view>
		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				items:[
				],
				id:uni.getStorageSync('userid'),
				current_page:1,
				refresher:false,
				more:true,
			}
		},
		onLoad() {
			this.getAllNote()
			// this.checklogin()
		},
		methods: {
			gotoMyInfo(){
				uni.redirectTo({
					url:"/pages/apps/shequ/myInfo"
				})
			},
			goto(url){
				uni.navigateTo({
					url:url
				})
			},
			async refresh(){
				this.refresher = true
				this.more = true
				this.current_page = 1
				let res = await community.getNote(null,this.current_page)
				this.refresher = false
				this.current_page += 1
				this.items = res.data
			},
			async getAllNote(){
				if(!this.more)
				     return
				let res = await community.getNote(null,this.current_page)
				this.current_page += 1
				this.items = [...this.items,...res.data]
				if(res.data.length < 7){
					this.more = false
				}
			},
			goToNew(){
				uni.navigateTo({
					url: '/pages/apps/shequ/new',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			checklogin(){
				if(this.id==='')
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
		}
	}
</script>

<style scoped>
	.out-box{
		display: flex;
		flex-direction: column;
		height: 100%;
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
		overflow-y: hidden;
	}
	.cont{
		padding: 10px;
		width: calc(100% - 20px);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
	.cont .item{
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		width: calc(50% - 5px);
		height: 180px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 0 2px 1px #e6e6e6;
	}
	.cont .loading{
		width: 100%;
		padding: 20px 0 50px;
		text-align: center;
	}
	.cont .item .title{
		height: 40px;
		padding: 8px;
		font-size: 14px;
	}
	.cont .item .cover{
		position: relative;
		flex: 1;
	}
	.cont .item .cover image{
		width: 100%;
		height: 100%;
	}
	.cont .item .cover .box{
		position: absolute;
		font-size: 14px;
		display: flex;
		align-items: flex-end;
		color: white;
		grid-gap: 10px;
		padding: 4px;
		width: 100%;
		height: 30%;
		left: 0;
		bottom: 0;
		background-image: linear-gradient(#00000000,#000000ff);
	}
	.cont .item:nth-child(7n){
		width: 100%;
		height: 240px;
	}
</style>
