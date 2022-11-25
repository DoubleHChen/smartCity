<template>
	<view class="shopDetail">
		<u-image :src="$url+shopList.imgUrl" mode="aspectFill" width="100%" height="450rpx"></u-image>
		<view class="u-flex ">
			<view class="u-m-l-10 u-flex-11">
				<view class=" u-font-40 u-m-t-28" style="font-weight: 700;"> {{shopList.name}}</view>
				<view class=" m-t-b-20"> 简介：{{shopList.introduction}}</view>
				<view class="u-flex">
					<view class=" ">评分:{{shopList.score}}</view>
					<view class="u-type-warning u-m-l-20 u-m-r-20">月销量:{{shopList.saleQuantity}}</view>
					<view class=" "> 人均:{{shopList.avgCost}}</view>
				</view>
				<view class="u-flex m-t-b-20">
					<view class=" u-m-r-30 u-type-primary"> 配送时间: {{shopList.deliveryTime}}分钟</view>
					<view class=" "> 配送距离: {{shopList.distance}}米</view>
				</view>
			</view>
			<view class="u-flex-1">
				<u-icon name="heart-fill" size="30" @click="unlike()" v-if="collect"></u-icon>
				<u-icon name="heart" size="30" @click="like()" v-else></u-icon>
			</view>
		</view>

		<u-gap height="15" bgColor="#e5e6e6"></u-gap>
		<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs> -->
		<u-tabs-swiper ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" bar-height="6"
			bar-width="80" active-color="#ffc107"></u-tabs-swiper>
		<!-- 点菜 -->
		<view class="" v-show="current==0">
			<view class="select">
				<view class="left">
					<view :class="{'left-item':true,'active':now===index}" v-for="(item,index) in categoryList"
						:key="item.id" @click="changeCategory(item.id,index)">
						<view class="">{{item.name}}</view>
					</view>
				</view>
				<!-- 类别商品列表 -->
				<view class="right">
					<view class="u-flex u-m-b-40 " v-for="item in categoryDetails" :key="item.id">
						<view class="img">
							<u-image :src="$url+item.imgUrl" mode="widthFix" width="200rpx"></u-image>
						</view>

						<view class="u-m-l-10" style="width: 100%;">
							<view class="u-main-color u-font-lg" style="font-weight: 700;">{{item.name}}</view>
							<view class="u-font-xs u-line-2">{{item.detail}}</view>
							<view class="u-flex u-font-sm u-tips-color">
								<view class="u-m-r-18">月销量：{{item.saleQuantity}}</view>
								<view class="">好评率：{{item.favorRate}}</view>
							</view>
							<view class="u-flex u-row-between u-p-r-10" style="width: 100%;">
								<view class="u-type-warning u-f-w-700 u-flex-8">{{item.price}}</view>
								<u-number-box v-model="item.num" bgColor="#ffc107" @change="valChange(item)">
								</u-number-box>
								<!-- 	<view class="">
									<text @click="sub(item)">-</text>
									<text class=" u-m-l-20 u-m-r-20">{{item.num}}</text>
									<text @click="add(item)">+</text>
								</view> -->

							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 评价 -->
		<view class="" v-show="current==1">
			<view class="" v-if="synthetical>0">
				<view class="shopScore u-padding-20 u-flex u-m-b-28">
					<view class="u-m-r-30 u-font-40 u-f-w-700 u-type-warning">{{synthetical}}</view>
					<view class="">
						<view class="">店家评分</view>
						<u-rate :count="5" v-model="synthetical" active-color="#ffc107" :disabled="true"></u-rate>
					</view>
				</view>
				<view class="u-border-bottom u-margin-20 u-p-b-20" v-for="item in commentList" :key="item.id">
					<view class="u-flex">
						<u-image :src="$url+item.avatar" mode="widthFix" height="50rpx" width="50rpx"></u-image>
						<view class="u-m-l-28">
							<view class="">{{item.userName}}</view>
							<view class="">{{item.commentDate}}</view>
						</view>
					</view>
					<u-rate :count="6" v-model="item.score" active-color="#ffc107" :disabled="true"></u-rate>
					<view class="">{{item.content}}</view>
					<view class="reply  u-padding-16" style="background-color: #e8e8e8;" v-if="item.replyContent">
						<view class="">店家回复:{{item.replyContent}} </view>
						<view class="">{{item.replyTime}}</view>
					</view>

				</view>
			</view>
			<view class="u-padding-20 u-font-36 u-f-w-700" v-else>暂无评论</view>
		</view>
		<view class="" v-show="current==2">
			<view class="u-type-warning u-font-40 u-padding-20">{{shopList.introduction}}</view>

		</view>
		<view class="order u-flex ">
			<view class="u-type-error u-f-w-700 u-m-r-30">￥{{price}}</view>
			<view class="u-flex-8">数量:{{number}}</view>
			<u-button type="warning" @click="goAccount(list)">去结算</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList: [],
				list: [{
					name: '点菜'
				}, {
					name: '评价'
				}, {
					name: '商家介绍'
				}],
				current: 0,
				categoryList: [],
				id: null,
				categoryId: null,
				collect: null,
				collectId: null,
				now: 0,
				categoryDetails: [],
				// num: 0,
				// price: 0,
				// sum: 0,
				commentList: [],
				synthetical: 0, //店铺综合评分
				productList: [],
				caiList: []
			}
		},
		onLoad(options) {
			// console.log(options);
			this.id = options.id
			this.getCategory(options.id)
			this.isLike()
			this.getCuisine(options.id)
			// this.getCategoryDetail(options.id,3)
		},
		updated() {
			// this.isLike()
		},
		// 计算属性
		computed: {
			price() {
				let price = 0
				for (let item of this.caiList) {
					price += item.num * item.price
					// this.orderPrice += item.num * item.price
				}
				return price.toFixed(2)
				// return this.orderPrice
			},
			number() {
				let num = 0
				for (let item of this.caiList) {
					num += item.num
					// this.orderNum += item.num
				}
				return num
				// return this.orderNum
			}
		},
		methods: {
			// 获取店铺菜品类别
			getCategory(id) {
				this.$u.get(this.$url + '/prod-api/api/takeout/category/list?sellerId=' + id).then(
					res => {
						// console.log(res.data);
						if (res.code === 200) {
							this.categoryList = res.data
							for (let item of res.data) {
								this.getCategoryDetail(this.id, item.id)
								// console.log(item);
							}
							this.categoryId = res.data[0].id
							// this.getCategoryDetail(this.id, this.categoryId)
							// console.log(res.data[0].id);
						}

					});
			},
			// 获取商店信息
			async getCuisine(id) {
				const res = await this.$u.get(this.$url + '/prod-api/api/takeout/seller/' + id)
				this.shopList = res.data
				console.log(res.data);
			},
			// 切换选项
			change(index) {
				this.current = index;
				if (index == 1) {
					this.getComment()
				}
			},
			like() {
				this.$u.post(this.$url + '/prod-api/api/takeout/collect', {
					sellerId: this.id
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					// console.log(res);
					if (res.code === 200) {
						uni.$u.toast('收藏成功')
						this.collect = true
					}

				});
			},

			unlike() {
				this.$u.delete(this.$url + '/prod-api/api/takeout/collect/' + this.collectId, {}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					// console.log(res); 	
					if (res.code === 200) {
						uni.$u.toast('取消收藏')
						this.collect = false
					}

				});
			},
			//判断是否是收藏店家
			isLike() {
				this.$u.get(this.$url + '/prod-api/api/takeout/collect/check', {
					sellerId: this.id
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					if (res.code === 200) {
						// console.log(res);
						this.collect = res.isCollect
						this.collectId = res.id
					}
				});
			},
			// 改变商品类别
			changeCategory(id, index) {
				this.now = index
				this.changeProduct(id)
				// this.getCategoryDetail(this.id, id)
			},
			// 获取当前类别的商品细节
			getCategoryDetail(sellerId, categoryId) {
				this.$u.get(this.$url + '/prod-api/api/takeout/product/list?sellerId=' + sellerId + '&&categoryId=' +
						categoryId)
					.then(res => {
						if (res.code === 200) {
							console.log(res.data);
							for (let item of res.data) {
								item.num = 0
								this.caiList.push(item)
							}
							// console.log(this.caiList);
							this.changeProduct(this.categoryId)
						}

					});
			},
			changeProduct(id) {
				// console.log(id);
				this.categoryDetails = this.caiList.filter(item => item.categoryId === id)
			},
			valChange(info) {
				console.log(info);
			},

			// 获取评价列表
			getComment() {
				this.$u.get(this.$url + '/prod-api/api/takeout/comment/list?sellerId=' + this.id, {}, {}).then(res => {
					// console.log(res);
					if (res.code === 200) {
						this.commentList = res.rows
						let sum = 0
						for (let item of res.rows) {
							sum += item.score
						}
						this.synthetical = (sum / res.total).toFixed(2)
						if ((sum / res.total) >= 5) {
							this.synthetical = 5.00
						}
						// console.log(this.synthetical);
					}

				});
			},
			add(item) {
				console.log(item);
				item.num++

			},
			sub(item) {
				if (item.num > 0) {
					item.num--
				}
			},
			// 去结算
			goAccount() {
				console.log(this.shopList);
				if (uni.getStorageSync('token')) {
					// 定义一个数组or对象，存储数量大于0的商品，然后传到订单页面
					// console.log(this.number);
					if (this.number > 0) {
						const productList = []
						for (let item of this.caiList) {
							// 当该菜品的数量大于0时，把该菜品的信息存储到商品数组中
							if (item.num) {
								productList.push({
									"productId": item.id,
									"quantity": item.num,
									"productName": item.name,
									"productPrice": item.price,
									"productImg": item.imgUrl,
								})

							}
						}
						uni.setStorageSync('orderPrice', this.price)
						uni.setStorageSync('orderNum', this.number)
						uni.setStorageSync('productList', productList)
						// this.orderPrice = this.price
						// this.orderNum = this.number
						let that = this
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/createOrder/createOrder?sellerId=' + that.id + '&&shopName=' +
									that
									.shopList.name
							})
						}, 200)
					} else {
						uni.$u.toast('请选择商品')
					}


				} else {
					uni.$u.toast('登录已过期，请重新登录')
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 500)
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.shopDetail {
		padding-bottom: 50px;
	}

	.m-t-b-20 {
		margin: 20rpx 0;
	}

	.select {
		display: flex;
	}

	.left {
		width: 150rpx;
		height: auto;
		background-color: #f2f2f2;
	}

	.left-item {
		width: 150rpx;
		// height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.active {
		background-color: #fff;
	}

	.right {
		width: 100%;
		background-color: #fff;
	}

	.img {
		width: 200rpx;
	}

	.right image {
		width: 100%;
	}

	.order {
		position: fixed;
		height: 50px;
		z-index: 9;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		justify-content: space-between;
		width: 100%;
	}

	.shopScore {
		height: 150rpx;
		background-color: #fff;
	}
</style>
