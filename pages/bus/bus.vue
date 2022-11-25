<template>
	<view class="u-padding-20">

		<u-collapse :accordion="false">
			<u-collapse-item :title="head" :open="open" :disabled="disabled" @change="change">
				<!-- {{body}} -->
				<view class="">123423</view>
				<view class="">123423</view>
				<view class="">123423</view>
				<view class="">123423</view>
			</u-collapse-item>
		</u-collapse>
		<view class="u-border-bottom u-m-b-28 u-p-b-20" v-for="item in lineList" :key="item.id">
			<view class=""> {{item.name}}</view>
			<view class=""> {{item.first}}---{{item.end}}</view>
			<view class=""> {{item.startTime}}{{item.endTime}}</view>
			<view class=""> 里程：{{item.mileage}}</view>
			<view class=""> 票价{{item.price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				head: "打开",
				body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
				open: false,
				disabled: false,
				flag: true,
				lineList: []
			}
		},
		onLoad() {
			this.getLine()
		},
		methods: {
			change(e) {
				// this.disabled = !this.disabled
				// console.log(e);
				// console.log(this.open);
				if (this.flag) {
					this.flag = !this.flag
					this.head = '收起'
				} else {
					this.flag = !this.flag
					this.head = '打开'
				}
			},
			// 获取路线列表
			async getLine() {
				const res = await this.$u.get(this.$url + '/prod-api/api/bus/line/list')
				if (res.code === 200) {
					for (let item of res.rows) {
						item.detail = []
						const detail = await this.$u.get(this.$url + '/prod-api/api/bus/stop/list?linesId=' + item.id)
						for (let info of detail.rows) {
							item.detail.push(info)
						}
						// console.log(detail);
					}
					this.lineList = res.rows
					console.log(res);

					// this.nearbyList = res.rows
					// console.log(this.nearbyList);


				}
			}
		}
	}
</script>

<style>

</style>
