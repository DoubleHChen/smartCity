<template>
    <view style="padding: 10px;">
        <view>
            <text>订单编号:{{orderNo}}</text>
            <view>
                <textarea placeholder="请输入退款理由" v-model="content"
                 style="border: 1px solid black;text-indent: 10px;padding: 10px;margin-top: 10px;"></textarea>
            </view>
            <button style="width: 80%;margin-top: 20px;" @click="tuikuan">申请退款</button>
        </view>
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
            tuikuan(){
                let token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE0YTZhNDM2LTE5YzAtNDU0Ni1iYmQ1LWJkNjc5ODFiMzQ1NiJ9.sWyTKJpenqO2BhWicrNvfVicyEt-r_WjPm-c0szpuv6KQXxmtJd_R67mNBRrNCqsBJpZByadzQdvoHMfoG5zdg"
                this.token = token
                uni.request({
                    url:"http://124.93.196.45:10001/prod-api/api/takeout/order/refound",
                    method:'POST',
                    header:{
                      "Authorization":this.token
                    },
                    data:{
                      "orderNo": this.orderNo,
                      "reason": this.content
                    },
                    success: (resp) => {
                        console.log(resp);
                        if(resp.data.code == 200){
                            uni.showToast({
                                icon:'success',
                                title:"申请成功"
                            })
                            setTimeout(function(){
                                uni.navigateBack({
                                    delta:2
                                })
                            },1000)
                        }else{
                            uni.showToast({
                                icon:'error',
                                title:"申请失败"
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