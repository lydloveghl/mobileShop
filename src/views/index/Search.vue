<template>
    <div class="search">
        <header>
            <van-icon name="arrow-left" @click="router.back"/>
            <van-search
            shape="round"
            placeholder="请输入搜索关键词"
            />
            <button @click="getSearchResult">搜索</button>
        </header>
        <section>
            <div>
                <p>热门搜索:<span @click="showChange">隐藏</span></p>
                <van-row justify="end" v-if='showStatus'>
                    <van-col span="6" v-for="item in hotSearchData">{{ item.keyword }}</van-col>
                </van-row>
                <p v-if="!showStatus">热门搜索已隐藏</p>
            </div>
        </section>
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import { useCounterStore } from '@/stores/counter';
import { hotSearch } from '@/apis/search';
let loginInfo = defineProps('loginInfo');
const router = useRouter()
const store = useCounterStore()
const {currentRouter} = storeToRefs(store)
const hotSearchData = ref([])
const showStatus = ref(false)
onBeforeMount(async () => {
    store.currentRouter = router.currentRoute.value.path
    const {data:res} = await hotSearch()
    hotSearchData.value = res.data
})
const showChange = () => {
    showStatus.value = !showStatus.value
}
const getSearchResult = () => {
    if(loginInfo.code !== 200){
        router.push({path:'/login'})
    }
}
</script>
<style scoped>
    .search{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        header{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-bottom: 1px solid #ddd;
            .van-search{
                padding: 0;
            }
            button{
                background-color: rgb(220, 16, 16);
                border: 0;
                width: 50px;
                height: 30px;
                border-radius: 10px;
                color: #ddd;
                transition: 2ms all liner;
            }
            button:active{
                transform: translate3d(0,2px,0);
            }
        }
        section{
            width: 100%;
            background-color: #dadada;
            flex: 1;
            border-top: 1px solid #ccc;
            div{
                width: 100%;
                background-color: #fff;
                padding: 10px;
                p{
                    width: 100%;
                    span{
                        float: right;
                        margin-right: 20px;
                    }
                }
                .van-row{
                    width: 90%;
                    margin: 10px auto;
                    background-color: #fff;
                    .van-col:nth-child(-n + 3){
                        color: red;
                    }
                }
                p:nth-of-type(2){
                    text-align: center;
                    margin: 20px 0;
                }
            }
        }
    } 
</style>