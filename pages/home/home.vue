<template>
	<view class="topbox"></view>
	<view class="manbox">
		<cast-info style="position: sticky;top:0"></cast-info>
		<banner style="position: sticky;top:4px;background-color: white;"></banner>
		<component :style="{top:(index+1)*24+'px'}" style="position: sticky;background-color: white;" ref="reflist" v-for="(item,index) in comlist" :is="item.id"></component>
		<setting></setting>
	</view>
</template>

<script>
	import base from "/common/base.js"
	import banner from "/pages/home/banner.vue"
	import castInfo from "/pages/home/cast.vue"
	import kaoshi from "/pages/home/kaoshi.vue"
	import kecheng from "/pages/home/kecheng.vue"
	import setting from "/pages/home/setting.vue"
	import yiyan from "/pages/home/yiyan.vue"
	import tiangou from "/pages/home/tiangou.vue"
	import acgnews from "/pages/home/acgnews.vue"
	export default {
		data() {
			return {
				comlist:uni.getStorageSync('comlist')!=''?JSON.parse(uni.getStorageSync('comlist')):'',
			}
		},
		methods: {
			refresh(){
				this.comlist = uni.getStorageSync('comlist')!=''?JSON.parse(uni.getStorageSync('comlist')):''
				this.$nextTick(()=>{
					for (var i = 0; i < this.comlist.length; i++) {
						this.$refs.reflist[i].refresh()
					}
				})
			},
			loadcom(){
				if(this.comlist=='')
					{
						let comlist=[
						{name:'近期考试',id:'kaoshi'},
						{name:'今日课程',id:'kecheng'}]
						this.comlist = comlist
						uni.setStorageSync('comlist',JSON.stringify(comlist))
					}
			}
		},
		components:{
			castInfo:castInfo,
			banner:banner,
			kaoshi:kaoshi,
			kecheng:kecheng,
			setting:setting,
			yiyan:yiyan,
			tiangou:tiangou,
			acgnews:acgnews
		},
		mounted() {
			this.loadcom()
		}
		}
</script>

<style scoped>
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: absolute;
	}
	.manbox{
		position: absolute;
		width: 100%;
		height: calc(100% - 120px);
		top: 40px;
		display: flex;
		justify-content: center;
		align-content: start;
		flex-wrap: wrap;
		overflow: hidden;
		overflow-y: auto;
	}
	page{
		height: 100%!important;
	}
</style>
