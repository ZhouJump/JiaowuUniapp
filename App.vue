<script>
	import "bootstrap-icons/font/bootstrap-icons.css"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page{height: 100% !important}
	/*每个页面公共css */
	.page
	{
		overflow: hidden;
		height: 100% !important;
		width: 100%;
		position: relative;
	}
	@keyframes rotate{
		from{rotate: 0deg;}
		to{rotate: 360deg;}
	}
</style>
