<template>
	<view class="login">
		<uni-forms ref="form" :model="formData">
			<uni-forms-item label="账号" label-align="right">
				<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item label="密码" label-align="right">
				<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit">登录</button>
		<navigator url="../register/register" class="goRegister">没有账号，立即注册</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			submit() {
				if (this.formData.username.length == 0) {
					uni.showToast({
						title: '请先输入账号!',
						icon: 'error'
					})
				} else if (this.formData.password.length == 0) {
					uni.showToast({
						title: '请先输入密码！',
						icon: 'error'
					})
				} else {
					this.$u.post(this.$url + '/prod-api/api/login',
						this.formData, {}).then(res => {
						if (res.code == 200) {
							console.log(res);
							this.$u.toast('登录成功',500)
							uni.setStorageSync('token', res.token)
							this.getInfo()
							setTimeout(function() {
								// uni.reLaunch({
								// 	url:'/pages/me/me'
								// })
								uni.navigateBack(1)
							}, 1000)
						}
					})
				}
			},
			getInfo() {
				uni.request({
					url: this.$url + '/prod-api/api/common/user/getInfo',
					method: "GET",
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.setStorageSync('user', res.data.user)
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		margin: 30rpx;
		padding: 20rpx;
		border: 1rpx solid #ccc;
	}

	.goRegister {
		text-align: right;
		color: #007aff;
		margin: 10rpx;
	}
</style>
