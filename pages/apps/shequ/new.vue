<template>
	<view class="out-box">
		<uv-pick-color ref="pickerColor" @confirm="confirm"></uv-pick-color>
		<view class="head">
			<text class="button">返回</text>
			<text>{{ title===''?'新建帖子':title }}</text>
			<text class="button">发布</text>
		</view>
		<view class="outter">
			<view class="cont">
				<image mode="aspectFill" @click="uploadCover" :src="cover" class="cover-input"></image>
				<input class="title-input" placeholder="输入标题" v-model="title"/>
				<view class="editor-wrapper">
					<view class="editor-inner">
						<editor id="editor" class="ql-container" placeholder="输入正文" show-img-size show-img-toolbar
							show-img-resize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
						</editor>
					</view>
				</view>
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
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="item">
				主页
			</view>
			<view @click="goToBack" class="item sent">
				<i class="bi bi-plus-lg"></i>
			</view>
			<view class="item">
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					editcolor:'#0000ff',
					cover:'/static/addimage.png',
					title:'',
					readOnly: false,
					formats: {}
				}
		},
		methods: {
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
									alt: '图像'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.out-box{
		display: flex;
		flex-direction: column;
		height: 100%;
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
		height: 60px;
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
		display: flex;
		flex-direction: column;
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
		min-height: 30vh;
		height: 100%;
		margin-top: 10px;
		font-size: 16px;
		line-height: 1.5;
	}
	.cover-input{
		width: 100%;
		height: 200px;
	}
	.ql-active {
		color: #06c;
	}
	.editor-wrapper {
		background: #fff;
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
	}
	.editor-inner{
		overflow: hidden;
	}
</style>
