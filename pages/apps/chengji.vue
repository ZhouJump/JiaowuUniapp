<template>
	<view>
		<view class="topbox">
			<view class="title">成绩查询<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			
		</view>
		<view class="tip" v-if="chengji == undefined">点击获取数据<i class="bi bi-arrow-right"></i></view>
		<i class="bi bi-arrow-clockwise refresh"></i>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chengji:localStorage.getItem('chengji')
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
		padding: 4px;
		border-radius: 8px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.refresh
	{
		font-size: 36px;
		background: blue;
		width: 60px;
		height: 60px;
		display: block;
		color: white;
		text-align: center;
		line-height: 60px;
		border-radius: 30px;
		position: absolute;
		right: 40px;
		bottom: 100px;
		box-shadow: 0 0 6px gray;
		opacity: 0.6;
	}
	.tip{
		position: absolute;
		color: gray;
		bottom: 120px;
		right: 120px;
		font-weight: 600;
	}
</style>
