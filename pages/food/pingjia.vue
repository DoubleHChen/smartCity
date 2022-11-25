<template>
    <view style="padding: 10px;">
        <view style="border-radius: 10px;padding: 10px;background-color: white;">
            <text>订单编号:{{orderNo}}</text>
            <view>
                <textarea placeholder="请输入评价内容" v-model="content"
                 style="border: 1px solid black;text-indent: 10px;padding: 10px;margin-top: 10px;"></textarea>
            </view>
            <view>
                <uni-section title="评价星级" type="line">
                    <uni-rate v-model="rateValue" @change="onChange" />
                </uni-section>
            </view>
        </view>
				<u-button  @click="pingjia" type="warning" style="width: 80%;margin-top: 20px;">评价</u-button>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                orderNo:"",
                rateValue: 0,
                content:"",
                token:""
            }
                
    	},
    	onLoad(index) {
            console.log(index.orderNo);
            this.orderNo = index.orderNo
    	},
    	methods: {
            pingjia(){
               
                uni.request({
                    url:this.$url + "/prod-api/api/takeout/comment",
                    method:'POST',
                    header:{
                      "Authorization":uni.getStorageSync('token')
                    },
                    data:{
                      "content":this.content,
                      "orderNo":this.orderNo,
                      "score":this.rateValue
                    },
                    success: (resp) => {
                        console.log(resp);
                        if(resp.data.code == 200){
                            uni.showToast({
                                icon:'success',
                                title:"评价成功"
                            })
                            setTimeout(function(){
                                uni.navigateBack({
                                    delta:1
                                })
                            },1000)
                        }else{
                            uni.showToast({
                                icon:'error',
                                title:"评价失败"
                            })
                        }
                    }
                })
            }
    	}
    }
</script>

<style>
</style>