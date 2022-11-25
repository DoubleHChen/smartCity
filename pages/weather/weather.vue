<template>
	<view class="weather">
		<view class="toady u-border-bottom u-text-center">
			<view class="temp">{{weatherList.today.tempInfo.temperature}}<text>℃</text></view>
			<view class="">{{weatherList.today.tempInfo.minTemperature}}/{{weatherList.today.tempInfo.maxTemperature}}℃
			</view>
			<view class="">紫外线强度: {{weatherList.today.tempInfo.uv}}</view>
			<view class="">空气： {{weatherList.today.tempInfo.air}}</view>
			<view class="u-flex u-margin-top-80 u-row-between u-padding-20">
				<view class="u-flex">
					<view class="u-m-r-18">{{weatherList.today.tempInfo.weather}}</view>
					<view class="">{{weatherList.today.comfortLevel.sportIndex}}</view>
				</view>
				<view class="">上次更新时间：{{weatherList.today.updateTime}}</view>
			</view>

		</view>
		<view class="hours u-border-bottom">
			<view class="u-flex u-row-between u-text-center u-padding-20" style="overflow-x: auto;">
				<view class="" v-for="item in weatherList.today.hours">
					<view class="">{{item.hour}}</view>
					<view class="">{{item.weather}}</view>
					<view class="">{{item.temperature}}℃</view>
				</view>
			</view>
		</view>
		<view class="week">
			<view class="" style="overflow-x: auto;">
				<view class="u-flex u-border-bottom u-p-t-20 u-p-b-30 u-row-between" v-for="item in weatherList.weatherList">
					<view class="">{{item.day}}</view>
					<view class="">{{item.weather}}</view>
					<view class="">湿度{{item.humidity}}</view>
					<view class="">{{item.maxTemperature}}/{{item.minTemperature}}℃</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weatherList: []
			}
		},
		onLoad() {
			this.weather()
		},
		methods: {
			async weather() {
				const res = await this.$u.get(this.$url + '/prod-api/api/common/weather')
				this.weatherList = res.data
				console.log(res.data);
			},
		}
	}
</script>

<style scoped lang="scss">
	.weather {
		background-color: #6cb6ff;
		color: #fff;

		.toady {
			padding-top: 50px;

			.temp {
				padding-bottom: 20px;
				font-size: 70px;
			}

			.temp text {
				font-size: 20px;
				vertical-align: text-top;
			}
		}

		.week {
			padding: 20rpx;
		}
	}
</style>
