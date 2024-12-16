<template>
    <section class="cartSection">
        <van-swipe-cell  v-for="item in cartList.cartList">
            <div class='goodsBox'>
                <nut-checkbox v-model="item.flag" @change='changeSelectStatus(item.cartid,item.flag)'/>
                <img :src="item.img1" alt="">
                <div class="introduce">
                    <p class="goodsName">{{item.proname}}</p>
                    <p class="stepper">
                        <nut-price :price="item.originprice" :decimal-digits="3" thousands />
                        <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="changeNum(item.cartid,item.num)"/>
                    </p>
                </div> 
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.cartid)" />
            </template>
        </van-swipe-cell>
        <van-submit-bar :price="goodsStatus.totalPrice" button-text="提交订单" @submit="onSubmit" >
            <van-checkbox v-model="allSelected" @change="selectAll">全选</van-checkbox>
<!--             <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template> -->
        </van-submit-bar>
    </section>
</template>
<script setup>
    import {ref,onBeforeMount,watch,computed} from 'vue'
    import { changeFlag } from '@/apis/cart';
    import { changeCartNum } from '@/apis/cart';
    import { removeCart } from '@/apis/cart';
    import { isAll } from '@/apis/cart';
    import { useCounterStore } from '@/stores/counter';
    const store = useCounterStore()
    const cartList = defineProps(['cartList'])
    const allSelected = ref(false);
    watch(
        () => cartList.cartList.map((item) => item.flag),
        (flags) => {
            allSelected.value = flags.length > 0 && flags.every((flag) => flag);
        },
        { deep: true }
    );
    const changeSelectStatus = (cartid, flag) => {
        const item = cartList.cartList.find((item) => item.cartid === cartid);
        if (item) {
            item.flag = flag;
            changeFlag(cartid, flag); 
        }
    };
    let changeNum = (cartid,num) => {
        changeCartNum(cartid,num)
    }
    let deleteGoods = async (cartid) => {
        removeCart(cartid)
        location.reload()
    }

    const goodsStatus = computed(() => ({
        totalPrice: cartList.cartList  
            .filter((item) => item.flag)
            .reduce((sum, item) => sum + item.originprice * item.num, 0)
    }));
    const selectAll = async (checked) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user')).userid;
            await isAll(userId, checked);
            cartList.cartList.forEach((item) => {
            item.flag = checked;
            });
            allSelected.value = checked;
        } catch (error) {
            console.error('全选操作失败', error);
        }
    };
/*     onBeforeMount(() => {
        if (cartList.cartList) {
            const allSelected = cartList.cartList.every((item) => item.flag);
            goodsStatus.value.type = allSelected; // 更新全选状态
        }
    }); */
/*     let selectAll = async () => {
        let {data:select} = await isAll(JSON.parse(localStorage.getItem('user')).userid,type.value)
        console.log(select)
        location.reload()
    } */
    // const onSubmit = () =>;
    // const onClickLink = () => showToast('修改地址');
</script>
<style lang="less" scoped>
    .cartSection{
        background-color: #e4e3e3;
        flex: 1;
        overflow: auto;
        .van-submit-bar{
            bottom: 50px;
        }
        .van-swipe-cell{
            background-color: #fff;
            margin-bottom: 5px;
            .van-button{
                height: 100%;
            }
            .goodsBox{
                width: 95%;
                border-bottom: 1px solid #ccc;
                // height: 100px;
                height: 150px;
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 5px;
                box-sizing:border-box;
                // overflow:auto;
                .nut-checkbox{
                    margin-right:2px;
                }
                img{
                    width: 130px;
                }
                .introduce{
                    width: 198px;
                    flex-shrink:0;
                    display: flex;
                    padding: 30px 2px;
                    flex-direction: column;
                    justify-content: start;
                    align-items: start;
                    box-sizing:border-box;
                    .goodsName{
                        font-size: 14px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp:2;
                        overflow: hidden;
                        margin-bottom: 30px;
                    }
                    .stepper{
                        display: flex;
                        width: 100%;
                        justify-content: space-evenly;
                    }
                }
            }
        }
    }
    .cartSection::-webkit-scrollbar{
        display: none;
    }
</style>