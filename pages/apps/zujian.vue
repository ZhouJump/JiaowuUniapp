<template>
	<view>
		<view class="topbox">
			<view class="title">
				<text @click="choose=0" :class="{titlechoose:choose==0}">我的组件</text>
				<text @click="choose=1" :class="{titlechoose:choose==1}">组件商店</text>
			</view>
		</view>
		<view class="appbox">
			<swiper :current="choose" @change="changepage" duration="100" class="swiper">
				<swiper-item>
					<view class="mycom">
						<m-drag :item-height="100" :list="comlist" @change="dragComplete">
						    <template class="dragbox" #default="{ item }">
						      <view class="item">
								  {{item.name}}
								  <i @click="del(item)" style="float: right;" class="bi bi-trash-fill del"></i>
						      </view>
						    </template>
						  </m-drag>
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="comshop">
						  <view v-for="(item,index) in comshop" class="item">
							  {{item.name}}
							  <i @click="add(item)" style="float: right;" class="bi bi-plus-lg del"></i>
						  </view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choose:0,
				comlist:uni.getStorageSync('comlist')!=''?JSON.parse(uni.getStorageSync('comlist')):'',
				comshop:[
						{name:'近期考试',id:'kaoshi'},
						{name:'今日课程',id:'kecheng'}]
						}
		},
		methods: {
			changepage(e){
				this.choose = e.detail.current
			},
			dragComplete(list,item){
				uni.setStorageSync('comlist',JSON.stringify(list))
			},
			add(item){
				this.comlist = [...this.comlist,item]
				uni.setStorageSync('comlist',JSON.stringify(this.comlist))
			},
			del(item){
				let index = this.comlist.findIndex((list) => list === item)
				this.comlist.splice(index,1)
				uni.setStorageSync('comlist',JSON.stringify(this.comlist))
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	page{
	height: 100%!important;
	}
	.del{
		width: 50px;
		height: 50px;
		background-color: white;
		line-height: 50px;
		text-align: center;
		margin-top: 15px;
		border-radius: 25px;
		color: gray;
	}
	.item{
		width: calc(100% - 20px);
		height: 80px;
		margin: 10px ;
		background-color: #f0f0f0;
		border-radius: 24px;
		line-height: 80px;
		padding-left: 30px;
		padding-right: 30px;
		box-sizing: border-box;
	}
	.swiper{
		width: 100%;
		height: 100%;
	}
	.mycom{
		width: 100%;
		height: 100%;
	}
	.comshop{
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
