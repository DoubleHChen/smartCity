<template>
	<view style="padding-top: 10px;">
		<u-tabbar v-model="current1" :list="list"></u-tabbar>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content" style="padding: 10px;">
			<view v-if="current === 0" v-for="(item,index) in allOrder" :key="index" @click="goToOrderDetails(index)" style="background-color: white;">
				{{item.orderInfo.status}}
				<view class="allTitle">
					<text>{{item.sellerInfo.name}}</text>
					<text style="color: black;" @click="goToPay">{{item.orderInfo.status}}</text>
				</view>
				<view class="allContent">
					<!-- <image :src="$url + item.sellerInfo.imgUrl" mode="aspectFill"></image> -->
					<view class="allContentMiddle">
						<view>
							<text>时间：{{item.orderInfo.createTime}}</text>
						</view>
						<view>
							<text>总价格：￥<text style="color: red;">{{item.orderInfo.amount}}</text></text>
						</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="current === 1" v-for="(item,index) in waitPay" :key="index" @click="goToOrderDetails(index)">
				<view class="allTitle">
					<text>{{item.sellerInfo.name}}</text>
					<text style="color: red;">{{item.orderInfo.status}}</text>
				</view>
				<view class="allContent">
					<image :src="'http://124.93.196.45:10001/' + item.sellerInfo.imgUrl" mode="aspectFill"></image>
					<view class="allContentMiddle">
						<view>
							<text>时间：{{item.orderInfo.createTime}}</text>
						</view>
						<view>
							<text>总价格：￥<text style="color: red;">{{item.orderInfo.amount}}</text></text>
						</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
					</view>
					<view class="waitPingjia">
						<button size="mini" @click="goToPay(index)" style="margin-top: 10px;">去支付</button>
					</view>
				</view>
			</view>
			<view v-if="current === 2" v-for="(item,index) in waitPingjia" :key="index"
				@click="goToOrderDetails(index)">
				<view class="allTitle">
					<text>{{item.sellerInfo.name}}</text>
					<text style="color: red;" @click="goToPay">{{item.orderInfo.status}}</text>
				</view>
				<view class="allContent" style="min-height: 140px;">
					<image :src="'http://124.93.196.45:10001/' + item.sellerInfo.imgUrl" mode="aspectFill"></image>
					<view class="allContentMiddle">
						<view>
							<text>时间：{{item.orderInfo.createTime}}</text>
						</view>
						<view>
							<text>总价格：￥<text style="color: red;">{{item.orderInfo.amount}}</text></text>
						</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
						<view class="waitPingjia">
							<button size="mini" @click="goToPingjia(index)">评价</button>
							<button size="mini" @click="goTotuikua(index)">退款</button>
						</view>
					</view>


				</view>
			</view>
			<view v-if="current === 3" v-for="(item,index) in tuikuan" :key="index" @click="goToOrderDetails(index)">
				<view class="allTitle">
					<text>{{item.sellerInfo.name}}</text>
					<text style="color: red;" @click="goToPay">{{item.orderInfo.status}}</text>
				</view>
				<view class="allContent">
					<image :src="'http://124.93.196.45:10001/' + item.sellerInfo.imgUrl" mode="aspectFill"></image>
					<view class="allContentMiddle">
						<view>
							<text>时间：{{item.orderInfo.createTime}}</text>
						</view>
						<view>
							<text>总价格：￥<text style="color: red;">{{item.orderInfo.amount}}</text></text>
						</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="current === 4" v-for="(item,index) in finish" :key="index" @click="goToOrderDetails(index)">
				<view class="allTitle">
					<text>{{item.sellerInfo.name}}</text>
					<text style="color: black;" @click="goToPay">完成</text>
				</view>
				<view class="allContent">
					<image :src="'http://124.93.196.45:10001/' + item.sellerInfo.imgUrl" mode="aspectFill"></image>
					<view class="allContentMiddle">
						<view>
							<text>时间：{{item.orderInfo.createTime}}</text>
						</view>
						<view>
							<text>总价格：￥<text style="color: red;">{{item.orderInfo.amount}}</text></text>

						</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
					</view>
					<view class="waitPingjia">
						<button size="mini" @click="IwantIt(index)" style="margin-top: 10px;">再来一单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				items: ['全部', '待支付', '待评价', '退款', '完成'],
				current: 0,
				colors: ['#007aff', '#4cd964', '#dd524d'],
				styleType: 'button',
				activeColor: '#007aff',
				allOrder: [],
				waitPay: [],
				waitPingjia: [],
				tuikuan: [],
				finish: [],
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
				current1: 1
			}

		},
		onLoad() {
			this.getOrder()
		},
		methods: {
			getOrder() {
				this.$u.get(this.$url + 'prod-api/api/takeout/order/list', {}, {
					"Authorization": uni.getStorageSync('token')
				}).then(resp => {
					console.log(resp);
					if (resp.code == 200) {
						this.allOrder = resp.rows
						for (var i = 0; i < this.allOrder.length; i++) {
							switch (this.allOrder[i].orderInfo.status) {
								case "待支付":
									this.waitPay.push(this.allOrder[i])
									// console.log(_this.waitPay)
									break;
								case "待评价":
									this.waitPingjia.push(this.allOrder[i])
									break;
								case "退款":
									this.tuikuan.push(this.allOrder[i])
									break;
								case "完成":
									this.finish.push(this.allOrder[i])
									break;
							}
						}

					}
				})

			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				console.log(e);
			},
			goToPay(index) {
				console.log(index);
				console.log(this.waitPay[index].orderInfo.orderNo);
				let orderNo = this.waitPay[index].orderInfo.orderNo

				uni.request({
					url: "http://124.93.196.45:10001/prod-api/api/takeout/pay",
					method: 'POST',
					header: {
						"Authorization": this.token
					},
					data: {
						"orderNo": orderNo,
						"paymentType": "电子支付"
					},
					success: (resp) => {
						console.log(resp);
						if (resp.data.code == 200) {
							uni.showToast({
								icon: 'success',
								title: "支付成功"
							})
							setTimeout(this.Pagerefresh(), 1000)
						} else {
							uni.showToast({
								icon: 'error',
								title: "支付失败"
							})
						}
					}
				})
			},
			goToPingjia(index) {
				let orderNo = this.waitPingjia[index].orderInfo.orderNo
				uni.navigateTo({
					url: "/pages/waimai/pingjia?orderNo=" + orderNo
				})

			},
			goTotuikua(index) {
				let orderNo = this.waitPingjia[index].orderInfo.orderNo
				uni.navigateTo({
					url: "/pages/waimai/tuikuan?orderNo=" + orderNo
				})
			},
			Pagerefresh() {
				console.log(1231232);
				uni.redirectTo({
					url: "/pages/waimai/myOrder"
				})
			},
			IwantIt(index) {
				// 跳转至该店铺
			},
			goToOrderDetails(index) {
				let orderNo = this.allOrder[index].orderInfo.orderNo
				uni.navigateTo({
					url: "/pages/waimai/orderDetails?orderNo=" + orderNo
				})
			}
		}
	}
</script>

<style>
	.allTitle {
		border: 1rpx solid #3f3f3f;
		border-bottom: 0px;
		padding: 5px 10px;
		margin-top: 10px;
	}

	.allTitle text:first-child {}

	.allTitle text:last-child {
		float: right;
	}

	.allContent {
		padding: 10px;
		border: 1rpx solid #3f3f3f;
		min-height: 120px;
	}

	.allContent image {
		width: 100px;
		height: 100px;
		float: left;
		margin-right: 10px;
	}

	.allContentMiddle {
		float: left;
	}

	.allContentMiddle view {
		margin-top: 8px;
	}

	.waitPingjia {}

	.waitPingjia button {
		margin-right: 10px;
	}

	.waitPingjia button:last-child {
		background-color: yellow;
	}
</style>
