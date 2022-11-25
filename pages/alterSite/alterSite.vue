<template>
	<view>
		<view class="uni-list" style="display: flex;padding: 10px;border-bottom: 1px solid #ccc;margin-left: 5px;">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" style="float: left;width: 100px;">
					省
				</view>
				<view class="uni-list-cell-db" style="float: left;">
					<picker @change="cprovince" :value="index" :range="province">
						<view class="uni-input">{{province[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list" style="display: flex;padding: 10px;border-bottom: 1px solid #ccc;margin-left: 5px;">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" style="float: left;width: 100px;">
					市
				</view>
				<view class="uni-list-cell-db" style="float: left;">
					<picker @change="cshi" :value="index1" :range="shi">
						<view class="uni-input">{{shi[index1]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list" style="display: flex;padding: 10px;border-bottom: 1px solid #ccc;margin-left: 5px;">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" style="float: left;width: 100px;">
					区
				</view>
				<view class="uni-list-cell-db" style="float: left;">
					<picker @change="cqu" :value="index2" :range="qu">
						<view class="uni-input">{{qu[index2]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<u-field v-model="addressDetail" label="地址" placeholder="请填写地址">
		</u-field>
		<u-field @click="showAction" v-model="label" :disabled="true" label="标签" placeholder="请选择标签"
			right-icon="arrow-down-fill">
		</u-field>
		<u-action-sheet @click="clickItem" :list="labelList" v-model="show"></u-action-sheet>
		<u-field v-model="name" label="姓名" placeholder="请填写姓名">
		</u-field>
		<u-field v-model="phone" label="联系电话" placeholder="请填写号码">
		</u-field>
		<u-button @click="submit" type="warning" style="position: fixed;;left: 10%;right: 10%;bottom: 10%;">保存
		</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressDetail: '',
				name: '',
				phone: '',
				label: '',
				labelList: [{
						text: '学校',
					},
					{
						text: '公司'
					},
					{
						text: '家'
					}
				],
				show: false,
				province: [],
				index: 0,
				shi: ['选择城市'],
				shi1: [],
				index1: 0,
				qu: ['选择区域'],
				qu1: [],
				index2: 0,
				address: []
			}
		},
		onLoad() {
			this.$u.get(this.$url + '/prod-api/api/common/gps/province').then(res => {
				if (res.code === 200) {
					// console.log(res);
					for (var i = 0; i < res.data.length; i++) {
						this.province.push(res.data[i].name)
					}
					// console.log(this.province);
				}

			});
		},
		methods: {
			showAction() {
				this.show = true;
			},
			clickItem(index) {
				this.label = this.labelList[index].text;
			},
			submit() {
				this.$u.post(this.$url + '/prod-api/api/takeout/address', {
					"name": this.name,
					"phone": this.phone,
					"addressDetail": this.address + this.addressDetail,
					"label": this.label
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					// console.log(res);
					if (res.code === 200) {
						uni.$u.toast('添加成功')
						setTimeout(() => {
							uni.navigateBack(1)
						}, 500)
					}

				});
			},
			cprovince(e) {
				console.log(e);
				this.index = e.detail.value
				let province = this.province[this.index]
				this.$u.get(this.$url + '/prod-api/api/common/gps/city').then(res => {
					if (res.code === 200) {
						this.shi = []
						this.shi1 = res.data.filter(item => item.provinceName == province)
						for (var i = 0; i < this.shi1.length; i++) {
							this.shi.push(this.shi1[i].name)
						}
					}

				});
			},
			cshi(e) {
				this.index1 = e.detail.value
				let shi = this.shi[this.index1]
				// console.log(shi);
				this.$u.get(this.$url + '/prod-api/api/common/gps/area').then(res => {
					if (res.code === 200) {
						this.qu = []
						this.qu1 = res.data.filter(item => item.cityName == shi)
						for (var i = 0; i < this.qu1.length; i++) {
							this.qu.push(this.qu1[i].name)
						}
					}
				});
				this.address = this.province[this.index] + this.shi[this.index1] + this.qu[0]
				// console.log("最开始的地址：" + this.address);
			},
			cqu(e) {
				this.index2 = e.detail.value
				this.address = this.province[this.index] + this.shi[this.index1] + this.qu[this.index2]
				// console.log(this.address);
			}
		}
	}
</script>

<style>

</style>
