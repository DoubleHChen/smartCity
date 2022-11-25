<template>
	<view class="u-padding-20">
		<view class="">
			<view class="">
				<view class="u-text-center u-f-w-700 u-font-40 u-m-b-20"> {{info.name}}</view>
				<view class="u-m-b-28">{{info.address}}</view>
				<!-- <view class="e">语言类型： {{info.language}}</view> -->
				<view class="">
					<u-image :src="$url+info.cover" mode="widthFix" width="100%"></u-image>
				</view>
				<!-- <video id="myVideo" src="$url+info.video" controls enable-progress-gesture></video> -->
				<!-- <view class="" v-html="info.introduction"></view> -->

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.getDetail(options.id)
		},
		methods: {
			async getDetail(id) {
				const res = await this.$u.get(this.$url + '/prod-api/api/movie/theatre/' + id)
				this.info = res.data
				console.log(res.data);
			},
		}
	}
</script>

<style>

</style>
