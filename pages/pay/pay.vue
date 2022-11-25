<template>
	<view class="u-padding-20">
		<view class="order u-padding-20 u-m-b-40" style="background-color: #fff;">
			<view class=" u-f-w-700  u-m-b-30">订单号:{{number}}</view>
			<view class=" u-f-w-700 u-text-center u-type-warning u-font-40 u-m-b-30">￥{{price}}</view>
			<view class="u-text-center">{{name}}</view>
		</view>
		<view class="u-padding-20" style="background-color: #fff;">
			<u-radio-group v-model="value" :wrap="true">
				<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
					:disabled="item.disabled">
					{{item.name}}
					<u-icon :name="item.icon" size="30px" class="icon"></u-icon>
				</u-radio>
			</u-radio-group>
		</view>
		<view class="btn">
			<u-button type="warning" @click="pay">立即支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: null,
				price: null,
				name: '',
				list: [{
						name: '电子支付',
						disabled: false,
						icon: 'red-packet-fill'
					},
					{
						name: '微信支付',
						disabled: false,
						icon: 'weixin-fill'
					},
					{
						name: '支付宝支付',
						disabled: false,
						icon: 'zhifubao-circle-fill '
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '',
			}
		},
		onLoad(options) {
			console.log(options);
			this.number = options.number
			this.price = options.price
			this.name = options.name
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {},
			pay() {
				this.$u.post(this.$url + '/prod-api/api/takeout/pay', {
					"orderNo": this.number,
					"paymentType": this.value
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						uni.$u.toast('支付成功')
						// this.siteList = res.data
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/food/orderDetails?orderNo=' + this.number
							})
						}, 1000)

					} else {
						uni.$u.toast(res.msg)
					}

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		margin-left: 180px;
	}

	.btn {
		position: fixed;
		left: 50rpx;
		right: 50rpx;
		bottom: 30px;
	}
</style>
