<template>
    <header class="cart-header">
        <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="onClickLeft"
        >
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>

    </header>
</template>
<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();
    let onClickLeft = () => {
        router.push('/index')
    }
</script>