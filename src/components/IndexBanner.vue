<template>
    <div class="banner">
        <nut-swiper
            :init-page="2"
            :auto-play="3000"
            pagination-visible
            pagination-color="red"
            pagination-unselected-color="#808080"
        >
            <nut-swiper-item v-for="(item, index) in bannerList" :key="index" style="height: 150px">
            <img :src="item.img" alt="" style="height: 100%; width: 100%" draggable="false" />
            </nut-swiper-item>
        </nut-swiper>
    </div>
</template>
<script setup>
import { getBanner } from '@/apis/banner';
import {ref,onBeforeMount} from 'vue'
const bannerList = ref([])
onBeforeMount(async () => {
    let {data:res} = await getBanner()
    bannerList.value = res.data
})
</script>
<style lang="less">
    .banner{
        width: 100%;
        // height: 200px;
    }
</style>