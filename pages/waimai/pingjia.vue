<template>
    <view style="padding: 10px;">
        <view>
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
            <button style="width: 80%;margin-top: 20px;" @click="pingjia">评价</button>
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
            pingjia(){
                let token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE0YTZhNDM2LTE5YzAtNDU0Ni1iYmQ1LWJkNjc5ODFiMzQ1NiJ9.sWyTKJpenqO2BhWicrNvfVicyEt-r_WjPm-c0szpuv6KQXxmtJd_R67mNBRrNCqsBJpZByadzQdvoHMfoG5zdg"
                this.token = token
                uni.request({
                    url:"http://124.93.196.45:10001/prod-api/api/takeout/comment",
                    method:'POST',
                    header:{
                      "Authorization":this.token
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
                                    delta:2
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