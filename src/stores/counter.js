import { defineStore } from "pinia"; 
import { useRouter } from "vue-router";

export const useCounterStore = defineStore('counter',() => {
    const router = useRouter()
    const currentRouter = router.currentRoute.value.path
    const userId = ''
    const token = ''
    return {currentRouter,router,userId,token}
    
})