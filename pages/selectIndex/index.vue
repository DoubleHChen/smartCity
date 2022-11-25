<template>
	<view>
		<view style="padding: 10px;">
            <view class="inform"> 
                <uni-notice-bar scrollable speed="50" single text="时间 : 2020-02-02;通知：今天社区正式启动智慧社区功能！" moreText="查看详情" showGetMore @getmore="showInform"></uni-notice-bar>
            </view>
            <uni-section title="服务中心" type="line">
               <view>
                   <text v-for="(item,index) in service" :key="item" :index="index" class="serviceTitle" @click="goToservice(index)">
                       {{item.title}}
                   </text>
               </view>
            </uni-section>
        </view>
        <view style="padding: 10px;">
            <uni-section title="商铺广告" type="line">
                <view v-for="(item,index) in advantage" :key="item" :index="index" class="advantage" @click="gotoAdvantage(index)">{{item.content}}</view>
            </uni-section>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                service:[
                    {
                        img:"",
                        title:"社区动态"
                    },
                    {
                        img:"",
                        title:"物业服务"
                    },
                    {
                        img:"",
                        title:"快件管理"
                    },
                    {
                        img:"",
                        title:"友邻社交"
                    },
                    {
                        img:"",
                        title:"商业推广"
                    },
                    {
                        img:"",
                        title:"车辆管理"
                    }
                ]
                ,
                advantage:[
                    {
                        content:"机器人商店今日开业，免费体验一天，速来！"
                    },
                    {
                        content:"智慧手机商店今日开业，免费体验一天，速来！"
                    },
                    {
                        content:"智慧小欧商店今日开业，免费体验一天，速来！"
                    }
                ]
            }
		},
		onLoad() {

		},
		methods: {
            showInform(){
                uni.navigateTo({
                    url:"/pages/inform/informDetails"
                })
            },
            goToservice(index){
                switch(index){
                    case 0:
                        uni.navigateTo({
                            url:"/pages/inform/informDetails"
                        })
                        break;
                    case 1:
                        uni.navigateTo({
                            url:"/pages/propertyService/property"
                        })
                        break;
                    case 2:
                        uni.navigateTo({
                            url:"/pages/packages/package"
                        })
                        break;
                    case 3:
                        uni.navigateTo({
                            url:"/pages/neighbor/neightbor"
                        })
                        break;
                    case 4:
                        // 暂时的外卖订单
                        uni.navigateTo({
                            url:"/pages/waimai/myOrder"
                        })
                        break;
                    case 5:
                        uni.navigateTo({
                            url:"/pages/car/mycar"
                        })
                        break;
                }
            },
            gotoAdvantage(index){
                uni.navigateTo({
                    url:"/pages/index/advantageDeatils"
                })
            }
		}
	}
</script>

<style>
	.inform{
        
    }
    .serviceTitle{
        padding: 3px;
        text-align: center;
        display: inline-block;
        width: 40px;
        margin-right: 20px;
        color: white;
        background-color: #FF001C;
    }
    .serviceTitle:last-child{
        margin: 0px;
    }
    .advantage{
        padding: 5px;
        background-color: #f3f3f3;
        margin-top: 10px;
    }
   
</style>
