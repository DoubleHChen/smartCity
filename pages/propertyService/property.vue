<template>
	<view>
		<view class="chatMe">
			<text>联系中心</text>
			<text>点击号码快速拨号</text>
			<view v-for="(item,index) in charMe" :key="item" :index="index">
				<text>{{item.name}} : </text>
				<text @click="callPhone(item.phone)">{{item.phone}}</text>
			</view>
		</view>
		<view>
			<uni-section title="服务中心" type="line">
				<view style="padding: 10px;">
					<text v-for="(item,index) in service" :key="item" :index="index" class="serviceTitle"
						@click="goToservice(index)">
						{{item.title}}
					</text>
				</view>
			</uni-section>
		</view>
		<view>
			<uni-section title="反馈中心" type="line">
				<text class="suggest" @click="goToSuggest">点击反馈-></text>
			</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				charMe: [{
						"name": "物业服务中心",
						"phone": "13129678784"
					},
					{
						"name": "停车位服务中心",
						"phone": "1312574545"
					},
					{
						"name": "24 小时值班热线",
						"phone": "1312574545"
					},
					{
						"name": "报修电话",
						"phone": "1312574545"
					},
					{
						"name": "便民服务",
						"phone": "1312574545"
					}
				],
				service: [{
						img: "",
						title: "物业服务"
					},
					{
						img: "",
						title: "停车位"
					},
					{
						img: "",
						title: "便民服务"
					},
					{
						img: "",
						title: "报修服务"
					},
					{
						img: "",
						title: "评价中心"
					}
				]
			}

		},
		onLoad() {

		},
		methods: {
			goToSuggest() {
				console.log(111);
				uni.navigateTo({
					url: "/pages/propertyService/suggest"
				})
			},
			callPhone(value) {
				uni.makePhoneCall({
					phoneNumber: value
				})
			}
		}
	}
</script>

<style>
	.chatMe {
		padding: 10px;
	}

	.chatMe>text:nth-child(1) {
		font-size: 20px;
		margin-right: 10px;

	}

	.chatMe view {
		background-color: #F3F3F3;
		width: 300px;
		padding: 10px;
		margin-top: 10px;
	}

	.chatMe view text:nth-child(2) {
		color: red
	}

	.serviceTitle {
		padding: 3px;
		text-align: center;
		display: inline-block;
		width: 40px;
		margin-right: 20px;
		color: white;
		background-color: #FF001C;
	}

	.serviceTitle:last-child {
		margin: 0px;
	}

	.suggest {
		background-color: #F3F3F3;
		display: block;
		padding: 20px;
		font-size: 20px;
	}
</style>
