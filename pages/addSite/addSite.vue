<template>
	<view>
		<u-field v-model="info.addressDetail" label="地址" placeholder="请填写地址">
		</u-field>
		<u-field @click="showAction" v-model="info.label" :disabled="true" label="标签" placeholder="请选择标签"
			right-icon="arrow-down-fill">
		</u-field>
		<u-action-sheet @click="clickItem" :list="labelList" v-model="show"></u-action-sheet>
		<u-field v-model="info.name" label="姓名" placeholder="请填写姓名">
		</u-field>
		<u-field v-model="info.phone" label="联系电话" placeholder="请填写号码">
		</u-field>
		<u-button @click="submit" type="warning" style="position: fixed;;left: 10%;right: 10%;bottom: 10%;">保存</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
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
				show: false
			}
		},
		onLoad(options) {
			console.log(options);
			this.info = options
		},
		methods: {
			showAction() {
				this.show = true;
			},
			clickItem(index) {
				this.info.label = this.labelList[index].text;
			},
			submit() {
				this.$u.put(this.$url + '/prod-api/api/takeout/address', {
					"id": this.info.id,
					"name": this.info.name,
					"phone": this.info.phone,
					"addressDetail": this.info.addressDetail,
					"label": this.info.label
				}, {
					'Authorization': uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						uni.$u.toast('保存成功')
						setTimeout(()=> {
							uni.navigateBack(1)
						},500)
					}

				});
			}
		}
	}
</script>

<style>

</style>
