<template>
	<u-index-list :scrollTop="scrollTop" :indexList="indexList">
		<view v-for="(item, index) in data" :key="index">
			<u-index-anchor :index="item.letter" />
			<view class="list-cell" v-for="city in item.list" :key="city.id" @click="handleClick(city)">
				{{city.name}}
			</view>
		</view>
	</u-index-list>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				data: [], // 每一个字母索引里的数据
				indexList: [], // 索引字母
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$u.get("http://124.93.196.45:10001/prod-api/api/common/gps/city")
				const letters = "abcdefghjklmnopqrstwxyz".toUpperCase().split('')
				const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

				letters.forEach((letter, i) => {
					// console.log(i);
					const item = {
						letter,
						list: []
					}

					res.data.forEach(city => {
						// console.log(city.name[0]);
						const firstLetter = city.name[0] //获取城市名的第一个字
						// console.log(firstLetter);
						// localeCompare对比排序，如果排在前面则返回-1，后面返回1，一样的话返回0
						if (firstLetter.localeCompare(zh[i + 1]) < 0 && zh[i]
							.localeCompare(firstLetter) == -1) {
							// 排在第i和第i+1个中间的字就push进当前的list
							item.list.push(city)
						}
					})

					if (item.list.length) {
						// 对item.list进行排序
						item.list.sort((a, b) => a.name.localeCompare(b.name, 'zh'))
						// 如果当前list有城市，就push进data
						this.data.push(item)
					}
				})
				// console.log(this.data);
				// 把每一个字母索引存到indexList,map可对数组进行处理
				this.indexList = this.data.map(item => item.letter)
				// console.log(this.data);
				// console.log(this.indexList);
			},
			handleClick(city) {
				uni.navigateTo({
					url: '/pages/food/food?city=' + city.name
				})
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

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
