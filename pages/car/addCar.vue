<template>
    <view>
        <uni-section title="车辆新增" type="line" >
            
            <view class="car">
                <view @click="addCar">
                    <image src="/static/img/upCar.png"></image>
                </view>
               <view>
                   车名：<input v-model="car.car">
                   车牌号码：<input v-model="car.number">
                  车位号：<input v-model="car.tnumber">
                   停车卡号：<input v-model="car.tid">
                   车主姓名：<input v-model="car.name">
                   车主手机号：<input v-model="car.phone">
                   住户姓名：<input v-model="car.addressname">
                   地址：<input v-model="car.address">
               </view>
            </view>
            <button @click="change">增加</button>
        </uni-section>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
               car:
                   {
                       id:"",
                       img:"",
                       car:"",
                       number:"",
                       tid:"",
                       tnumber:"",
                       name:"",
                       phone:"",
                       addressname:"",
                       address:""
                   }
               ,
               id:'',
                oldcar:[]
            }
                
    	},
    	onLoad() {
            this.id = 1
            let _this = this
            uni.getStorage({
                key:"car",
                success(resp) {
                    if(resp.data!=null){
                        _this.oldcar = resp.data
                    }
                }
            })
            console.log(_this.oldcar);
    	},
        created(){
            this.id = 3
        },
    	methods: {
            change(){
                let _this = this
                uni.showToast({
                    icon:'success',
                    title:"增加成功"
                })
                this.oldcar.push(_this.car)
                uni.setStorage({
                    key:"car",
                    data:_this.oldcar,
                    success() {
                        console.log("更新car数据成功");
                    }
                })
                setTimeout(function(){
                    uni.navigateBack({
                        delta:1
                    })
                },1000)
            },
            addCar(){
                
                uni.showToast({
                    icon:'success',
                    title:"上传车照片"
                })
                
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
        border: 1px solid #3f3f3f;
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