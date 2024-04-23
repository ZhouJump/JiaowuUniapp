<template>
	<view>
		<apps-vue v-if="selected==0"></apps-vue>
		<home-vue v-if="selected==1"></home-vue>
		<user-info-vue v-if="selected==2"></user-info-vue>
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
				selected:1
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

		}
	}
</script>

<style>
	
</style>
