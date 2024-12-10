<template>
    <div  class="goodsList">
        <ul>
            <li v-for="item in goodsList.goodsList">
                <img :src="item.img1" alt="">
                <p>{{ item.proname }}</p>
                <span>&yen;{{item.originprice}}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import{ref} from 'vue'
    let goodsList = defineProps({goodsList:{
        type:Array,
        Required:true
    }})
</script>
<style lang="less" scoped>
.goodsList{
    width: 100%;
    ul{
        width: 100%;
        display: column;
        column-count: 2;
        column-gap: 2px;
        padding: 5px 5px;
        background-color: #e6e5e5;
        li{
            break-inside: avoid;
            width: 95%;
            margin-bottom: 10px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            img{
                width: 100%;
            }
            p{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin: 5px 3px;
            }
            span{
                margin: 5px;
                font-size: 25px;
                color: red;
            }
        }
    }
}
</style>