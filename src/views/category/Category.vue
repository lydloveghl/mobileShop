<template>
    <div class="category">
        <header>
            <van-icon name="arrow-left" @click="router.push({path:'/index'})"/>
            <van-search
            shape="round"
            placeholder="请输入搜索关键词"
            @click="router.push({path:'/index/search'})"
            />
            <van-icon name="ellipsis" />
        </header>
        <section>
  <!--           <nut-category :category="data.category" @change="change">
                <nut-category-pane :categoryChild="data.categoryChild" @onChange="onChange"> </nut-category-pane>
            </nut-category> -->
            <van-sidebar v-model="active" @click="change">
                <van-sidebar-item v-for="item in category" :title="item">
                </van-sidebar-item>
            </van-sidebar>
            <div class="categoryBrand">
                <span v-for="item in categoryBrand">{{ item.brand }}</span>
            </div>
        </section>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import {ref,onBeforeMount,reactive, toRefs, onMounted} from 'vue'
import { getCategoryList,getCategoryBrand } from '@/apis/category';
const router = useRouter()
const store = useCounterStore()
const category = ref([])
const categoryBrand = ref([])
onBeforeMount(async () => {
    store.currentRouter = router.currentRoute.value.path
    let {data:res} = await getCategoryList()
    category.value = res.data
    let {data:brand} = await getCategoryBrand(category.value[0])
    categoryBrand.value = brand.data
})
/* const data = reactive({
  categoryInfo: {},
  category: [],
  categoryChild: []
}) */
const active = ref(0);

// const onChange = (index) => showToast(`标签名 ${index + 1}`);
const change = async (event) => {
    let {data:brand} = await getCategoryBrand(event.target.innerText)
    categoryBrand.value = brand.data
}
</script>
<style lang="less">
    .category{
        width: 100%;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        header{
            width: 100%;
            height: 50px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 20px;
            border-bottom: 1px solid #ccc;
            .van-search{
                padding: 0;
            }
        }
        section{
            flex: 1;
            height: calc(100% - 50px);
            display: flex;
            .van-sidebar{
                // width: 40px;
                overflow: auto;
                height: 100%;
                .van-sidebar-item::before{
                    background-color: red;
                }
            }
            .van-sidebar::-webkit-scrollbar{
                display: none;
            }
            div.categoryBrand{
                flex: 1;
                span{
                    // width: 60px;
                    border: 3px solid red;
                    height: 40px;
                    display: inline-block;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 10px;
                    margin: 10px;
                    padding: 10px;
                }
            }
        }
    }

</style>