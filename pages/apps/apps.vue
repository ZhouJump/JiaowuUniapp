<template>
	<view>
		<view class="topbox">
			<view class="title">应用中心<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view v-for="(item,index) in appList" class="appitem" @click="gotoapp(item.url)">
				<i :style="{backgroundColor:item.color}" :class="['bi',item.ico,'appicon']"></i>
				<view class="appname">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appList:[
				  {name:'课程表',ico:'bi-calendar2-week-fill',url:'kebiao',color:'skyblue'},
				  {name:'成绩单',ico:'bi-clipboard-data-fill',url:'chengji',color:'#29c25c'},
				  {name:'查空教室',ico:'bi-building-fill-check',url:'jiaoshi',color:'#e6cd3e'},
				  {name:'下载app',ico:'bi-arrow-down-circle-fill',url:'xiazai',color:'#4CAAE4'},
				  // {name:'商务合作',ico:'bi-piggy-bank-fill',url:'hezuo',color:'#ff9300'},
				  {name:'考场查询',ico:'bi-newspaper',url:'kaoshi',color:'#EFC3CA'},
				  {name:'进制计算器',ico:'bi-calculator-fill',url:'jisuanqi',color:'#39D0D5'},
						],

			}
		},
		methods: {
			gotoapp(url)
			{
				uni.navigateTo({
					url:'/pages/apps/'+url
				})
			}
		}
	}
</script>

<style>
	page{
	height: 100%!important;
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
		height: calc(100% - 180px);
		left: 20px;
		padding: 4px;
		border-radius: 32px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: start;
		overflow: hidden;
		overflow-y: auto;
	}
	.appitem{
		height: 100px;
		width: 22%;
		margin-top: 6px;
		margin-left: 1.5%;
		margin-right: 1.5%;
		border-radius: 4px;
		display: flex;
		color: white;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.appicon
	{
		font-size: 30px;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border-radius: 16px;
		margin-bottom: 6px;
	}
	.appname
	{
		font-size: 14px;
		color: black;
	}
</style>
