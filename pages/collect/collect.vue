<template>
	<view>
		<view class="u-padding-20 u-border-bottom" v-for="(item,index) in collectList" :key="index"
			@click="goDetail(item.sellerId)">
			<view class="u-flex">
				<u-image :src="$url+item.imgUrl" mode="aspectFill" width="150px" height="200rpx"></u-image>
				<view class="u-m-l-10">
					<view class="u-main-color u-f-w-700 u-font-40"> {{item.sellerName}}</view>
					<view class="u-type-warning u-m-r-20">
						月销量：{{item.saleQuantity}}
					</view>
					<view class="u-font-sm u-type-primary"> 评分: {{item.score}}</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectList: []
			}
		},
		onLoad() {
			this.getCollect()
		},
		methods: {
			getCollect() {
				this.$u.get(this.$url + '/prod-api/api/takeout/collect/list', {}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.collectList = res.rows
					}
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + id
				})
			},
		}
	}
</script>

<style>

</style>
