<template>
	<view>
		<swiper circular :current="selected" duration="200" class="swiper" @change="changepage">
			<swiper-item><apps-vue ref="appsvue"></apps-vue></swiper-item>
			<swiper-item><home-vue ref="homevue"></home-vue></swiper-item>
			<swiper-item><user-info-vue ref="userinfovue"></user-info-vue></swiper-item>
		</swiper>
		<image :style="{animationName:loadok?'boot':''}" src="../../static/cover.png" class="boot"></image>
		<tabbar :value="selected" @input="selected=$event"></tabbar>
	</view>
</template>

<script>
	import myTabbarVue from '../../components/myTabbar.vue'
	import appsVue from '../apps/apps.vue'
	import userInfoVue from '../userInfo/userInfo.vue'
	import homeVue from '../home/home.vue'
	export default {
		data() {
			return {
				selected:1,
				loadok:false
			}
		},
		components:{
			tabbar:myTabbarVue,
			appsVue:appsVue,
			userInfoVue:userInfoVue,
			homeVue:homeVue
		},
		onLoad() {
			
		},
		methods: {	
			changepage(e)
			{
				this.selected = e.detail.current
			}
		},
		onShow() {
			this.$refs.userinfovue.checkLogin()
			this.$refs.homevue.refresh()
		},
		onReady() {
			setTimeout(()=>{
				this.loadok=true
				plus.navigator.closeSplashscreen()
			},600)
		}
	}
</script>

<style scoped>

	.boot{
		position: absolute;
		animation-duration: 600ms;
		animation-fill-mode: both;
		pointer-events: none;
		
		width: 100%;
		height: 100%;
		bottom: 0;
		border-radius: 0;
		opacity: 1;
		left: 0;
		z-index: 3;
	}
	.swiper{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	swiper-item{
		position: relative;
	}
</style>
