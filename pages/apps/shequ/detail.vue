<template>
	<view class="out-box">
		<view class="head">
			{{note.title?note.title:'评论详情'}}
		</view>
		<view  class="outter">
			<view class="cont ql-container">
				<rich-text class="editor ql-editor" :nodes="note.content">
				</rich-text>
				<view @click="gotoGoods()" class="goods" v-if="note.goods">
					<image mode="aspectFill" class="cover" :src="goods.imgUrl"></image>
					<view class="text">
						<view class="name">{{goods.title}}</view>
						<view class="price">￥{{goods.price}}</view>
					</view>
					<view class="buy">
						立即购买
					</view>
				</view>
			</view>
			<view style="margin-left: 20px;margin-top: 10px;margin-bottom: 0;" class="nick-name">
				<view class="avatar">{{getName(note._id,note.studentid).slice(-1)}}</view>
				<view class="name">{{getName(note._id,note.studentid)}}</view>
			</view>
			<view class="comment-title">
				评论({{note.comment.length}})
			</view>
			<view class="comment-list">
				<view @click="bottom_hide=false" class="no-comment comment-item" v-if="note.comment.length===0">
					暂无评论，快来抢沙发把
				</view>
				<view class="comment-item" @click="goto('/pages/apps/shequ/detail?id='+item._id)" v-for="item in comments">
					<view class="nick-name">
						<view class="avatar">{{getName(note._id,item.studentid).slice(-1)}}</view>
						<view class="name">{{getName(note._id,item.studentid)}}</view>
					</view>
					<rich-text @itemclick="goto('/pages/apps/shequ/detail?id='+item._id)" :nodes="item.content">
					</rich-text>
					<view class="date">{{getDate(item.date)}}</view>
				</view>
			</view>
		</view>
		<view class="bottom" :style="{height:bottom_hide?'80px':'240px'}">
			<editor id="editor" :style="{height:bottom_hide?'60px':'180px'}" class="ql-comment ql-container" placeholder="输入评论" show-img-size show-img-toolbar
				 @input="getEditorContent" @statuschange="onStatusChange" 
				 @focus="bottom_hide=false" @ready="onEditorReady">
			</editor>
			<view :style="{marginTop:bottom_hide?'30px':'10px'}" class="tool-box">
				<view @tap="format" class="button-list">
					<view :class="['bi','bi-type-italic',formats.italic?'active':'']" data-name="italic"></view>
					<view :class="['bi','bi-type-bold',formats.bold?'active':'']" data-name="bold"></view>
					<view :class="['bi','bi-fonts',formats.fontSize === '24px'?'active':'']" data-name="fontSize" data-value="24px"></view>
					<view :class="['bi','bi-text-center',formats.align === 'center'?'active':'']" data-name="align" data-value="center"></view>
					<view @tap="insertImage" style="font-size: 14px;" class="bi bi-image"> </view>
				</view>
				<view @click="sent" class="sent button">
					发布
				</view>
				<view @click="bottom_hide=true" class="bi bi-chevron-down button icon"> </view>
			</view>
		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	const goods = uniCloud.importObject('goods',{customUI: true})
	export default {
		data() {
			return {
				note:{
					
				},
				bottom_hide:true,
				formats: {},
				content:'',
				comments:[],
				goods:{},
				studentid:uni.getStorageSync('userid')
			}
		},
		onLoad(event) {
			this.getNote(event.id)
		},
		methods: {
			gotoGoods(){
				uni.navigateTo({
					url:'/pages/apps/ershou/xiangqin?id='+this.goods._id
				})
			},
			async getgoods(){
				let res = await goods.getGoods(this.note.goods)
				this.goods = res[0]
			},
			async sent(){
				if(this.content === '')
					return
					
				let res = await community.addComment({
					content:this.content,
					studentid:this.studentid
				},this.note._id)
				this.content = ''
				this.editorCtx.clear()
				this.bottom_hide = true
				this.getNote(this.note._id)
			},
			async getComment(){
				if(this.note.comment.length != 0){
					let ret = await community.getComment(this.note.comment)
					this.comments = ret.data
				}
			},
			goto(url){
				uni.navigateTo({
					url:url
				})
			},
			getName(noteId,userId){
				let name_1 = ['双层','奶油','麻辣','酱香','吮指','美味']
				let name_2 = ['奥利奥','趣多多','脆脆鲨','奇趣蛋','原味鸡','麦满分','酱香饼','鸡蛋仔','铜锣烧','冰激凌','脆升升','星球杯','冰美式']
				let token = (userId-0) * noteId.slice(-1).charCodeAt() * noteId.slice(-2).charCodeAt()
				return name_1[token % name_1.length] + name_2[token % name_2.length]
			},
			getDate(date){
				let mydate = new Date(date)
				return mydate.getDate() + '/' + mydate.getMonth() + '/' + mydate.getFullYear() + ' ' + mydate.getHours() + ':' + mydate.getMinutes() + ':' + mydate.getSeconds()
			},
			getEditorContent(e) {
				this.content = e.detail.html;
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif
			
				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						uni.showToast({
							title: '图片上传中',
							duration: 2000
						});
						let cloudPath=Date.now() + '.jpg'
						await uniCloud.uploadFile({
							cloudPath: cloudPath,
							filePath:res.tempFilePaths[0],
							success: async (res) => {
								uni.showToast({
									title: '图片上传完成',
									duration: 2000
								});
								this.editorCtx.insertImage({
									src: res.fileID,
									alt: '图像',
									width: '100%',
								})
							}
						})
					}
				})
			},
			async getNote(id){
				let res = await community.getNote(id)
				this.note = res.data[0]
				this.getComment()
				if(this.note.goods){
					this.getgoods()
				}
			},
		}
	}
</script>

<style scoped>
	@import "../../../common/editor.css";
	.out-box{
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
	.head{
		height: 80px;
		background-color: #B5B5FF;
		color: white;
		font-size: 20px;
		line-height: 110px;
		text-align: center;
	}
	.bottom{
		padding: 0 20px;
		transition-duration: 300ms;
		overflow: hidden;
	}
	.tool-box{
		grid-gap: 10px;
		transition-duration: 300ms;
		display: flex;
	}
	.tool-box .button{
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #B5B5FF;
		color: white;
		font-size: 14px;
		width: fit-content;
		border-radius: 18px;
	}
	.tool-box .button-list{
		background-color: #d8d9ff;
		height: 28px;
		border-radius: 18px;
		padding: 4px;
		display: flex;
		grid-gap:4px
	}
	.button-list .bi{
		transition-duration: 300ms;
		color: white;
		height: 28px;
		width: 28px;
		border-radius: 16px;
		text-align: center;
		line-height: 28px;
	}
	.active{
		background-color: #B5B5FF;
	}
	.button.sent{
		margin-left: auto;
		width: 60px;
	}
	.button.icon{
		width: 36px;
		border-radius: 18px;
	}
	.ql-comment{
		font-size: 14px;
		padding: 10px;
		transition-duration: 300ms;
		border-radius: 8px;
		background-color:  #f6f7ff;
		
	}
	.ql-container{
		height: unset;
		min-height: unset;
	}
	.comment-list{
		margin: 0 20px 20px;
	}
	.comment-list .no-comment{
		color: gray;
		margin: 20px auto 20px;
	}
	.comment-list .comment-item{
		font-size: 14px;
		background-color: #f6f7ff;
		padding: 10px;
		border-radius: 8px;
		margin-top: 10px;
	}
	.comment-item .date{
		text-align: right;
		font-size: 14px;
		color: lightgray;
		margin-top: 10px;
	}
	.comment-item img{
		border-radius: 8px;
	}
	.nick-name{
		display: flex;
		align-items: flex-end;
		grid-gap: 6px;
		margin-bottom: 10px;
	}
	.nick-name .avatar{
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		background-color: #B5B5FF;
		font-weight: bold;
		font-size: 18px;
	}
	.nick-name .name{
		color: gray;
	}
	.outter{
		flex: 1;
		overflow-y: scroll;
	}
	.outter .comment-title{
		font-size: 20px;
		margin: 20px;
	}
	.cont{
		padding: 10px;
		width: calc(100% - 20px);
	}
	.cont .goods{
		display: flex;
	}
	.goods .cover{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		margin-right: 10px;
	}
	.goods .text{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.goods .text .name{
		font-size: 20px;
		margin-top: 6px;
		font-weight: bold;
	}
	.goods .text .price{
		font-size: 24px;
		color: #ec410d;
	}
	.goods .buy{
		margin-left: auto;
		margin-top: 40px;
	}
	.cont .editor{
		width: 100%;
	}
</style>
