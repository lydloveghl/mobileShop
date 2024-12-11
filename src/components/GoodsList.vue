<template>
    <div  class="goodsList">
        <van-icon name="list-switch" v-if="showMethod === 'list'" @click="changeMethods"/>
        <van-icon name="list-switching" v-if="showMethod === 'grad'" @click="changeMethods"/>
        <ul v-if="showMethod === 'grad'">
            <li v-for="(item,index) in props.goodsList" @click="toDetail(index)">
                <img :src="item.img1" alt="">
                <p>{{ item.proname }}</p>
                <span>&yen;{{item.originprice}}</span>
            </li>
        </ul>
        <ol v-if="showMethod === 'list'">
            <li v-for="(item,index) in props.goodsList" @click="toDetail(index)">
                <img :src="item.img1" alt="">
                <div>
                    <p>{{ item.proname }}</p>
                    <span>&yen;{{ item.originprice }}</span>
                </div>
            </li>
        </ol>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const store = useCounterStore()
    const showMethod = ref('grad')
    let toDetail = (index) => {
        if(props.loginInfo.code !== '200'){
            router.push({path:'/login'})
            return;
        }
        router.push({name:'detail',params:{proid:props.goodsList[index].proid}})
    }
    let props = defineProps({goodsList:{
        type:Array,
        Required:true
    },loginInfo:Object})
    let changeMethods = () => {
        showMethod.value = showMethod.value === 'list'? 'grad' : 'list'
    }
</script>
<style lang="less" scoped>
.goodsList{
    width: 100%;
    .van-icon{
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            border-radius: 50%;
            position: fixed;
            bottom: 120px;
            right: 30px;
            background-color: #1989fa;
            font-size: 20px;
        }
        ol{
            width: 100%;
            display: flex;
            flex-direction: column;
            li{
                width: 95%;
                height: 120px;
                display: flex;
                margin-bottom: 10px;
                border-bottom: 2px solid #ccc;
                img{
                    width: 100px;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    margin: 10px;
                    p{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        // margin: 10px 10px;
                    }
                    span{
                        font-size: 25px;
                        color: red;
                        margin-top: 10px;
                    }
                }
            }
        }
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