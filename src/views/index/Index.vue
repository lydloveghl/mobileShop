<template>
    <div class="index">
        <div class="headerNav">
            <van-icon name="wap-nav"></van-icon>
            <van-search
            shape="round"
            placeholder="请输入搜索关键词"
            @click="router.push({path:'/index/search'})"
            disabled
            />
            <span @click="router.push({path:'/login'})">登录</span>
        </div>
        <section>
            <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
                <!-- <div>向下拉试试吧！</div> -->
                <!-- <div v-for="(item, index) in 24" class="test">{{ index }}</div> -->
                <index-banner></index-banner>
                <category-banner></category-banner>
                <my-sec-kill :secKillList="secKillList"></my-sec-kill>
                <goods-list :goodsList="goodsList"></goods-list>
            </nut-pull-refresh>
        </section>
    </div>
</template>
<script setup>
    import GoodsList from '@/components/GoodsList.vue';
    import CategoryBanner from '@/components/CategoryBanner.vue'; 
    import IndexBanner from '@/components/IndexBanner.vue';
    import MySecKill from '@/components/MySecKill.vue';
    import {useRouter} from 'vue-router'
    import { storeToRefs } from 'pinia';
    import { useCounterStore } from '@/stores/counter';
    import {ref,onBeforeMount,onMounted} from 'vue'
    import { getGoodsList, getSecKill } from '@/apis';
    const router = useRouter()
    const store = useCounterStore()
    const {currentRouter} = storeToRefs(store)
    const secKillList = ref([])
    const goodsList = ref([])
    onBeforeMount(async () => {
        store.currentRouter = router.currentRoute.value.path
        let {data:res} = await getSecKill(1,8)
        // console.log(res)
        secKillList.value = res.data
        let {data:goods} = await getGoodsList(1,30)
        goodsList.value = goods.data
    })
    const refresh = ref(false)
    const refreshFun = () => {
    setTimeout(() => {
        refresh.value = false
    }, 1000)
    }
</script>
<style lang="less">
    .index{
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        .headerNav{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-bottom: 1px solid #ddd;
            flex-shrink: 0;
            .van-icon{
                font-size: 19px;
            }
            .van-search{
                padding: 0;
            }
            span{
                color: red;
            }
        }
        section{
            flex: 1;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            overflow: auto;
            // background-color: #ddd;
            .nut-pull-refresh {
                width: 100%;
                overflow: auto;
            }
            .nut-pull-refresh::-webkit-scrollbar{
                display: none;
            }
        }
        section::-webkit-scrollbar{
            display: none;
        }
    }
</style>