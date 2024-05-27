<template>
	<view style="height: calc(100% - 140px);" class="page">
		<view class="topbox">
			<view class="title">{{user.name}}</view>
		</view>
		<view class="appbox">
			<scroll-view scroll-y="true" :scroll-top="scrollTop" @click="isadding=false" style="transition-duration: 200ms" :style="{height:isadding?'calc(100% - 180px)':'calc(100% - 60px)'}">
				<view class="messagebox">
					<view :class="[item.sent?'chatmy':'chatother']" v-for="item in message.message" class="message">
						<view v-if="item.type=='text'">
							<view :style="{filter: item.sent?'hue-rotate('+myid/360+'deg)':'hue-rotate('+id/360+'deg)'}" class="avtar">{{item.sent?name.slice(-1):user.name.slice(-1)}}</view>
							<span class="text">{{item.text}}</span>
						</view>
						<view v-if="item.type=='goods'">
							<navigator url="/pages/apps/ershou/mysell">
								<view class="goodstext">{{item.text}}</view>
							</navigator>
						</view>
					</view>
				</view>
			</scroll-view>
			<view :style="{height:isadding?'180px':'60px',borderRadius:isadding?'32px':''}" class="chatbox">
				<input cursor-spacing="-40" :style="{width:chattext!=''?'calc(100% - 60px)':''}" v-model="chattext" class="input"/>
				<i @click="isadding=!isadding" :style="{rotate:isadding?'45deg':'0deg'}" v-show="chattext==''" class="bi bi-plus-circle add"></i>
				<view @click="sentmeaasge" v-show="chattext!=''" class="sent">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	const unichat = uniCloud.importObject('chat')
	const user = uniCloud.importObject('userInfo')
	export default {
		data() {
			return {
				id:'',
				myid:uni.getStorageSync('userid'),
				name:uni.getStorageSync('username'),
				isadding:false,
				chattext:'',
				message:{message:[]},
				user:{},
				scrollTop:9999999,
				timer:'',	}
		},
		methods: {
			focus(e){
				this.isadding=false
			},
			scroll(e){
				this.oldTop = e.detail.scrollTop
			},
			async sentmeaasge(){
				let chat = {type:'text',text:this.chattext,time:Date.now(),sent:true,id:this.myid}
				this.message.message.unshift(chat)
				uni.setStorageSync('message'+this.id,JSON.stringify(this.message))
				this.insertmsg(chat)
				this.chattext = ''
				await unichat.setmessage({cid:this.user.cid,msg:chat})
			},
			async getuser(){
				let res = await user.getuser({id:this.id})
				this.user = res
			},
			insertmsg(chat){
				let message = uni.getStorageSync('message')
				if(message == '')
					message = {msg:[]}
				else
					message = JSON.parse(message)
				let ishave = false
				message.msg.forEach((msg,index)=>{
					if(msg.id == this.user.id){
						ishave = true
						message.msg[index].chat = chat
						message.msg.unshift(message.msg.splice(index,1)[0])
					}
				})
				if(ishave == false){
					message.msg.unshift({id:this.user.id,name:this.user.name,chat:chat})
				}
				uni.setStorageSync('message',JSON.stringify(message))
			},
			getmessage(){
				let message = uni.getStorageSync('message'+this.id)
				if(message == '')
					this.message = {message:[]}
				else
					this.message = JSON.parse(message)
			},
			start(){
				this.timer = setInterval(()=>{
					this.getmessage()
				},500)
			}
		},
		mounted() {
			
		},
		onLoad(e) {
			this.id = e.id
			this.user.name = e.id
			this.getuser()
			this.start()
		},
		onHide() {
			clearInterval(this.timer)
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	.goodstext{
		width: calc(100% - 40px);
		height: 30px;
		margin: 20px;
		text-align: center;
		line-height: 30px;
		background-color: #e9e7ff;
		border-radius: 8px;
		color: gray;
	}
	.chatmy{
		width: 100%;
	}
	.avtar{
		width: 40px;
		height: 40px;
		border-radius: 20px;
		
		margin: 10px;
		background-color: blue;
		color: white;
		font-size: 20px;
		text-align: center;
		line-height: 42px;
	}
	.text{
		padding: 10px;
		box-sizing: border-box;
	}
	.chatmy .avtar{
		float: right;
	}
	.chatmy .text{
		background-color: #c6c6ff;
		border-radius: 16px 16px 0 16px;
		float: right;
		text-align: right;
	}
	.chatother{
		width: 100%;
	}
	.chatother .avtar{
		float: left
	}
	.chatother .text{
		background-color: #7474ff;
		border-radius: 16px 16px 16px 0;
		color: white;
		float: left;
		text-align: left;
	}
	.input{
		height: 40px;
		width: calc(100% - 40px);
		background-color: white;
		border-radius: 32px;
		padding: 10px;
		font-size: 14px;
		box-sizing: border-box;
		float: left;
		transition-duration: 200ms;
	}
	.add{
		float: left;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 26px;
		color: #7474ff;
		transition-duration: 200ms;
	}
	.sent{
		float: left;
		width: 50px;
		margin-left: 10px;
		height: 40px;
		text-align: center;
		line-height: 42px;
		font-size: 14px;
		color: white;
		border-radius: 30px;
		background-color: #7474ff;
		transition-duration: 200ms;
		animation-name: sent;
		animation-duration: 200ms;
	}
	@keyframes sent {
		0%{width: 30px;}
		100%{width: 50px;}
	}
	.messagebox{
		position: relative;
		width: 100%;
		transition-duration: 200ms;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column-reverse;
	}
	.chatbox{
		padding: 10px;
		width: 100%;
		height: 60px;
		background-color: #e9e7ff;
		overflow: hidden;
		transition-duration: 200ms;
		box-sizing: border-box;
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
		height: calc(100% - 140px);
		left: 20px;
		border-radius: 32px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
		padding-top: 10px;
	}
	page
	{
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
