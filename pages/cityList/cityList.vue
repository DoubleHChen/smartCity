<template>
	<view>
		<view class="list-cell" v-for="itemIndex in cityList" @click="handleClick(itemIndex)">
			{{itemIndex}}
		</view>
		<!-- <u-index-list :scrollTop="scrollTop">
			<view v-for="(item, index) in cityList" :key="index">
				<u-index-anchor :use-slot="true">
					<text class="anchor-text">{{index}}</text>
				</u-index-anchor>
				<view class="list-cell">
					{{item}}
				</view>
			</view>
		</u-index-list> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityList: [],
				sortList: '',
				scrollTop: 0,
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U",
					"V", "W", "X", "Y", "Z"
				]
			}
		},
		onLoad() {
			this.city()
		},
		methods: {
			async city() {
				await this.$u.get(this.$url + '/prod-api/api/common/gps/province', {}, {}).then(res => {
					if (res.code === 200) {
						// const provinceList = []
						// console.log(res);
						for (let item of res.data) {
							this.$u.get(this.$url + '/prod-api/api/common/gps/city?provinceName=' + item
								.name, {}, {}).then(res => {
								if (res.code === 200) {
									for (let itemIndex of res.data) {
										this.cityList.push(itemIndex.name)
									}

								}
							});
						}
					}
				});
				// this.sortList = Array.from(this.cityList)
				// await this.sort()
				// await console.log(this.sortList);
				// await console.log(this.sortList.length);
				await console.log(this.cityList);
				await console.log(this.cityList.length);
			},
			sort() {
				this.sortList.sort((a, b) => {
					return a.localeCompare(b)
				})
				console.log(this.sortList);
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
				// console.log(e);
			},
			handleClick(city) {
				uni.navigateTo({
					url: '/pages/food/food?city=' + city
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
