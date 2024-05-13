<template>
	<view class="castinfo">
		<i class="bi bi-megaphone-fill"></i><text>{{castinfo}}</text>
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
			async getcastinfo(){
				this.castinfo = await castInfo.getcastinfo()
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
