<template>
    <section class="cartSection">
        <div v-for="item in cartList.cartList" class='goodsBox'>
            <nut-checkbox v-model="item.flag" @change='changeSelectStatus(item.cartid,item.flag)'/>
            <img :src="item.img1" alt="">
            <div class="introduce">
                <p class="goodsName">{{item.proname}}</p>
                <p class="stepper">
                    <nut-price :price="item.originprice" :decimal-digits="3" thousands />
                    <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="changeNum(item.cartid,item.num)"/>
                </p>
            </div>
            <div class=delete>
                删除
            </div>
        </div>
    </section>
</template>
<script setup>
    import {ref,onBeforeMount} from 'vue'
    import { changeFlag } from '@/apis/cart';
    import { changeCartNum } from '@/apis/cart';
    const cartList = defineProps(['cartList'])
    onBeforeMount(() => {
    })
    let changeSelectStatus = (cartid,flag) => {
        changeFlag(cartid,flag)
    }
    let changeNum = (cartid,num) => {
        changeCartNum(cartid,num)
    }
</script>
<style lang="less" scoped>
    .cartSection{
        .goodsBox{
            width: 95%;
            border-bottom: 1px solid #ccc;
            // height: 100px;
            height: 150px;
            display: flex;
            justify-content: start;
            align-items: center;
            padding: 5px;
            box-sizing:border-box;
            overflow:auto;
            .nut-checkbox{
                margin-right:2px;
            }
            img{
                width: 130px;
            }
            .delete{
                width: 100px;
                height:100%;
                flex-shrink: 0;
            }
            .introduce{
                width: 198px;
                flex-shrink:0;
                display: flex;
                padding: 30px 2px;
                flex-direction: column;
                justify-content: start;
                align-items: start;
                box-sizing:border-box;
                .goodsName{
                    font-size: 14px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:2;
                    overflow: hidden;
                    margin-bottom: 30px;
                }
                .stepper{
                    display: flex;
                    width: 100%;
                    justify-content: space-evenly;
                }
            }
        }
    }
</style>