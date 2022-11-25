<template>
    <view style="padding: 10px;">
        <view style="padding: 10px;background-color: white;">
            <text >{{details.sellerInfo.name}}</text>
        </view>
        <view style="background-color: white;padding: 10px;margin-top: 10px;min-height: 70px;"
        v-for="(item,index) in details.orderInfo.orderItemList" :key="index" :index="index" >
            <view>
                <view >
                    <image :src="$url + item.productImage" style="width: 50px;height: 50px;float: left;margin-right: 10px;" mode="aspectFill"></image>
                    <view class="order">
                        <view>
                            <text >菜名：{{item.productName}}</text>
                        </view>
                        <view >
                            <text style="margin-left: 10px;"> x {{item.quantity}}</text>
                        </view>
                    </view>
                    <view style="display: flex;align-content: flex-end;align-items: flex-end;flex-direction: row;justify-content: flex-end;flex-wrap: wrap;">
                        价格:<text style="color: red;">￥{{item.totalPrice}}</text>
                    </view>
                </view>
            </view>
            
        </view>
        <view style="margin-top: 20px;background-color: white;display: flex;justify-content: flex-end;padding: 10px;">
            总价：<text style="color: red;">￥{{details.orderInfo.amount}}</text>
        </view>
        <view style="margin-top: 20px;">
            <uni-section title="订单信息" type="line"></uni-section>
            <view style="padding: 10px; background-color: white;">
                <view>订单编号：{{details.orderInfo.orderNo}}</view>
                <view>下单时间：{{details.orderInfo.createTime}}</view>
                <view v-if="details.orderInfo.paymentType != null">支付类型：{{details.orderInfo.paymentType}}</view>
                <view v-else>支付类型：无</view>
                <view>收货地址：{{details.orderInfo.receiverAddress}}</view>
                <view>收货人：{{details.orderInfo.receiverName}}</view>
                <view>收货手机：{{details.orderInfo.receiverPhone}}</view>
                <view>订单状态：<text style="color: red;">{{details.orderInfo.status}}</text></view>
            </view>
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
                token:"",
                details:[]
            }
                
    	},
    	onLoad(index) {
            this.orderNo = index.orderNo
            uni.request({
                url:this.$url + "/prod-api/api/takeout/order/" + index.orderNo,
                method:'GET',
                header:{
                  "Authorization":uni.getStorageSync('token')
                },
                success: (resp) => {
                    console.log(resp);
                    if(resp.data.code == 200){
                        this.details = resp.data.data
                    }else{
                        uni.showToast({
                            icon:'error',
                            title:"查看失败"
                        })
                    }
                }
            })
    	},
    	methods: {
            
    	}
    }
</script>

<style>
    .order{
    }
    .order view{
        float: left;
    }
</style>