<template>
	<view class="out-box">
		<view class="head">
			{{note.title}}
		</view>
		<view  class="outter">
			<view class="cont ql-container">
				<rich-text class="editor ql-editor" :nodes="note.content">
				</rich-text>
			</view>
			<view class="comment-title">
				评论({{note.comment.length}})
			</view>
			<view @click="bottom_hide=false" class="comment-list">
				<view class="no-comment comment-item" v-if="note.comment.length===0">
					暂无评论，快来抢沙发把
				</view>
			</view>
		</view>
		<view class="bottom" :style="{height:bottom_hide?'80px':'240px'}">
			<editor id="editor" :style="{height:bottom_hide?'60px':'180px'}" class="ql-comment ql-container" placeholder="输入评论" show-img-size show-img-toolbar
				 @input="getEditorContent" @statuschange="onStatusChange" 
				 @focus="bottom_hide=false" @ready="onEditorReady">
			</editor>
			<view :style="{marginTop:bottom_hide?'30px':'10px'}" class="tool-box">
				<view class="bi bi-image button icon"> </view>
				<view class="sent button">
					发布
				</view>
				<view @click="bottom_hide=true" class="bi bi-chevron-down button icon"> </view>
			</view>
		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				note:{
					
				},
				bottom_hide:true,
			}
		},
		onLoad(event) {
			this.getNote(event.id)
		},
		methods: {
			async getNote(id){
				let res = await community.getNote(id)
				console.log(res)
				this.note = res.data[0]
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
		background-color: #EDF2FA;
		
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
		background-color: #EDF2FA;
		padding: 10px;
		border-radius: 8px;
	}
	.outter{
		flex: 1;
		overflow-y: scroll;
	}
	.outter .comment-title{
		font-size: 24px;
		margin: 20px;
	}
	.cont{
		width: 100%;
	}
	.cont .editor{
		padding: 20px;
		width: 100%;
	}
</style>
