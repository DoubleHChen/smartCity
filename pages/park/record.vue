<template>
	<view>
		<u-picker v-model="show" mode="time" :params="params" @confirm="confirm"> </u-picker>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
			}
		},
		methods: {
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>

<style>

</style>
