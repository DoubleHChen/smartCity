<template>
	<view style="padding: 10px; padding-bottom: 40px;">
		<view style="padding: 10px;background-color: white;" class="u-f-w-700">
			<text>店家：{{details.sellerInfo.name}}</text>
		</view>
		<view style="background-color: white;padding: 10px;min-height: 70px;"
			v-for="(item,index) in details.orderInfo.orderItemList" :key="index" :index="index">
			<view>
				<view class="u-flex">
					<image :src="$url + item.productImage"
						style="width: 50px;height: 50px;float: left;margin-right: 10px;" mode="aspectFill"></image>
					<view class="u-flex-7 ">菜名：{{item.productName}}x {{item.quantity}}
					</view>
					<view>
						价格:<text style="color: red;">￥{{item.totalPrice}}</text>
					</view>
				</view>
			</view>

		</view>
		<view style="margin-top: 20px;background-color: white;display: flex;justify-content: flex-end;padding: 10px;">
			总价：<text style="color: red;">￥{{details.orderInfo.amount}}</text>
		</view>
		<view style="margin-top: 20px;">
			<!-- <uni-section title="订单信息" type="line"></uni-section> -->
			<view class="u-f-w-700 u-m-l-20 u-m-b-20">订单详情</view>
			<view style="padding: 10px; background-color: white;">
				<view>订单编号：{{details.orderInfo.orderNo}}</view>
				<view>下单时间：{{details.orderInfo.createTime}}</view>
				<view v-if="details.orderInfo.paymentType != null">支付类型：{{details.orderInfo.paymentType}}</view>
				<view v-else>支付类型：无</view>
				<view>收货地址：{{details.orderInfo.receiverAddress}}</view>
				<view>收货人：<text
						style="text-indent: 15px;display: inline-block;">{{details.orderInfo.receiverName}}</text>
				</view>
				<view>收货手机：{{details.orderInfo.receiverPhone}}</view>
				<view>订单状态：<text style="color: red;">{{details.orderInfo.status}}</text></view>
			</view>
		</view>
		<view class="btn">
			<u-button type="warning" @click="index">回到首页</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo: "",
				rateValue: 0,
				content: "",
				token: "",
				details: []
			}

		},
		onLoad(index) {
			this.orderNo = index.orderNo
			uni.request({
				url: this.$url + "/prod-api/api/takeout/order/" + index.orderNo,
				method: 'GET',
				header: {
					"Authorization": uni.getStorageSync('token')
				},
				success: (resp) => {
					console.log(resp);
					if (resp.data.code == 200) {
						this.details = resp.data.data
					} else {
						uni.showToast({
							icon: 'error',
							title: "查看失败"
						})
					}
				}
			})
		},
		methods: {
			index() {
				uni.navigateTo({
					url:'/pages/food/food'
				})
			}
		}
	}
</script>

<style>
	.btn {
		position: fixed;
		left: 2%;
		right: 2%;
		bottom: 0;
	}
</style>
