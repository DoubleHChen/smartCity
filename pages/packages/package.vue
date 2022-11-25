<template>
    <view>
        <uni-section title="快递站" type="line" >
           <view v-for="(item,index) in data" :key="item" :index="index" class="packMag">
               地址：<text >{{item.name}}</text>
           </view>
        </uni-section>
        <uni-section title="快递站" type="line" >
            <view class="pack" v-for="(item,index) in pack" :key="item" :index="index">
                <image :src="item.img"></image>
                <view>
                    <text>{{item.name}}</text>
                    <text>{{item.number}}</text>
                </view>
                <view>
                    <text>{{item.details}}</text>
                </view>
                <view>
                    <text>领取点：{{item.location}}</text>
                </view>
            </view>
        </uni-section>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                data:[
                    {
                     "name":"智慧快递站一",   
                    },
                    {
                     "name":"智慧快递站二",   
                    },
                    {
                     "name":"智慧快递站三",   
                    },
                    {
                     "name":"智慧快递站四",   
                    }
                ] ,
                pack:[
                    {
                        img:"../../static/img/pack1.png",
                        name:"申通快递",
                        number:"451528945416515",
                        details:"代签：家人小明，电话13124744541",
                        location:"智慧社区快递站一  （扫码）"
                    },
                    {
                        img:"../../static/img/pack2.png",
                        name:"申通快递",
                        number:"381523445416515",
                        details:"代签：家人小花，电话13124744541",
                        location:"智慧社区快递站三  （扫码）"
                    },
                    {
                        img:"../../static/img/pack3.png",
                        name:"申通快递",
                        number:"521528923116515",
                        details:"代签：家人西，电话13124744541",
                        location:"智慧社区快递站二  （扫码）"
                    }
                ]
            }
                
    	},
    	onLoad() {
    
    	},
    	methods: {
            
    	}
    }
</script>

<style>
    .packMag{
        padding: 5px;
        background-color: #f3f3f3;
        margin-top: 5px;
        padding-left: 10px;
    }
    .pack{
        margin: 10px;
        padding: 10px;
        border: 1px solid #3f3f3f;
    }
    .pack image{
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;
    }
    .pack view text{
        margin-right: 10px;
    }
</style>