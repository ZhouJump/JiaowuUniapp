<template>
	<view class="out-box">
		<uv-pick-color ref="pickerColor" @confirm="confirm"></uv-pick-color>
		<view class="head">
			<text @click="goToBack()" class="button">返回</text>
			<text>{{ title===''?'新建帖子':title }}</text>
			<text @click="sent()" class="button">发布</text>
		</view>
		<view class="outter">
			<view class="cont">
				<image mode="aspectFill" @click="uploadCover" :src="cover" class="cover-input"></image>
				<input class="title-input" placeholder="输入标题" v-model="title"/>
				<editor id="editor" class="ql-container" placeholder="输入正文" show-img-size show-img-toolbar
					 @input="getEditorContent" @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
				<view v-if="goods.title" class="goods">
					<image class="cover" mode="aspectFill" :src="goods.imgUrl"></image>
					<view class="text">
						<view class="goods-name">{{goods.title}}</view>
						<view class="goods-price">￥{{goods.price}}</view>
					</view>
					<view class="buy"><view class="inner">立即购买</view></view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
				<view :class="formats.bold ? 'ql-active' : ''" class="bi bi-type-bold" data-name="bold">
				</view>
				<view :class="formats.italic ? 'ql-active' : ''" class="bi bi-type-italic" data-name="italic">
				</view>
				<view :class="formats.underline ? 'ql-active' : ''" class="bi bi-type-underline"
					data-name="underline"></view>
				<view :class="formats.strike ? 'ql-active' : ''" class="bi bi-type-strikethrough"
					data-name="strike"></view>
				<!-- #ifndef MP-BAIDU -->
				<view :class="formats.align === 'left' ? 'ql-active' : ''" class="bi bi-text-left"
					data-name="align" data-value="left"></view>
				<!-- #endif -->
				<view :class="formats.align === 'center' ? 'ql-active' : ''" class="bi bi-text-center"
					data-name="align" data-value="center"></view>
				<view :class="formats.align === 'right' ? 'ql-active' : ''" class="bi bi-text-right"
					data-name="align" data-value="right"></view>
				<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="bi bi-justify"
					data-name="align" data-value="justify"></view>
				<!-- #ifndef MP-BAIDU -->
				<view :class="formats.lineHeight ? 'ql-active' : ''" class="bi bi-arrows-vertical"
					data-name="lineHeight" data-value="2"></view>
				<view :class="formats.letterSpacing ? 'ql-active' : ''" class="bi bi-arrows"
					data-name="letterSpacing" data-value="2em"></view>
				<view :class="formats.marginTop ? 'ql-active' : ''" class="bi bi-arrow-bar-up"
					data-name="marginTop" data-value="20px"></view>
				<view :class="formats.marginBottom ? 'ql-active' : ''" class="bi bi-arrow-bar-down"
					data-name="marginBottom" data-value="20px"></view>
				<!-- #endif -->
			
				<view class="bi bi-eraser" @tap="removeFormat"></view>
			
				<!-- #ifndef MP-BAIDU -->
				<view :class="formats.fontFamily ? 'ql-active' : ''" class="bi bi-fonts"
					data-name="fontFamily" data-value="Pacifico"></view>
				<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="bi"
					data-name="fontSize" data-value="24px">A</view>
				<!-- #endif -->
				<view :style="{color:editcolor}"
					class="bi bi-palette ql-active" data-name="color" :data-value="editcolor"></view>
				<view :style="{color:editcolor}"
					class="bi bi-paint-bucket" data-name="backgroundColor" :data-value="editcolor"></view>
				<view @click="openColor" class="bi bi-square-fill" :style="{color:editcolor}"></view>
				<view class="bi bi-calendar-date" @tap="insertDate"></view>
				<view class="bi bi-check-square" data-name="list" data-value="check"></view>
				<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="bi bi-list-ol"
					data-name="list" data-value="ordered"></view>
				<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="bi bi-list-ul"
					data-name="list" data-value="bullet"></view>
			
				<view class="bi bi-arrow-counterclockwise" @tap="undo"></view>
				<view class="bi bi-arrow-clockwise" @tap="redo"></view>
			
				<view class="bi bi-text-indent-right" data-name="indent" data-value="-1"></view>
				<view class="bi bi-text-indent-left" data-name="indent" data-value="+1"></view>
				<view class="bi bi-hr" @tap="insertDivider"></view>
				<view class="bi bi-image" @tap="insertImage"></view>
				<view :class="formats.header === 1 ? 'ql-active' : ''" class="bi bi-type-h1"
					data-name="header" :data-value="1"></view>
				<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="bi bi-subscript"
					data-name="script" data-value="sub"></view>
				<view :class="formats.script === 'super' ? 'ql-active' : ''" class="bi bi-superscript"
					data-name="script" data-value="super"></view>
			
				<view class="bi bi-trash2" @tap="clear"></view>
			
				<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="bi bi-paragraph"
					data-name="direction" data-value="rtl"></view>
				<view @click="goodsPop=true" class="bi bi-cart"></view>
			</view>
		</view>
		<view :style="{bottom: goodsPop?'0px':'-420px'}" class="goods-list">
			<view class="goods-head">
				<view style="opacity: 0;">返回</view>
				<view>我的商品</view>
				<view @click="goodsPop=false">返回</view>
			</view>
			<view id="goods" class="body">
				<view v-for="goodsItem in mysell" class="goods-item">
					<image mode="aspectFill" class="image" :src="goodsItem.imgUrl"></image>
					<view class="text">
						<view class="goods-name">{{goodsItem.title}}</view>
						<view class="goods-price">￥{{goodsItem.price}}</view>
					</view>
					<view v-if="goods._id === goodsItem._id" @click="goods={}" class="insert-goods">移除商品</view>
					<view v-else @click="insertGoods(goodsItem)" class="insert-goods">插入商品</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	const user = uniCloud.importObject('userInfo',{customUI: true})
	import DomToImage from 'dom-to-image'
	export default {
		data() {
			return {
					editcolor:'#0000ff',
					cover:'/static/addimage.png',
					title:'',
					readOnly: false,
					content:'',
					formats: {},
					mysell:[],
					goodsPop:false,
					studentid:uni.getStorageSync('userid'),
					goods:{}
				}
		},
		onLoad() {
			this.getmysell()
		},
		methods: {
			async sent(){
				if(this.cover!== '/static/addimage.png' && this.title!=='' && this.content !== '')
				{
					console.log('发布')
					let res = await community.sentNote({
						title:this.title,
						cover:this.cover,
						content:this.content,
						studentid:this.studentid,
						goods: this.goods._id || null
					})
					if(res === 'suceess'){
						uni.showToast({
							title:'发布成功',
							icon:'none'
						})
						this.goToBack()
					}
				}else{
					uni.showToast({
						title:'请检查是否上传封面，输入标题和正文',
						icon:'none'
					})
				}
			},
			async getmysell(){
				let res = await user.getmysell({id:this.studentid})
				console.log(res)
				res.forEach(item=>{
					if(item.state === 'selling'){
						this.mysell.push(item)
					}
				})
			},
			getEditorContent(e) {
				this.content = e.detail.html;
			},
			goToBack(){
				
				uni.navigateBack({
					delta: 1
				});
			},
			openColor() {
				this.$refs.pickerColor.open();
			},
			confirm(e) {
				this.editcolor = e.hex
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
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
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
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
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				uni.showModal({
					title: '清空编辑器',
					content: '确定清空编辑器全部内容？',
					success: res => {
						if (res.confirm) {
							this.editorCtx.clear({
								success: function(res) {
									console.log("clear success")
								}
							})
						}
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			uploadCover(){
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
								this.cover = res.fileID
							}
						})
					}
				})
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
			insertGoods(goods){
				this.goods = goods
				this.goodsPop = false
			}
		}
	}
</script>

<style scoped>
	.goods-list{
		transition-duration: 300ms;
		position: absolute;
		left: 0;
		bottom: 0;
		height: 400px;
		width: 100%;
		background-color: white;
		border-radius: 16px;
		box-shadow: 0 0 6px lightgray;
		display: flex;
		flex-direction: column;
		padding: 20px;
		box-sizing: border-box;
	}
	.goods-list .goods-head{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.goods-list .body{
		flex: 1;
		overflow-y: scroll;
	}
	.body .goods-item{
		border-radius: 8px;
		margin: 0 6px;
		width: calc(100% - 12px);
		box-sizing: border-box;
		display: flex;
		padding: 8px;
		margin-top: 8px;
		box-shadow: 0 0 6px lightgray;
	}
	.goods-item .insert-goods{
		display: flex;
		align-items: center;
		margin-right: 10px;
	}
	.goods-item .image{
		width: 80px;
		height: 80px;
		border-radius: 8px;
		margin-right: 10px;
	}
	.goods-item .text{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.goods-item .text .goods-name{
		font-size: 18px;
		margin-top: 6px;
	}
	.goods-item .text .goods-price{
		font-size: 20px;
		color: #ec410d;
	}
	.out-box{
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}
	.head{
		height: 80px;
		background-color: #B5B5FF;
		color: white;
		font-size: 20px;
		line-height: 110px;
		text-align: center;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	}
	.head .button{
		font-size: 16px;
	}
	.bottom{
		background-color: #B5B5FF;
		color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.toolbar .bi {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	.title-input{
		padding: 0 15px;
		font-size: 20px;
		font-weight: bold;
		margin-top: 10px;
	}
	.bottom .sent{
		transform: rotate(45deg);
		transition-duration: 300ms;
		background-color: #B5B5FF;
		border: 5px solid white;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		position: relative;
		bottom: 20px;
		font-size: 30px;
		box-shadow: 0 0 2px 1px #e6e6e6;
	}
	.outter{
		flex: 1;
		overflow-y: auto;
	}
	.cont{
		height: calc(100% - 20px);
		padding: 10px;
		width: calc(100% - 20px);
	}
	.cont .goods{
		display: flex;
	}
	.goods .cover{
		height: 100px;
		width: 100px;
		border-radius: 10px;
		margin-right: 10px;
	}
	.goods .text{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.goods .text .goods-name{
		margin-top: 8px;
		font-size: 20px;
	}
	.goods .text .goods-price{
		color: #ec410d;
		font-weight: bold;
		font-size: 24px;
	}
	.goods .buy{
		margin-top: 20px;
		margin-left: auto;
	}
	.buy .inner{
		padding: 10px 20px;
		display: inline-block;
		border-radius: 20px;
		color: white;
		background-color: #B5B5FF;
	}
	.toolbar {
		margin-top: 10px;
		box-sizing: border-box;
		border-bottom: 0;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 0 15px;
		width: 100%;
		margin-top: 10px;
		font-size: 16px;
		min-height: unset;
		height: unset;
		line-height: 1.5;
	}
	.cover-input{
		width: 100%;
		height: 200px;
	}
	.ql-active {
		color: #06c;
	}
</style>
