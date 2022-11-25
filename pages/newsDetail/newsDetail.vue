<template>
	<view class="detail">
		<view class="u-font-40">{{info.title}}</view>
		<view class="u-m-t-28 u-text-center u-m-b-28 ">{{info.publishDate}}</view>
		<!-- <u--image :showLoading="true" :src="$url+info.cover" width="100%" mode="widthFix" height="auto" class="detail-img"></u--image> -->
		<!-- <u-text v-html="info.content"></u-text> -->
		<image :src="$url+info.cover" mode="widthFix" style="width: 100%;"></image>
		<view class="" v-html="info.content"></view>
		<view class="u-flex u-p-t-30  " style="border-top: 1px solid #ccc;">
			<view class="u-m-r-30 u-border-top ">阅读 {{info.readNum}}</view>
			<view class="" @click="like">
				<u-icon name="heart"></u-icon>{{info.likeNum}}
			</view>
		</view>
		<u-gap height="20" bgColor="#eee"></u-gap>
		<view class="detail-comment ">
			<view class="">评论 {{comment}}</view>
			<view class="u-flex u-border-bottom u-p-b-20" v-for="item in commentList" :key="item.id">
				<image src="../../static/me/header.png" mode="widthFix" style="width: 60px;height: 60px;"></image>
				<view class="list-item">
					<view class="">{{item.userName}}</view>
					<view class="">{{item.commentDate}}</view>
					<view class="u-type-primary" v-if="item.content">{{item.content}}</view>
					<view class="" v-else>暂无评论</view>
				</view>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<u-input v-model="value" class="u-p-5 u-p-l-20" placeholder="写评论..." />
			<u-button type="primary" @click="handleSend">发表</u-button>
		</view>

		<!-- 推荐内容 -->
		<recopmmend :recommend="recommend"></recopmmend>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				id: null,
				flag: true,
				commentList: [],
				comment: null,
				value: '',
				recommend: []
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getInfo(options.id)
			this.getComment(options.id)
			this.getCommented()
		},
		updated() {
			// this.getInfo(this.id)
		},
		methods: {
			getInfo(id) {
				this.$u.get(this.$url + '/prod-api/press/press/' + id, {}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					this.info = res.data
				});
			},
			like() {
				if (uni.getStorageSync('token')) {
					this.$u.put(this.$url + '/prod-api/press/pressComment/like/' + this.id, {}, {
						'Authorization': uni.getStorageSync('token')
					}).then(res => {
						if(res.code == 401) {
							this.$u.toast('没有登录，请登录')
							setTimeout(()=> {
								this.$u.route('pages/login/login')
							},1000)
						}
						console.log(res);
						if (res.code == 200) {
							this.$u.toast('点赞成功')
						}
						// this.info = res.data
					});
				} else {
					this.$u.toast('没有登录')
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 1000)
				}

			},
			// 获取评论
			getComment(id) {
				this.$u.get(this.$url + '/prod-api/press/comments/list?newsId=' + id, {}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.commentList = res.rows.reverse()
						this.comment = res.total
					}
				});
			},
			// 发表
			handleSend() {
				this.$u.post(this.$url + '/prod-api/press/pressComment', {
					newsId: this.id,
					content: this.value
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.$u.toast('发表成功')
						this.value = ''
					}
				});
			},
			getCommented() {
				this.$u.get(this.$url + '/prod-api/press/press/list', {}, {
				}).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.recommend = res.rows.filter(item=>item.top == "Y")
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		margin: 0 10rpx;
		padding-bottom: 50px;
	}

	.search {
		position: fixed;
		z-index: 99;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
</style>
