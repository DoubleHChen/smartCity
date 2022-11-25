<template>
	<view>
		<view class="header">
			<image :src="avatar" mode="widthFix" class="header-img" @click="clickHeader"></image>
			<view class="header-user" v-if="token">{{user.nickName}}</view>
			<view class="header-text" v-else>请点击头像登录</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item title="地址管理" showArrow @click.native="goto('../site/site')"></uni-list-item>
				<uni-list-item title="我的收藏" showArrow @click.native="goto('../collect/collect')"></uni-list-item>
				<!-- <uni-list-item title="我的订单" showArrow @click.native="goto('../indent/indent')"></uni-list-item> -->
			</uni-list>
		</view>
		<u-button type="primary" @click="logout" v-if="token">退出登录</u-button>
		<u-button type="primary" @click="login" v-else>登录</u-button>
		<u-tabbar v-model="current" :list="list"></u-tabbar>
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
				current: 2
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			logout() {
				let that = this
				uni.request({
					url: this.$url + '/prod-api/api/logout',
					method: "POST",
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					success(res) {
						if (res.data.status == 404) {
							// console.log('退出登录');
							uni.clearStorage('token')
							that.token = null
							uni.clearStorage('user')
							// this.getInfo()

							setTimeout(function() {
								// that.$router.go(0)
								//强制刷新
								// location.reload()
							}, 100)
						} else {
							that.$toast(res.data.msg)
						}
					}
				})

			},
		}
	}
</script>

<style>

</style>
