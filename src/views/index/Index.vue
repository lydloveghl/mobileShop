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
            <index-banner></index-banner>
            <category-banner></category-banner>
        </section>
    </div>
</template>
<script setup>
    import CategoryBanner from '@/components/CategoryBanner.vue'; 
    import IndexBanner from '@/components/IndexBanner.vue';
    import {useRouter} from 'vue-router'
    import { storeToRefs } from 'pinia';
    import { useCounterStore } from '@/stores/counter';
    import {ref,onBeforeMount} from 'vue'
    const router = useRouter()
    const store = useCounterStore()
    const {currentRouter} = storeToRefs(store)
    onBeforeMount(() => {
        store.currentRouter = router.currentRoute.value.path
    })
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
            background-color: #ddd;
        }
    }
</style>