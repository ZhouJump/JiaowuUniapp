<template>
	<view>
		<view class="title">
			<img class="titleimg" src="../../uni_modules/uni-upgrade-center-app/static/bg_top.png"/>
			<view class="titlebox">
				<view class="maintitle">
					重要提示
				</view>
				<view class="titletext">
					H5版本存在适配问题，安卓用户请下载APP使用.
				</view>
				<view class="buttonbox">
					<view @click="download" class="button">
						立即下载
					</view>
					<navigator class="button" url="/pages/index/index">
						继续使用H5
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				downloadurl:'https://mp-959701fe-151c-4c72-bb61-d21f69764990.cdn.bspapp.com/cloudstorage/52369630-db2b-4462-baeb-b3d932c5409c.apk'
			}
		},
		methods: {
			download(){
				uni.showToast({
					title:'下载中...'
				})
				uni.downloadFile({
					url:this.downloadurl,
					success: (res) => {
						uni.saveFile({
							tempFilePath:res.tempFilePath,
							success: (file) => {
								uni.showToast({
									title:'下载完成'
								})
								uni.openDocument({
									filePath:file.savedFilePath
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
	.titletext{
		margin: 10%;
	}
	.button{
		width: 100%;
		height: 40px;
		background-image: linear-gradient(45deg,#5656D1,#6767D6);
		text-align: center;
		line-height: 40px;
		border-radius: 30px;
		color: white;
		margin-top: 10px;
	}
	.button:nth-child(2){
		background-image: linear-gradient(45deg,#b1b3d1,#ccd0d6);
	}
	.buttonbox{
		position: absolute;
		bottom: 20px;
		width: 80%;
		margin-left: 10%;
	}
	.maintitle{
		position: absolute;
		font-size: 20px;
		font-weight: 800;
		top: -60px;
		left: 30px;
		color: white;
	}
	page{
		background-color: lightgray;
	}
	.titleimg{
		width: 100%;
		position: relative;
		bottom: -10px;
	}
	.title{
		margin-left: calc(50% - 150px);
		width: 300px;
		margin-top: 100px;
	}
	.titlebox{
		border: 1px solid transparent;
		box-sizing: border-box;
		width: 100%;
		height: 300px;
		background-color: white;
		border-radius: 0 0 16px 16px;
		position: relative;
	}
</style>
