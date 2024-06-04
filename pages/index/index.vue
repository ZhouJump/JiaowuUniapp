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
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	const user = uniCloud.importObject('userInfo',{customUI:true})
	export default {
		data() {
			return {
				selected:1,
				loadok:false,
				message:{message:[]},
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
			},
			openpush(){
				uni.onPushMessage((res) => {
					console.log("收到推送消息：",res) //监听推送消息
					this.message = JSON.parse(uni.getStorageSync('message'+res.data.payload.id))||{message:[]}
					this.sentmeaasge(res.data.payload)
				})
			},
			sentmeaasge(payload){
				let chat = payload
				chat.sent = false
				this.message.message.unshift(chat)
				uni.setStorageSync('message'+payload.id,JSON.stringify(this.message))
				this.insertmsg(chat)
			},
			async insertmsg(chat){
				let message = uni.getStorageSync('message')
				if(message == '')
					message = {msg:[]}
				else
					message = JSON.parse(message)
				let ishave = false
				message.msg.forEach((msg,index)=>{
					if(msg.id == chat.id){
						ishave = true
						message.msg[index].chat = chat
						message.msg.unshift(message.msg.splice(index,1)[0])
					}
				})
				if(ishave == false){
					let res = await user.getuser({id:chat.id})
					message.msg.unshift({id:chat.id,name:res.name,chat:chat})
				}
				uni.setStorageSync('message',JSON.stringify(message))
			},
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
			this.openpush()
			checkUpdate()
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
