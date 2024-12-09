<template>
    <div class="search">
        搜索
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import { useCounterStore } from '@/stores/counter';
const router = useRouter()
const store = useCounterStore()
const {currentRouter} = storeToRefs(store)
onBeforeMount(() => {
    store.currentRouter = router.currentRoute.value.path
})
</script>