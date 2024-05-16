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
	@keyframes boot{
		0%{
			width: 100%;
			height: 100%;
			bottom: 0;
			border-radius: 0;
			left: 0;
			z-index: 3;
		}
		30%{
			width: 40px;
			height: 40px;
			border-radius: 10px;
			left: calc(50% - 20px);
		}
		60%{
			bottom: 100px;
			opacity: 1;
			z-index: 0;
		}
		100%{
			width: 40px;
			height: 40px;
			bottom: 40px;
			border-radius: 10px;
			opacity: 0;
			left: calc(50% - 20px);
		}
	}
</style>
