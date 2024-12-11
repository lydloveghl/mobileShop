<template>
  <div class="app">
    <router-view :loginInfo="userInfo"></router-view>
    <router-view name="footer" :loginInfo="userInfo"></router-view>
  </div>
</template>
<script setup>
import FooterNav from './components/FooterNav.vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import {ref,onBeforeMount} from 'vue'
import { loginCheck } from '@/apis/login';
import {useRouter} from 'vue-router'
const router = useRouter()
const store = useCounterStore()
const userInfo = ref([]);
const {currentRouter} = storeToRefs(store)
onBeforeMount( async () => {
  let {data:res} = await loginCheck(store.userId);
  userInfo.value = res
  console.log(res)
}) 

</script>
<style lang="less">
.app{
  width: 100%;
  height: 100%;
}
</style>