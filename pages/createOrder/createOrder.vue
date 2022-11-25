<template>
	<view class="u-padding-20" style="background-color: #ececec;">
		<!-- 地址 -->
		<view class="site u-padding-20 u-m-b-30">
			<view class="" v-if="showSite" @click="handleSelect">
				<view class="u-font-36 u-f-w-700">{{site}}</view>
				<view class="u-flex ">
					<view class="u-m-r-30">{{name}}</view>
					<view class="">{{phone}}</view>
				</view>
			</view>
			<view class="" @click="handleSelect" v-else>请选择收货地址</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<view class="u-f-w-700 u-text-center u-font-36 u-m-t-28">选择收货地址</view>
			<view class="u-border-bottom u-padding-20" v-for="item in siteList" :key="item.id">
				<view class="u-flex">
					<view class="u-flex-10" @click="alter(item)">
						<view class="u-flex">
							<view class="u-m-r-30 u-flex-1">{{item.label}}</view>
							<view class="u-type-primary u-flex-8">{{item.addressDetail}}</view>
						</view>
						<view class="u-flex">
							<view class="u-m-r-30 u-type-warning">{{item.name}}</view>
							<view class="">{{item.phone}}</view>
						</view>
					</view>
					<view class="u-flex-1">
						<u-icon name="edit-pen" @click="addSite(item)"></u-icon>
					</view>

				</view>

			</view>
			<view class="u-m-t-28">
				<u-button @click="alterSite" type="warning">新增地址</u-button>
			</view>
		</u-popup>
		<!-- 订单 -->
		<view class="detail u-padding-20 bg ">
			<view class=" u-type-warning u-f-w-700 u-font-40 u-border-bottom u-p-b-20 u-m-b-20">{{shopName}}</view>
			<view class="u-flex " v-for="(item,index) in list " :key="index">
				<view class="img u-m-r-18">
					<u-image :src="$url+item.productImg" mode="widthFix" width="200rpx"></u-image>
				</view>
				<view class="u-flex-8">
					<view class="u-f-w-700 u-font-md">{{item.productName}}</view>
					<view class="">数量：{{item.quantity}}</view>
				</view>
				<view class="u-type-warning">￥{{item.productPrice}}</view>
			</view>
		</view>

		<view class="order u-flex ">
			<view class="u-type-error u-f-w-700 u-m-r-30">￥{{price}}</view>
			<view class="u-flex-8">数量:{{num}}</view>
			<u-button type="warning" @click="submit()">提交订单</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				num: null,
				price: null,
				shopName: '',
				sellerId: null,
				show: false,
				siteList: [],
				showSite: false,
				name: '',
				phone: '',
				site: '',
				label: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.list = uni.getStorageSync('productList')
			this.shopName = options.shopName
			this.sellerId = options.sellerId
			this.num = uni.getStorageSync('orderNum')
			this.price = uni.getStorageSync('orderPrice')

		},
		onShow() {
			this.getSiteList()
		},
		methods: {
			async submit() {
				if (this.site) {
					await this.$u.post(this.$url + '/prod-api/api/takeout/order/create', {
						"addressDetail": this.site,
						"label": this.label,
						"name": this.name,
						"phone": this.phone,
						"amount": this.price,
						"orderItemList": this.list,
						"sellerId": this.sellerId
					}, {
						'Authorization': uni.getStorageSync('token')
					}).then(res => {
						console.log(res);
						if (res.code === 200) {
							uni.$u.toast('提交成功')
							uni.setStorageSync('orderPrice', '')
							uni.setStorageSync('orderNum', '')
							uni.setStorageSync('productList', '')
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/pay/pay?number=' + res.orderNo + '&&price=' +
										this.price + '&&name=' + this.shopName
								})
							}, 1000)
						}

					});
				} else {
					uni.$u.toast('请选择地址')
					setTimeout(()=> {
						this.show=true
					},1000)
				}


			},
			handleSelect() {
				this.show = true
				this.getSiteList()
			},

			getSiteList() {
				this.$u.get(this.$url + '/prod-api/api/takeout/address/list', {}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						// uni.$u.toast('收藏成功')
						this.siteList = res.data
					}

				});
			},
			addSite(info) {
				uni.navigateTo({
					url: '/pages/addSite/addSite?name=' + info.name + '&&phone=' + info.phone + '&&label=' + info
						.label + '&&addressDetail=' + info.addressDetail + '&&id=' + info.id
				})
			},
			alterSite() {
				uni.navigateTo({
					url: '/pages/alterSite/alterSite'
				})
			},
			alter(info) {
				this.showSite = true
				this.show = false
				this.name = info.name
				this.phone = info.phone
				this.label = info.label
				this.site = info.addressDetail
			}
		}
	}
</script>

<style lang="scss">
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

	.site,
	.detail {
		background-color: #fff;
	}
</style>
