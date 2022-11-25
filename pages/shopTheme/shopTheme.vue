<template>
	<view>
		<view class="u-padding-20 u-border-bottom" v-for="(item,index) in themeList" :key="index"
			@click="goDetail(item.id)">
			<view class="u-flex">
				<u-image :src="$url+item.imgUrl" mode="aspectFill" width="150px" height="90px"></u-image>
				<view class="u-m-l-10">
					<view class="u-main-color "> {{item.name}}</view>
					<view class="u-type-warning">月销量：{{item.saleQuantity}}</view>
					<view class="u-m-r-20">近3小时销量:{{item.saleNum3hour}}</view>
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
				themeList: []
			}
		},
		onLoad(options) {
			console.log(options);
			this.getTheme(options.sort)
		},
		methods: {
			async getTheme(sort) {
				await this.$u.get(this.$url + '/prod-api/api/takeout/seller/list', {}, {}).then(res => {
					if (res.code === 200) {
						console.log(res);
						this.themeList = res.rows.filter(item => item.themeId == sort)
						console.log(this.themeList);
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
