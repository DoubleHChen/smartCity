<template>
	<view>
		<uni-nav-bar right-text="新增地址" title="地址管理" left-icon="left" @clickLeft="left" @clickRight="right"
			backgroundColor="#ffc107" />
		<view class="u-border-bottom u-padding-20" v-for="item in siteList" :key="item.id">
			<view class="u-flex">
				<view class="u-flex-10" @click="alter(item)">
					<view class="u-flex">
						<view class="u-m-r-30">{{item.label}}</view>
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
		<uni-fab ref="fab" :pattern="pattern" @fabClick="fabClick" horizontal="right" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteList: [],
				pattern: {
					buttonColor: "#ffc107",
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#ffc107',
					iconColor: '#fff'
				},
				background: {
					backgroundColor: '#ffc107',
				}
			}
		},
		onLoad() {},
		onShow() {
			this.getSiteList()
		},
		methods: {
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
			alter(info) {
				this.showSite = true
				this.show = false
				this.name = info.name
				this.phone = info.phone
				this.label = info.label
				this.site = info.addressDetail
			},
			addSite(info) {
				uni.navigateTo({
					url: '/pages/addSite/addSite?name=' + info.name + '&&phone=' + info.phone + '&&label=' + info
						.label + '&&addressDetail=' + info.addressDetail + '&&id=' + info.id
				})
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/alterSite/alterSite'
				})
			},
			left() {
				uni.navigateBack(1)
			},
			right() {
				uni.navigateTo({
					url: '/pages/alterSite/alterSite'
				})
			}
		}
	}
</script>

<style>

</style>
