<template>
	<view class="banner">
		<swiper circular autoplay interval="5000">
			<swiper-item @click="goto(item)" v-for="item in bannerlist">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo',{customUI:true})
	export default {
		data() {
			return {
				bannerlist:[]
			}
		},
		methods: {
			async getbanner(){
				this.bannerlist = await castInfo.getbanner()
			},
			goto(item){
				if(item.urlType=='app')
				{
					uni.navigateTo({
						url:item.url
					})
				}
				else if(item.urlType=='web')
				{
					uni.navigateTo({
						url:'/pages/apps/webview?url=http666'+item.url
					})
				}
				else
				{}
			}
		},
		mounted() {
			this.getbanner()
		}
	}
</script>

<style scoped>
	.banner{
		height: 200px;
		width: calc(100% - 40px);
		margin-bottom: 12px;
		box-shadow: 0 0 4px 2px #f0f0f0;
		line-height: 40px;
		border-radius: 16px;
		display: flex;
		overflow: hidden;
	}
	swiper{
		width: 100%;
		height: 100%;
	}
	swiper-item{
		
	}
	image{
		width: 100%;
		height: 100%;
	}
</style>
