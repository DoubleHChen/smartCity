<template>
    <view>
        <uni-section title="车辆信息编辑" type="line" >
            
            <view class="car">
                <view>
                    <image v-if="car[id].img == '' " src="../../static/img/upCar.png"></image>
                    <image v-else :src="car[id].img"></image>
                </view>
                <view>
                    车名：<input v-model="car[id].car">
                    车牌号码：<input v-model="car[id].number">
                   车位号：<input v-model="car[id].tnumber">
                    停车卡号：<input v-model="car[id].tid">
                    车主姓名：<input v-model="car[id].name">
                    车主手机号：<input v-model="car[id].phone">
                    住户姓名：<input v-model="car[id].addressname">
                    地址：<input v-model="car[id].address">
                </view>
            </view>
            <button @click="change">确认修改</button>
        </uni-section>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
               car:[
                   {
                       id:"1",
                       img:"../../static/img/car1.jpeg",
                       car:"赛迪朋克大车",
                       number:"49302932338",
                       tid:"21",
                       tnumber:"32302932338",
                       name:"赛博",
                       phone:"13123223121",
                       addressname:"赛博",
                       address:"广东智慧社区一"
                   },
                   {
                       id:"2",
                       img:"../../static/img/car2.jpeg",
                       car:"奔驰大车",
                       number:"88302932338",
                       tnumber:"32302932338",
                       tid:"21",
                       name:"赛博",
                       phone:"13123223121",
                       addressname:"赛博",
                       address:"广东智慧社区一"
                   },
                   {
                       id:"3",
                       img:"../../static/img/car3.jpeg",
                       car:"宝马大车",
                       number:"31202932338",
                       tnumber:"32302932338",
                       tid:"21",
                       name:"赛博",
                       phone:"13123223121",
                       addressname:"赛博",
                       address:"广东智慧社区一"
                   }
               ],
               id:''
                    
            }
                
    	},
    	onLoad(e) {
            let _this = this
            _this.car = uni.getStorageSync("car")
            this.id = e.id
            console.log(this.car[id]);
    	},
    	methods: {
            change(){
                uni.showToast({
                    icon:'success',
                    title:"修改成功"
                })
                uni.setStorage({
                    key:"car",
                    data:this.car,
                    success() {
                        console.log("设置car数据");
                    }
                })
                setTimeout(function(){
                    // uni.navigateTo({
                    //     url:"/pages/car/mycar"
                    // })
                    uni.navigateBack({
                        delta:1
                    })
                },1000)
                
            }
    	}
    }
</script>

<style>
    .car{
        padding: 20px;
        text-align: center;
    }
    .car text{
        float: left;
        font-size: 20px;
    }
    .car image{
        width: 100px;
        height: 100px;
    }
    
    .car view:last-child{
        /* clear: both; */
        font-weight: 800;
    }
    .car view:last-child input{
        font-weight: 200;
        border: 1px solid #3f3f3f;
    }
    button{
        clear: both;
        width: 80%;
    }
</style>