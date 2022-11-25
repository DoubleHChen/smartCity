<template>
    <view class="all">
        <uni-section title="已有车辆" type="line" >
            <view class="mycar" v-for="(item,index) in car" :key="index" :index="index">
                <image v-if="item.img == '' " src="../../static/img/upCar.png"></image>
                <image :src="item.img" v-else></image>
                <view>
                    <text>{{item.car}}</text>
                </view>
                <view>
                    <text>停车卡号：{{item.number}}</text>
                </view>
                <view>
                    <text @click="change(index)">编辑</text>
                </view>
            </view>
        </uni-section>
        <button @click="addCar" >新增车辆</button>
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
                        tid:"21",
                        tnumber:"32302932338",
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
                        tid:"21",
                        tnumber:"32302932338",
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
            let first = uni.getStorageSync("first")
            if(first != 1){
                
                uni.setStorage({
                    key:"first",
                    data:1,
                    success() {
                        console.log("第一次进入");
                    }
                })
                uni.setStorage({
                    key:"car",
                    data:_this.car,
                    success() {
                        console.log("第一次进入,更新car数据");
                    }
                })
            }else{
                console.log("非第一次进入");
                let car = uni.getStorageSync("car")
                _this.car = car
                console.log(_this.car);
            }
            
    	},
			onShow() {
				let car = uni.getStorageSync("car")
				this.car = car
			},
    	methods: {
            change(index){
                console.log(index);
                uni.navigateTo({
                    url:"/pages/car/changeCar?id=" + index
                })
            },
            addCar(){
                uni.navigateTo({
                    url:"/pages/car/addCar"
                })
            }
    	}
    }
</script>

<style>
    .mycar{
        margin: 20px;
        padding: 10px;
        border: 1px solid #3f3f3f;
        min-height: 80px;
    }
    .mycar image{
        margin-right: 10px;
        width: 60px;
        height: 60px;
        float: left;
    }
    .mycar view:last-child{
        float: right;
        position: relative;
        top: -20px;
    }
    view button{
        width: 80%;
        margin-top: 20px;
    }
    .all{
        padding-bottom: 100px;
    }
</style>