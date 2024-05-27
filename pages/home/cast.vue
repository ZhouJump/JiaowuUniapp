<template>
	<view @click="goto" v-if="castinfo.isShow" class="castinfo">
		<i class="bi bi-megaphone-fill"></i><text>{{castinfo.info}}</text>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo')
	export default {
		data() {
			return {
				castinfo:'获取公告中...'
			}
		},
		methods: {
			goto(){
				if(this.castinfo.urlType=='app')
				{
					uni.navigateTo({
						url:this.castinfo.url
					})
				}
				else if(this.castinfo.urlType=='web')
				{
					uni.navigateTo({
						url:'/pages/apps/webview?url=http666'+this.castinfo.url
					})
				}
				else
				{}
			},
			async getcastinfo(){
				let res = await castInfo.getcastinfo()
				if(res == 'error')
					this.castinfo = {info:'获取失败'}
				else
					this.castinfo = res[0]
			}
		},
		mounted() {
			this.getcastinfo()
		}
	}
</script>

<style scoped>
	.castinfo{
		height: 40px;
		width: calc(100% - 40px);
		line-height: 40px;
		border-radius: 8px;
		display: flex;
		color: #323232;
	}
	i{
		display: inline-block;
		width: 40px;
		height: 100%;
		text-align: center;
	}
	text{
		display: inline-block;
		height: 100%;
		width: calc(100% - 50px);
		overflow: hidden;
	}
</style>
