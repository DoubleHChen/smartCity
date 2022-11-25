<template>
	<view>
		<image src="../../static/splash/splash1.jpg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			setTimeout(function() {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},1500)
		},
		methods: {
			
		}
	}
</script>

<style scoped>
image {
	width: 100%;
	height: 100vh;
}
</style>
