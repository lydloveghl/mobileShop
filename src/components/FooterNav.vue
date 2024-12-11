<template>
    <van-tabbar
    @change="onChange"
    v-model="active"
    route
    >
        <van-tabbar-item icon="shop-o" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to='/category'>分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact-o" v-if="info.code === 200">我的</van-tabbar-item>
        <van-tabbar-item icon="contact-o" v-if="info.code !== 200" to="/login">未登录</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
const store = useCounterStore();
let info = defineProps('loginInfo')
const active = ref(0);
const onChange = (index) => showToast(`标签 ${index}`);

</script>