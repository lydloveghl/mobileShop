<template>
    <div class="index">
        <div class="headerNav">
            <van-icon name="wap-nav" @click="router.push({path:'/category'})"></van-icon>
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
                <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <goods-list :goodsList="goodsList" :loginInfo="loginInfo.loginInfo"></goods-list>
                </van-list>
                <!-- <nut-backtop el-id="elId2" :distance="100" :bottom="90"></nut-backtop> -->
                <van-back-top immediate bottom="80px"/>
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
    import { loginCheck } from '@/apis/login';
    const router = useRouter()
    const store = useCounterStore()
    const {loginInfo} = defineProps(['loginInfo'])
    const {currentRouter} = storeToRefs(store)
    const secKillList = ref([])
    const goodsList = ref([])
    const goodsListCount = ref(1)
    let getSecKillList = async () => {
        let {data:res} = await getSecKill(1,8)
        secKillList.value = res.data
    }
    let lCheck = async () => {
        let {data:checkResult} = await loginCheck(JSON.parse(localStorage.getItem('user')).userid)
        console.log(checkResult)
        loginInfo.loginInfo = checkResult
    }
    let get_GoodsList = async () => {
        let {data:goods} = await getGoodsList(goodsListCount.value,30)
        goodsList.value = goods.data
    }
    onBeforeMount(() => {
        store.currentRouter = router.currentRoute.value.path
        getSecKillList()
        get_GoodsList()
        lCheck()
    })
    onMounted(() => {
        lCheck()
    })
    const refresh = ref(false)
    const refreshFun = () => {
        setTimeout(() => {
            refresh.value = false
            let randomCount = parseInt(Math.random() * (4-1) +1)
            if(goodsListCount === randomCount){
                randomCount = parseInt(Math.random() * (4-1) +1)
            }
            goodsListCount.value = randomCount
            get_GoodsList()
        }, 1000)
    }
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = async () => {
        goodsListCount.value += 1
        let{data:addGoodsList} = await getGoodsList(goodsListCount.value,30)
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        goodsList.value = [...goodsList.value,...addGoodsList.data]
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (addGoodsList.data.length === 0) {
          finished.value = true;
        }
      }, 1000);
    };
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