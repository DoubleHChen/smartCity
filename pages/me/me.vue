<template>
	<view>
		<!-- <u-cell-group>
			<u-cell-item title="头像">
				<view slot="right-icon">
					<u-upload ref="uUpload" custom-btn :action="uploadUrl"
						:header="{Authorization: 'Bearer ' + vuex_token}" :show-upload-list="false" :multiple="false"
						@on-success="uploadCallback">
						<u-avatar :src="user.avatar | avatarUrl" slot="addBtn" />
					</u-upload>
				</view>
			</u-cell-item>
		</u-cell-group> -->
		<u-upload ref="uUpload" :action="action" :auto-upload="false"></u-upload>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '../../static/me/header.png',
				profileImg: '',
				user: '',
				action: 'https://124.93.196.45:10001/prod-api/common/upload',
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('user'));
			this.user = uni.getStorageSync('user')
		},
		methods: {
			upload_profile() {
				let that = this
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths[0]))
						that.avatar = JSON.stringify(res.tempFilePaths[0])
						// const tempFilePaths = res.tempFilePaths
						// uni.uploadFile({
						// url: that.$url + '/prod-api/common/upload', //仅为示例，非真实的接口地址
						// filePath: tempFilePaths[0],
						// name: 'file',
						// header: {
						// 	Authorization: uni.getStorageSync('token')
						// },
						// success: (uploadFileRes) => {
						// console.log(uploadFileRes.data)
						// that.avatar = that.$imgurl + JSON.parse(uploadFileRes.data).fileName
						// that.profileImg = that.$imgurl + JSON.parse(uploadFileRes.data).fileName
						// }
						// })
					}
				})
			},
			mdfInfo() {

				uni.request({
					url: this.$url + '/prod-api/api/common/user',
					method: 'PUT',
					data: {
						nickName: this.user.nickName,
						// phonenumber: this.formData.number,
						// email: this.formData.email,
						// sex: this.formData.sex,
						avatar: this.profileImg
					},
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							uni.showToast({
								title: '修改成功！'
							})

						} else {
							uni.showToast({
								title: this.profileImgm,
								icon: 'none'
							})
						}
					}
				})
			},
			submit() {
				this.$refs.uUpload.upload();
			},
		}

	}
</script>

<style lang="scss" scoped>
	.avatar {
		text-align: right;
	}

	.avatar image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}
</style>
