<template>
	<view class="food">
		<!-- 首页 -->
		<view class="index" v-show="current==0">
			<view class="u-flex">
				<view class="" @click="city">
					<u-icon name="map-fill" size="30"></u-icon>{{place}}
				</view>

				<u-search placeholder="搜索" v-model="value" :animation="true" shape="aquare" @search="search"></u-search>
			</view>
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="600">
				<swiper-item v-for="item in imgList" :key="item.id">
					<image :src="$url+item.advImg" mode="widthFix" @click="goDetail(8)" style="width: 100%;">
					</image>
				</swiper-item>
			</swiper>
			<!-- 店铺类别 -->
			<u-grid :border="false" col="5">
				<u-grid-item v-for="(listItem,listIndex) in themeList" :key="listIndex" @click="goto(listItem.sort)">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="$url+listItem.imgUrl" :size="46"></u-icon>
					<text class="grid-text" style="font-size: 18rpx;">{{listItem.themeName}}</text>
				</u-grid-item>
			</u-grid>
			<!-- 功能分类 -->
			<view class="u-m-t-28 u-bg-gray">
				<view class="u-m-l-28  u-font-40 u-m-b-28" style="font-weight: 700;">推荐好店</view>
				<u-row gutter="16">
					<u-col span="6" v-for="item in recommendList" :key="item.id" class="u-m-b-28 "
						@click="goDetail(item.id)">
						<u-image :src="$url+item.imgUrl" width="100%" height="250rpx" mode="aspectFill"></u-image>
						<view class="u-font-36 u-m-t-20 u-line-1 u-f-w-700">{{item.name}}</view>
						<view class="u-type-warning">评分: {{item.score}}</view>
						<view class="">近3小时销量: {{item.saleNum3hour}}</view>
					</u-col>
				</u-row>
			</view>
			<!-- 附近店铺 -->
			<view class="">
				<view class="u-m-l-28  u-font-40 u-m-b-28" style="font-weight: 700;">附近店铺</view>
				<view class="u-padding-20 u-border-bottom" v-for="(item,index) in nearbyList" :key="index"
					@click="goDetail(item.id)">
					<view class="u-flex">
						<u-image :src="$url+item.imgUrl" mode="aspectFill" width="150px" height="200rpx"></u-image>
						<view class="u-m-l-10">
							<view class="u-main-color u-f-w-700"> {{item.name}}</view>
							<view class="u-flex">
								<view class="u-main-color u-m-r-20 u-type-primary"> {{item.deliveryTime}}分钟</view>
								<view class="u-main-color "> {{item.distance}}m</view>
							</view>
							<view class="u-main-color ">人均消费: {{item.avgCost}}</view>
							<view class="u-flex u-font-xs">
								<view class="u-type-warning u-m-r-20">月销量：{{item.saleQuantity}}</view>
								<view class="u-m-r-20">近3小时销量:{{item.saleNum3hour}}</view>
							</view>
							<view class="u-font-sm u-type-primary"> 评分: {{item.score}}</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order" v-show="current==1">
			<uni-segmented-control :current="current1" :values="items" style-type="button" active-color="#ffc107"
				@clickItem="onClickItem" />
			<view class="allContent" v-for="(item,index) in nowOrder" :key="index" @click="gotoDeatils(index)">
				<view class="allTitle">
					<text>{{item.orderInfo.orderNo}}</text>
					<!-- <text >{{item.sellerInfo.name}}</text> -->
					<!-- <text>贡茶</text> -->
					<text style="float: right;color: red;">{{item.orderInfo.status}}</text>
				</view>
				<view class="allTitleContent">
					<!-- <image :src="$url + item.sellerInfo.imgUrl" mode="aspectFill" style="width: 100px;height: 80px;"></image> -->
					<image src="../../static/c1.png" mode="aspectFill"
						style="width: 100px;height: 100px;margin-right: 10px;"></image>
					<view class="allContentMiddle">
						<view>时间：{{item.orderInfo.createTime}}</view>
						<view>总价格：￥ {{item.orderInfo.amount}}</view>
						<view>
							<text v-if="item.orderInfo.paymentType != null">
								支付方式：{{item.orderInfo.paymentType}}
							</text>
							<text v-else>支付方式：无</text>
						</view>
					</view>
					<view v-if="current1 == 1 ">
						<u-button size="mini" @click="goToPay(item)">去支付</u-button>
					</view>
					<view v-if="current1 == 2 ">
						<view>
							<u-button size="mini" style="margin-bottom: 10px;" @click="goTuikuan(index)">退款</u-button>
							<u-button size="mini" @click="gotoPingjia(index)">评价</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="me" v-show="current==2">
			<view class="header u-text-center">
				<u-image :src="avatar" mode="widthFix" width="200rpx" @click="clickHeader" style="margin: 0 auto;">
				</u-image>
				<view class="header-user" v-if="user.nickName">{{user.nickName}}</view>
				<view class="header-text" v-else>请点击头像登录</view>
			</view>
			<view class="list u-m-t-40">
				<uni-list>
					<uni-list-item title="地址管理" showArrow @click.native="go('../site/site')"></uni-list-item>
					<uni-list-item title="我的收藏" showArrow @click.native="go('../collect/collect')"></uni-list-item>
					<uni-list-item title="我的订单" showArrow @click.native="current=1"></uni-list-item>
				</uni-list>
			</view>
			<view class="btn">
				<u-button type="warning" @click="logout" v-if="user.nickName">退出登录</u-button>
				<u-button type="warning" @click="login" v-else>登录</u-button>
			</view>

		</view>
		<u-tabbar v-model="current" :list="list" active-color="#ffc107" @change="change"></u-tabbar>
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
						count: null
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						customIcon: false,
					},
				],
				current: 0,
				imgList: [],
				value: '',
				themeList: [],
				recommendList: [],
				nearbyList: [],
				user: '',
				avatar: '../../static/me/header.png',
				token: '',
				orderList: [],
				nowOrder: [],
				items: ['全部', '待支付', '待评价', '退款', '完成'],
				current1: 0,
				place: null
			}
		},
		onLoad(options) {

			this.getImg()
			this.getTheme()
			this.getRecommend()
			this.getNearby()
			this.token = uni.getStorageInfoSync('token')
			// this.user = uni.getStorageSync('user')
			// this.getOrder()
			this.place = options.city
			if (this.place == null) {
				this.getPlace()
			}
			// console.log(options);
		},
		onShow() {
			// this.token = uni.getStorageInfoSync('token')
			this.user = uni.getStorageSync('user')
			this.getOrder()
		},
		methods: {
			getPlace() {
				this.$u.get(this.$url + '/prod-api/api/common/gps/location', {}, {}).then(res => {
					if (res.code === 200) {
						this.place = res.data.city
					}
				});
			},
			city() {
				uni.navigateTo({
					url: '/pages/cityList/city'
				})
			},
			getSheng() {

			},
			getImg() {
				this.$u.get(this.$url + '/prod-api/api/takeout/rotation/list', {}, {}).then(res => {
					if (res.code === 200) {
						this.imgList = res.rows
					} else {
						uni.$u.toast(res.msg)
					}
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + id
				})
			},
			search(e) {
				uni.navigateTo({
					url: '/pages/search/search?value=' + this.value
				})

			},
			goto(sort) {
				uni.navigateTo({
					url: '/pages/shopTheme/shopTheme?sort=' + sort
				})

			},
			// 获取店铺类别主题
			getTheme() {
				this.$u.get(this.$url + '/prod-api/api/takeout/theme/list', {}, {}).then(res => {
					if (res.code == 200) {
						this.themeList = res.data
					} else {
						uni.$u.toast(res.msg)
					}
				});
			},
			async getRecommend() {
				await this.$u.get(this.$url + '/prod-api/api/takeout/seller/list', {}, {}).then(res => {
					if (res.code === 200) {
						this.recommendList = res.rows.filter(item => item.recommend == 'Y')
						// console.log(this.recommendList);
					}

				});
			},
			async getNearby() {
				await this.$u.get(this.$url + '/prod-api/api/takeout/seller/near', {}, {}).then(res => {
					if (res.code === 200) {
						this.nearbyList = res.rows
						// console.log(this.nearbyList);
					}

				});
			},
			change(e) {},
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
							uni.$u.toast('退出成功')
							uni.clearStorage('token')
							that.token = null
							uni.clearStorage('user')
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 1500)
						} else {
							that.$u.toast(res.data.msg)
						}
					}
				})
			},
			clickHeader() {
				if (this.user) {
					uni.navigateTo({
						url: '/pages/info/info'
					})
				} else {
					this.login()
				}
			},
			async getOrder() {
				let that = this
				uni.request({
					url: ' http://124.93.196.45:10001/prod-api/api/takeout/order/list',
					method: 'GET',
					header: {
						"Authorization": uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.code == 200) {
							// console.log(res.data);
							that.orderList = res.data.rows
							// console.log(that.orderList);
							that.nowOrder = that.orderList
							that.list[1].count = res.data.total
						} else if (res.data.code == 401) {
							uni.$u.toast('登录已过期，请重新登录')
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 1000)
						}
					}
				})
				// const res  = await this.$u.get(this.$url + 'prod-api/api/takeout/order/list', {}, {
				// 	"Authorization": this.token
				// })
				// console.log(res);
				// .then(res => {
				// 	console.log(res);
				// 	if (res.code == 200) {
				// 		this.orderList = res.rows
				// 		this.nowOrder = this.orderList
				// 		this.list[1].count = res.total
				// 	} else if (res.code == 401) {
				// 		uni.$u.toast('登录已过期，请重新登录')
				// 		setTimeout(() => {
				// 			uni.navigateTo({
				// 				url: '/pages/login/login'
				// 			})
				// 		}, 1000)
				// 	}
				// })
			},
			// 切换订单类型
			onClickItem(e) {
				if (this.current1 !== e.currentIndex) {
					this.current1 = e.currentIndex
				}
				if (e.currentIndex == 0) {
					this.nowOrder = this.orderList
				} else if (e.currentIndex == 1) {
					this.nowOrder = this.orderList.filter(item => item.orderInfo.status == '待支付')
				} else if (e.currentIndex == 2) {
					this.nowOrder = this.orderList.filter(item => item.orderInfo.status == '待评价')
				} else if (e.currentIndex == 3) {
					this.nowOrder = this.orderList.filter(item => item.orderInfo.status == '退款')
				} else if (e.currentIndex == 4) {
					this.nowOrder = this.orderList.filter(item => item.orderInfo.status == '完成')
				}
				// console.log(e.currentIndex);
			},
			go(url) {
				uni.navigateTo({
					url: url
				})
			},
			goTuikuan(index) {
				uni.navigateTo({
					url: "/pages/food/tuikuan?orderNo=" + this.nowOrder[index].orderInfo.orderNo
				})

			},
			gotoPingjia(index) {
				// console.log(index);
				uni.navigateTo({
					url: "/pages/food/pingjia?orderNo=" + this.nowOrder[index].orderInfo.orderNo
				})
			},
			goToPay(info) {
				uni.navigateTo({
					url: "/pages/pay/pay?number=" + info.orderInfo.orderNo + '&&price=' + info
						.orderInfo.amount + '&&name=' + info.sellerInfo.name
				})
			},
			gotoDeatils(index) {
				let orderNo = this.nowOrder[index].orderInfo.orderNo
				uni.navigateTo({
					url: "/pages/food/orderDetails?orderNo=" + orderNo
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.food {
		// padding-top: 30px;
		margin: 20rpx;
	}

	.btn {
		position: fixed;
		left: 10%;
		right: 10%;
		bottom: 10%;
	}

	.allContent {
		background-color: white;
		padding: 10px;
		border-radius: 10px;
		margin-top: 10px;
	}

	.allTitle {
		border-bottom: 1px solid #ccc;
	}

	.allTitleContent {
		display: flex;
		align-items: center;
	}

	.allContentMiddle {
		min-width: 400rpx;
	}

	.fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 45px;
		z-index: 99;
	}
</style>
