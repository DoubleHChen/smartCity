<template>
	<view>
		<view class="btn">
			<u-button type="primary" @click="goRecord">停车记录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goRecord() {
				uni.navigateTo({
					url:'/pages/park/record'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.btn {
	position: fixed;
	left: 5%;
	right: 5%;
	bottom: 0;
}
</style>
