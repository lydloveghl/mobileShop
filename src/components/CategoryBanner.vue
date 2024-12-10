<template>
    <div class="categoryBanner">
        <van-swipe>
            <van-swipe-item>
                <div v-for="item in navList.filter((item,index) => index < 5)">
                    <img :src="item.imgurl" alt="">
                    <p>{{ item.title }}</p>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div v-for='item in navList.filter((item,index) => index >= 5)'>
                    <img :src="item.imgurl" alt="">
                    <p>{{ item.title }}</p>
                </div>
            </van-swipe-item>
            <template #indicator="{ active}">
                <div class="custom-indicator">
                    <ul>
                        <li :class="active === 1 ? 'active' : ''">
                        </li>
                    </ul>
                </div>
            </template>
        </van-swipe>
    </div>
</template>
<script setup>
import {ref} from 'vue'
    let navList = ref([
        {
        navid: 1,
        title: "嗨购超市",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png",
        },
        {
        navid: 2,
        title: "数码电器",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png",
        },
        {
        navid: 3,
        title: "嗨购服饰",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/41867/2/15966/7116/60ec0e0dE9f50d596/758babcb4f911bf4.png",
        },
        {
        navid: 4,
        title: "嗨购生鲜",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png",
        },
        {
        navid: 5,
        title: "嗨购到家",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png",
        },
        {
        navid: 6,
        title: "充值缴费",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png",
        },
        {
        navid: 7,
        title: "9.9元拼",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/36069/14/16068/6465/60ec0f67E155f9488/595ff3e606a53f02.png",
        },
        {
        navid: 8,
        title: "领券",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png",
        },
        {
        navid: 9,
        title: "领金贴",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/196711/35/12751/6996/60ec1000E21b5bab4/38077313cb9eac4b.png",
        },
        {
        navid: 10,
        title: "plus会员",
        imgurl:
        "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png",
        },
    ])
</script>
<style lang="less">
    .categoryBanner{
        width: 100%;
        // margin-top: 10px;
        // text-align: center;
        background: linear-gradient(180deg, #ff5454 .63%, #f4f4f4 80.65%);
        .van-swipe{

            background-color: #fff;
            border-radius: 10px;
            width: 85%;
            margin: auto;
            margin-top: 10px;
            display: flex;
            height: 80px;
            // overflow: auto;
            .van-swipe-item{
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: 100% !important;
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    // flex-shrink: 0;
                    img{
                        width: 30px;
                    }
                    p{
                        font-size: 12px;
                    }
                }
            }
            .custom-indicator {
                position: absolute;
                width: 30px;
                height: 6px;
                font-size: 12px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                left: 50%;
                bottom: 5px;
                transform: translateX(-50%); 

                ul{
                    width: 100%;
                    height: 100%;
                    display: flex;   
                    border-radius: 4px;
                    li{
                        width: 50%;
                        border-radius: 4px;
                        background-color: red;
                        transition: .2s all linear;
                    }
                    li.active{
                        transform: translateX(100%);
                    }
                }
            }
        }
    }

</style>