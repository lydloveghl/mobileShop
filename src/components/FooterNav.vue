<template>
    <van-tabbar
    @change="onChange"
    v-model="active"
    router
    >
        <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to='/category'>分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" v-if="info.code === 200">我的</van-tabbar-item>
        <van-tabbar-item icon="setting-o" v-if="info.code !== 200">未登录</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
 let info = defineProps('loginInfo')
 const active = ref(0);
 const onChange = (index) => showToast(`标签 ${index}`);

</script>