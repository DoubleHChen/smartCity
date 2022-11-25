<template>
	<view>
		<textarea placeholder="评价内容...">123</textarea>
		<button @click="putMsg">发送</button>
		<text>注：1小时内将处理您的反馈意见</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}

		},
		onLoad() {

		},
		methods: {
			putMsg() {
				uni.showToast({
					icon: 'success',
					title: "提交成功"
				})
			}
		}
	}
</script>

<style>
	view {
		padding: 10px;
	}

	view textarea {
		width: 90%;
		border: 1px solid black;
		padding: 10px;
		background-color: #f3f3f3;
	}

	view button {
		width: 80%;
		margin-top: 10px;
	}
</style>
