<template>
    <div class="detail">
        <detail-header></detail-header>
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import DetailHeader from '@/components/DetailHeader.vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { getGoodsDetail } from '@/apis/goods';
const router = useRouter();
onBeforeMount(async () => {
    console.log(router)
    let {data:res} = await getGoodsDetail(router.currentRoute.value.params.proid)
    console.log(res)
})
</script>
<style lang="less">
    .detail{
        width: 100%;
        height: 100%;

    }
</style>