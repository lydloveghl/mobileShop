<template>
    <div class="login">
        <header>
            <van-icon name="arrow-left" @click="router.back"/>
            <h1>登录/注册</h1>
        </header>
        <section>
            <MazPhoneNumberInput 
            orientation="row"
            :translations="{
                countrySelector: {
                placeholder: '国家',
                },phoneInput:{
                    placeholder:'请输入电话号码'
                }
            }"
            v-model="phoneNumber" @change="phone"/>
            <van-cell-group inset>
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <template #button>
                    <van-button size="small" type="primary" @click="sendCheckCode">发送验证码</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <van-button round type="success">登录</van-button>
        </section>
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import {useRouter} from 'vue-router'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import {sendCode} from '@/apis/login'
const router = useRouter()
const store = useCounterStore()
const {currentRouter} = storeToRefs(store)
onBeforeMount(async () => {
    store.currentRouter = router.currentRoute.value.path
})
const phoneNumber = ref('')
const sms = ref([])
const sendCheckCode =async () => {
    console.log(phoneNumber.value)
    let {data:res} = await sendCode(phoneNumber.value)
    console.log(res)
}
</script>
<style lang="less">
    .login{
        width: 100%;
        height: 100%;
        header{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: start;
            align-items: center;
            font-size: 20px;
            padding-left: 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            h1{
                width: calc(100% - 30px);
                text-align: center;

            }
        }
        section{
            // height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // padding: 0 20px;
            div.m-phone-number-input.m-reset-css{
                // flex-direction: row;
                // width: 50px;
                margin: 10px 0;
                margin-top: 30px;
                .m-country-selector{
                    width: 100px;
                }
            }
        }
        .van-button--success{
            background-color: red;
            width: 190px;
            border: 0;
            margin-top: 20px;
        }

    }
</style>