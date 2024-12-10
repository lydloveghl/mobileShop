<template>
    <div class="secKill">
        <div class="introduce">
            <p></p>
            <span>限时秒杀</span>
            <button>去抢购</button>
        </div>
        <div class="goodsBox">
            <span v-for="item in secKillList.secKillList">
                <img :src="item.img1" alt="">
                <p>&yen;{{ item.originprice }}</p>
            </span>
        </div>
    </div>
</template>
<script setup>
let secKillList = defineProps({secKillList:{
    type:Array,
    required:true
}})

</script>
<style lang="less">
    .secKill{
        margin-top: 10px;
        width: 95%;
        height: 100px;
        background-image: url(https://img11.360buyimg.com/img/jfs/t1/226923/11/7714/45152/65782c91F9d91466d/24928a901f4c3f58.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        border-radius: 10px;
        padding: 3px;
        display: flex;

        .introduce{
            width: 25%;
            height: 100%;
            float: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            border-radius: 10px;
            box-sizing: border-box;

            padding-left: 5px;
            margin-right: 2px;

            p{
                width: 100%;
                height: 20px;
                background-size: 100% 100%;
                background-image: url(https://img30.360buyimg.com/img/jfs/t1/227615/23/8080/1616/65782dd8F605d99af/0d97136b32d5ab1b.png);
            }
            span{
                width: 100%;
                color: #fff;
                font-size: 14px;
            }
            button{
                width: 50px;
                font-size: 12px;
                height: 20px;
                border: 0;
                border-radius: 10px;
                color: rgb(242, 38, 6);
                background-color: #fff;
                margin-right: 30px;
            }
        }
        .goodsBox{
            flex: 1;
            border-radius: 10px;
            background-color: #fff;
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            span{
                flex-shrink: 0;
                margin: 10px;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    color: red;
                }
            }
        }
        .goodsBox::-webkit-scrollbar{
            display: none;
        }
    }
</style>