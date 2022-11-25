<template>
	<view class="container">
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="600">
			<swiper-item v-for="item in imgList" :key="item.id">
				<image :src="$url+item.advImg" mode="widthFix" @click="goDetail(item.id)"></image>
			</swiper-item>
		</swiper>
		<!-- <u-swiper :list="imgList" mode="dot" name="advImg"></u-swiper> -->
		<view class="main">
			<view class="u-m-t-40 u-m-b-20 u-font-lg">推荐服务</view>
			<u-grid :col="5">
				<u-grid-item v-for="item in allList" :key="item.id" @click="goto(item.serviceName)">
					<u-icon :name="$url+item.imgUrl" :size="46"></u-icon>
					<view class="grid-text">{{item.serviceName}}</view>
				</u-grid-item>
				<u-grid-item @click="goto('all')">
					<u-icon name="../../static/me/all.png" :size="46"></u-icon>
					<view class="grid-text">更多服务</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-gap height="20" bg-color="#eee"></u-gap>
		<u-tabs :list="tabs" :current="current" @change="change"></u-tabs>
		<!-- <news-list :newList="newList" /> -->
		<news-list :newsList="newsList"></news-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				allList: [],
				tabs: [],
				current: 0,
				newsList: [],
				type: 9
			}
		},
		onLoad() {
			this.getImg()
			this.getAll()
			this.getTabs()
			this.getNews()
		},
		methods: {
			getImg() {
				this.$u.get(this.$url + '/prod-api/api/rotation/list', {}, {}).then(res => {
					this.imgList = res.rows
				});
			},
			getAll() {
				this.$u.get(this.$url + '/prod-api/api/service/list', {}, {}).then(res => {
					if (res.code == 200) {
						this.allList = res.rows.slice(0, 9)
					}
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/newsDetail/newsDetail?id=' + id
				})
			},
			goto(url) {
				switch (url) {
					case '外卖订餐':
						uni.navigateTo({
							url: '/pages/food/food'
						})
						break
					case 'all':
						uni.switchTab({
							url: '/pages/all/all'
						})
						break
					case '看电影':
						uni.navigateTo({
							url: '/pages/movie/movie'
						})
						break
					case '停哪儿':
						uni.navigateTo({
							url: '/pages/park/park'
						})
						break
					case '智慧巴士':
						uni.navigateTo({
							url: '/pages/bus/bus'
						})
						break
				}
			},
			getTabs() {
				this.$u.get(this.$url + '/prod-api/press/category/list', {}, {}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.tabs = res.data
					}
				});
			},
			change(index) {
				this.current = index;
				this.getNews(index)
			},
			async getNews(e) {
				if (e) {
					this.type = this.tabs[e].id
				}
				this.$u.get(this.$url + '/prod-api/press/press/list?type=' + this
					.type, {}, {}).then(res => {
					if (res.code == 200) {
						// console.log(res.rows);
						this.newsList = res.rows
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10rpx;
	}

	.swiper image {
		width: 100%;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
