<template>
	<view class="recommend">
		<view class="recommend-title">推荐内容</view>
		<view class="u-flex" v-for="item in recommend" :key="item.id" @click="gotoDetails(item.id)">
			<u-image :src="$url+item.cover" mode="widthFix" width="200px"></u-image>
			<view class="u-m-l-10">
				<view class="u-main-color u-font-md">{{item.title}}</view>
				<view class="">{{item.publishDate}}</view>
				<view class="u-flex u-font-sm u-tips-color">
					<view class="">阅读人数：{{item.readNum}}</view>
					<view class="">点赞人数：{{item.likeNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"recopmmend",
		props: {
			recommend:Array
		},
		data() {
			return {
			};
		},
		onLoad() {
		},
		methods: {
			gotoDetails(id) {
				uni.navigateTo({
					url:'/pages/newsDetail/newsDetail?id=' +id
				})
			}
		}
	}
</script>

<style>

</style>