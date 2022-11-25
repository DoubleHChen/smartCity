<template>
    <view>
        <view v-for="(item,index) in data" :key="item" :index="index" class="title">
            <text>{{item.title}}</text>
            <text>></text>
        </view>
        <view class="putMsg">
            <uni-section title="发帖" type="line"></uni-section>
            <textarea placeholder="请输入要发表的内容..."></textarea>
            <button>发表</button>
        </view>
    </view>
</template>

<script>
    export default {
    	data() {
    		return {
                data:[
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
                    },
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
                    },
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
                    },
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
                    },
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
                    },
                    {
                        title:"今天在社区体验到了智慧功能的快乐"
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
    .title{
        margin: 10px;
        padding: 10px;
        background-color: #f3f3f3;
        margin-top: 5px;
    }
    .title text:last-child{
        float: right;
    }
    .putMsg{
        
    }
    .putMsg textarea{
        width: 90%;
        margin: 10px;
        border: 1px solid black;
    }
    .putMsg button{
        width: 80%;
    }
</style>