<template>
	<view>
		<u-search placeholder="搜索" v-model="value" :animation="true" shape="aquare" @search="search"
			border-color="#ffc107" class="u-padding-10"></u-search>
		<u-gap height="10" bgColor="#ccc"></u-gap>
		<view class="u-padding-20 u-border-bottom" v-for="(item,index) in list" :key="index"
			@click="goDetail(item.sellerId)">
			<view class="u-flex">
				<u-image :src="$url+item.imgUrl" mode="aspectFill" width="150px" height="90px"></u-image>
				<view class="u-m-l-10">
					<view class="u-main-color "> {{item.name}}</view>
					<view class="u-type-warning">月销量：{{item.saleQuantity}}</view>
					<view class="u-flex">
						<view class="u-m-r-20">{{item.price}}元</view>
						<view class="u-font-sm u-tips-color"> 好评率: {{item.favorRate}}%</view>
					</view>

				</view>

			</view>
		</view>
		<view class="u-f-w-700 u-m-t-28" v-if="list==''">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				list: []
			}
		},
		onLoad(options) {
			console.log(options);
			this.value = options.value
			this.search(this.value)
		},
		methods: {
			search() {
				this.$u.get(this.$url + '/prod-api/api/takeout/search?keyword=' + this.value, {}, {}).then(res => {
					if (res.code === 200) {
						for (let item of res.rows) {
							this.list.push(item.productList[0])
						}
						console.log(this.list);
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

<style lang="scss" scoped>
	.u-border-bottom {
		border-bottom: 2px solid #ccc;
	}
</style>
