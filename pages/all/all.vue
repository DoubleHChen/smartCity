<template>
	<view>
		<u-grid :col="5">
			<u-grid-item v-for="item in allList" :key="item.id" @click="goto(item.serviceName)">
				<u-icon :name="$url+item.imgUrl" :size="46"></u-icon>
				<view class="grid-text">{{item.serviceName}}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allList: [],
			}
		},
		onLoad() {
			this.getAll()
		},
		methods: {
			getAll() {
				this.$u.get(this.$url + '/prod-api/api/service/list', {}, {}).then(res => {
					if (res.code == 200) {
						this.allList = res.rows.sort(function(a,b) {
							return b.sort - a.sort
						})
					}
				});
			},
			goto(url) {
				switch (url) {
					case '外卖订餐':
					uni.navigateTo({
						url:'/pages/food/food'
					})
				}
			}
		}
	}
</script>

<style>

</style>
