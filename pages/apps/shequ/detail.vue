<template>
	<view class="out-box">
		<view class="head">
			{{note.title}}
		</view>
		<view class="outter">
			<view class="cont">
				<image mode="aspectFill" class="cover" :src="note.cover"></image>
			</view>
			<editor read-only="true" id="editor" class="editor" placeholder="加载中..." show-img-size show-img-toolbar
				show-img-resize @input="getEditorContent" @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
			</editor>
		</view>
		<view class="bottom">

		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				note:{
					
				}
			}
		},
		onLoad(event) {
			console.log(event.id)
			this.getNote(event.id)
		},
		methods: {
			async getNote(id){
				let res = await community.getNote(id)
				this.note = res.data[0]
				this.editorCtx.setContents({
					html:this.note.content
				})
				console.log(res)
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
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
	}
	.bottom{
		height: 60px;
		background-color: #B5B5FF;
		color: white;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.outter{
		flex: 1;
		overflow-y: scroll;
	}
	.cont{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column;
	}
	.cont .cover{
		height: 200px;
		width: 100%;
	}
	.cont .editor{
		margin: 20px;
		width: 100%;
	}
</style>
