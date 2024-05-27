<template>
	<view class="page">
		<view class="topbox">
			<view class="title">收货地址管理<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			
		</view>
		<view class="tip" v-if="dizhi == ''">点击新增地址<i class="bi bi-arrow-right"></i></view>
		<i @click="openpop" class="bi bi-plus-lg refresh"></i>
		
		<!-- 弹出框 -->
		<view @click="ispop = false" v-if="ispop" class="mask"></view>
		<view :style="{bottom:ispop?'0':'-310px'}" class="popup">
			<picker-view mode="region" class="picker" @change="changevalue" :value="[0,0]">
				
			</picker-view>
			<div class="buttonbox">
				<div style="background-color: #8d89ff;color: white;" class="button">新增</div>
				<div class="button">取消</div>
			</div>
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ispop:false,
				dizhi:uni.getStorageSync('dizhi')!=''?JSON.parse(uni.getStorageSync('dizhi')):'',
			}
		},
		methods: {
			changevalue(event){
				console.log(event.detail.value)
				this.year = this.yearlist[event.detail.value[0]].id
				this.tern = this.ternlist[event.detail.value[1]].id
			},
			openpop()
			{
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					complete: (res) => {
						console.log(res)
					}
				})
				if(this.isload==true)
					return
				this.ispop=true
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.mask
	{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: black;
		opacity: 0.2;
	}
	.picker{
		height: 200px;
		width: 100%;
		text-align: center;
	}
	.buttonbox
	{
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 20px;
		width: 100%;
		height: 46px;
		left: 0;
	}
	.button
	{
		width: 48%;
		background-color: lightgray;
		text-align: center;
		height: 50px;
		line-height: 50px;
		border-radius: 8px;
	}
	.popup
	{
		position: absolute;
		width: 100%;
		height: 300px;
		background-color: white;
		bottom: 0;
		box-shadow: 0 0 8px gray;
		border-radius: 8px;
		transition-duration: 100ms;
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
		animation-duration: 500ms;
		animation-iteration-count: infinite;
		
	}
	.tip{
		position: absolute;
		color: gray;
		bottom: 120px;
		right: 120px;
		font-weight: 600;
	}
	page
	{
		height: 100%;
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
