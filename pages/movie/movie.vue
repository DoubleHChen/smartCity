<template>
	<view class="u-padding-20 movie">
		<view class="wrap u-m-b-20">
			<u-swiper :list="imgList" name="imgUrl" :effect3d="true"></u-swiper>
		</view>
		<view class="weather u-type-white-bg">
			<view class="u-f-w-700">天气</view>
			<view class="">
				<text style="float: left;margin-top: 13rpx;margin-left: 20rpx;">{{weather.weather}}</text>
				<u-notice-bar :list="info" mode="vertical" :volume-icon="false" type="none" @click="weatherDetail">
				</u-notice-bar>
			</view>
		</view>
		<view class="u-m-t-20 u-type-white-bg item u-p-t-20">
			<view class="u-f-w-700 u-m-l-20 u-type-error">热映影片</view>
			<view class="u-flex" style="overflow-x: auto; text-align: center;">
				<view class="u-margin-20" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
					<u-image :src="$url+item.cover" width="180rpx" height="200rpx" border-radius="10rpx">
					</u-image>
					<view class="u-m-t-20 u-m-b-10 u-font-xs u-f-w-700 u-line-1">{{item.name}}</view>
					<u-button type="error" size="mini">购票</u-button>
				</view>
			</view>
		</view>
		<view class="u-m-t-20 u-type-white-bg item u-p-t-20">
			<view class="u-f-w-700 u-m-l-20 u-type-error">即将上映</view>
			<view class="u-flex" style="overflow-x: auto; text-align: center;">
				<view class="u-margin-20" v-for="item in advanceList" :key="item.id" @click="goDetail(item.id)">
					<u-image :src="$url+item.cover" width="180rpx" height="200rpx" border-radius="10rpx">
					</u-image>
					<view class="u-m-t-20 u-m-b-10 u-font-xs u-f-w-700 u-line-1">{{item.name}}</view>
					<u-button type="warning" size="mini">想看</u-button>
				</view>
			</view>
		</view>
		<!-- 周边影院 -->
		<view class="nearby u-p-t-20">
			<view class="u-f-w-700 u-m-l-20 u-type-warning u-font-36">周边影院</view>
			<view class="u-flex u-type-white-bg u-padding-20 u-m-t-20 item" v-for="item in nearbyList" :key="item.id" @click="goCinema(item.id)">
				<!-- <u-image :src="$url + item.cover"></u-image> -->
				<u-image width="200rpx" height="150rpx" :src="$url + item.cover"></u-image>
				<!-- <image :src="$url + item.cover" mode="widthFix" width="200px" ></image> -->
				<view class="u-m-l-10">
					<view class="u-f-w-700 u-font-32">{{item.name}}</view>
					<view class="">{{item.address}}</view>
					<u-rate :current="item.score/20" :disabled="true"></u-rate> {{item.score}}
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				weather: '',
				info: [],
				imgList: [],
				advanceList: [],
				nearbyList: []
			}
		},
		onLoad() {
			this.movieList()
			this.toadyWeather()
			this.getImg()
			this.getAdvance()
			this.nearby()
		},
		methods: {
			async movieList() {
				const res = await this.$u.get(this.$url + '/prod-api/api/movie/film/list')
				this.list = res.rows
				// console.log(res);
			},
			async toadyWeather() {
				const res = await this.$u.get(this.$url + '/prod-api/api/common/weather/today')
				if (res.code == 200) {
					// console.log(res.data);
					this.weather = res.data
					this.info.push('空气 ' + res.data.air)
					this.info.push('温度 ' + res.data.maxTemperature + '-' + res.data.minTemperature + '℃')
					this.info.push('当前温度 ' + res.data.temperature + '℃')
					this.info.push('湿度 ' + res.data.humidity)
					this.info.push('uv ' + res.data.uv)
					// console.log(this.info);
				} else {
					uni.$u.toast(res.msg)
				}
			},
			weatherDetail() {
				uni.navigateTo({
					url: '/pages/weather/weather'
				})
			},
			async getImg() {
				const res = await this.$u.get(this.$url + '/prod-api/api/movie/rotation/list')
				// console.log(res.rows);
				for (let item of res.rows) {
					item.imgUrl = this.$url + item.advImg
				}
				this.imgList = res.rows
				// console.log(this.imgList);
			},
			// 预告影片信息列表
			async getAdvance() {
				const res = await this.$u.get(this.$url + '/prod-api/api/movie/film/preview/list')
				// console.log(res);
				this.advanceList = res.rows
			},
			// 周边影院
			async nearby() {
				const res = await this.$u.get(this.$url + '/prod-api/api/movie/theatre/list')
				console.log(res.rows);
				this.nearbyList = res.rows
			},
			goDetail(id) {
				uni.navigateTo({
					url:'/pages/movie/movieDetail?id=' + id
				})
				// console.log(id);
			},
			goCinema(id) {
				uni.navigateTo({
					url:'/pages/movie/cinemaDetail?id=' + id
				})
				// console.log(id);
			}
		}
	}
</script>

<style scoped lang="scss">
	.movie {
		background-color: #e5e5e5;
		height: auto;

		.item,
		.weather {
			border-radius: 20rpx;
		}

		.weather {
			margin: 20rpx 0;
			padding: 20rpx;
		}
	}
</style>
