<template>
    <div class="cart">
        <cart-header></cart-header>
        <cart-section :cartList="cartList"></cart-section>
    </div>
</template>
<script setup>
    import CartHeader from './CartHeader.vue';
    import {onBeforeMount,ref} from 'vue'
    import { getCart } from '@/apis/cart';
    import CartSection from './CartSection.vue';
    const cartList = ref([])
    onBeforeMount(async () => {
        let {data:cart} = await getCart(JSON.parse(localStorage.getItem('user')).userid)
        cartList.value = cart.data
    })
</script>