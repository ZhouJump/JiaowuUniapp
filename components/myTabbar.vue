<template>
	<view class="tabbar">
		<view class="shadow" :style="{left:value*33.33+'%',opacity:loadok?'':'0'}"></view>
		<view @click="tabTap(index)" v-for="(item,index) in tabbarList" :class="value==index&&loadok?'itemSelect':'item'">
			<i :class="['bi',item.icon]"></i>
			{{item.text}}
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"tabbar",
		props:{
			value:Number,
		},
		methods: {
			tabTap(index)
			{
				this.$emit("input",index)
			},
			load(){
				setTimeout(()=>{
						this.loadok = 1
				},1000)
			}
		},
		mounted() {
			this.load()
		},
		data() {
			return {
				tabbarList: [
					{
						"pagePath": "pages/index/index",
						"text": "应用",
						"icon":"bi-grid-3x3-gap-fill"
					},
					{
						"pagePath": "pages/index/index",
						"text": "主页",
						"icon":"bi-map-fill"
					},
					{
						"pagePath": "pages/userInfo/userInfo",
						"text": "我的",
						"icon":"bi-person-fill"
					}
				],
				loadok:false
			};
		},
		
	}
</script>

<style>
	.tabbar{
		background-color: white;
		box-shadow: 0 0 6px lightgray;
		
		position: absolute;
		bottom: 10px;
		height: 60px;
		border-radius: 30px;
		width: calc(100% - 40px);
		left: 20px;
		
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
	}
	.item{
		font-size: 12px;
		display: flex;
		flex-direction: column;
		color: gray;
		align-items: center;
		margin-bottom: 10px;
		transition-duration: 100ms;
		position: relative;
	}
	.itemSelect{
		transition-duration: 100ms;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: blue;
		margin-bottom: 10px;
		position: relative;
		}
	.itemSelect i
	{
		transition-duration: 100ms;
		font-size: 30px;
		transform: rotate(6deg);
	}
	.item i
	{
		transition-duration: 100ms;
		font-size: 20px;
	}
	.shadow
	{
		position: absolute;
		width: 33.33%;
		height: 100%;
		background-image: radial-gradient(blue 0,white 50%);
		background-position:0 30px;
		background-repeat: no-repeat;
		opacity: 0.2;
		transition-duration: 100ms;
	}
</style>