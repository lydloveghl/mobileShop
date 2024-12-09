import { defineStore } from "pinia"; 
import { useRouter } from "vue-router";

export const useCounterStore = defineStore('counter',() => {
    const router = useRouter()
    const currentRouter = router.currentRoute.value.path
    return {currentRouter,router}
    
})