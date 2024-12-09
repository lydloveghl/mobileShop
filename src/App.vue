<template>
  <div class="app">
    <router-view></router-view>
    <footer-nav :loginInfo="userInfo" v-if="store.currentRouter !== '/index/search' "></footer-nav>
  </div>
</template>
<script setup>
import FooterNav from './components/FooterNav.vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import {ref,onBeforeMount} from 'vue'
import { loginCheck } from './apis/login';
import {useRouter} from 'vue-router'
const router = useRouter()
const store = useCounterStore()
const userInfo = ref([]);
const {currentRouter} = storeToRefs(store)
onBeforeMount( async () => {
  let {data:res} = await loginCheck();
  userInfo.value = res;
}) 

</script>