import { defineStore } from "pinia"; 
import { useRouter } from "vue-router";
import { computed } from "vue";
export const useCounterStore = defineStore('counter',() => {
    const router = useRouter()
    const currentRouter = router.currentRoute.value.path
    return {currentRouter,router}
    
})