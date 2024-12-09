<template>
  <div class="app">
    <router-view></router-view>
    <footer-nav :loginInfo="userInfo"></footer-nav>
  </div>
</template>
<script setup>
import FooterNav from './components/FooterNav.vue';
import {ref,onBeforeMount} from 'vue'
import { loginCheck } from './apis/login';
const userInfo = ref([]);
onBeforeMount( async () => {
  let {data:res} = await loginCheck();
  userInfo.value = res;

}) 

</script>