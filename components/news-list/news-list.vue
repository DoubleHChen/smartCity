<template>
	<view class="news">
		<!-- <u-tabs :list="tabs" :current="current" @change="change"></u-tabs> -->
		<view class="u-flex" v-for="item in newsList" :key="item.id" @click="gotoDetails(item.id)">
			<!-- <u--image :showLoading="true" :src="$url+item.cover" width="250rpx" mode="widthFix" height="auto"
				class="news-img">
			</u--image> -->
			<view class="img u-m-r-18">
				<u-image :src="$url+item.cover" mode="widthFix" width="150px"></u-image>
			</view>

			<!-- <image :src="$url+item.cover" mode="widthFix" width="200px"></image> -->
			<view class="news-item-flex">
				<view class="u-line-2">{{item.title}}</view>
				<view class="">{{item.publishDate}}</view>
				<view class=" u-flex u-tips-color u-font-xs">
					<view class="u-m-r-20">阅读人数：{{item.readNum}}</view>
					<view class="news-good">点赞人数：{{item.likeNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'news-list',
		props: {
			newsList: Array
		},
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			gotoDetails(id) {
				uni.navigateTo({
					url:'/pages/newsDetail/newsDetail?id='+id
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 150px;
	}

	.img image {
		width: 100%;
	}
</style>
