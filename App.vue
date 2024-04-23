<script>
	import "bootstrap-icons/font/bootstrap-icons.css"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
			uni.hideTabBar()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page{height: 100% !important}
	/*每个页面公共css */
</style>
