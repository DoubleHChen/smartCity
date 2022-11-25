<template>
	<view>
		<view class="" v-show="current==0">首页</view>
		<view class="" v-show="current==1">订单</view>
		<view class="" v-show="current==2">我的</view>
		<u-tabbar v-model="current" :list="list" ></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						customIcon: false,
					},
					{
						iconPath: "bag",
						selectedIconPath: "bag-fill",
						text: '订单',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						customIcon: false,
					},
				],
				current: 0
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
