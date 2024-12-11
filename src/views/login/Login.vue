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
            v-model="phoneNumber" @change="phone" v-if="loginMethod === 'code'"/>
            <MazInput
                v-model="userPhone"
                label="账号名/邮箱/手机号"
                autocomplete="off"
                class="phoneInput"
                v-else
            />
            <van-cell-group inset v-if="loginMethod === 'code'">
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <template #button>
                    <van-button size="small" type="primary" @click="sendCheckCode" disabled>发送验证码</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <MazInput v-model="passwordValue" label="请输入密码" type="password" class="passwordInput" v-else/>
            <van-button round type="success" @click="userLogin">登录</van-button>
            <p><span @click="changeMethod">账号密码登录</span><span @click="router.push('/register')">手机快速注册</span></p>
        </section>
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import {useRouter} from 'vue-router'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import {sendCode,login} from '@/apis/login'
import MazInput from 'maz-ui/components/MazInput'
const userPhone = ref('')
const loginMethod = ref('code')
const router = useRouter()
const store = useCounterStore()
const passwordValue = ref('')
const changeMethod = () => {
    if(loginMethod.value === 'code'){
        loginMethod.value = 'password'
    }else{
        loginMethod.value = 'code'
    }
}
const {currentRouter} = storeToRefs(store)
onBeforeMount(async () => {
    store.currentRouter = router.currentRoute.value.path
})
const phoneNumber = ref('')
const sms = ref('')
const sendCheckCode =async () => {
    console.log(phoneNumber.value.slice(3))
    let {data:res} = await sendCode(phoneNumber.value.slice(3))
    console.log(res)
}
const userLogin = async () => {
    let {data:loginResult} = await login(userPhone.value,passwordValue.value)
    console.log(sms.value)
    if(loginResult.code !== '200'){
        showFailToast('登录失败,请仔细检查密码');
        sms.value = ''
        passwordValue = ''
    }
    showSuccessToast('登录');
    localStorage.setItem('user',JSON.stringify(loginResult.data))
    store.token = loginResult.data.token
    store.userId = loginResult.data.userid
    router.push('/')
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
            
            .phoneInput,.passwordInput{
                width: 300px;
                margin: 20px;
                .m-input-wrapper{
                    width: 100%;
                }
            }
            div.m-phone-number-input.m-reset-css{
                // flex-direction: row;
                // width: 50px;
                margin: 10px 0;
                margin-top: 30px;
                .m-country-selector{
                    width: 100px;
                }
            }
            p{
                width: 100%;
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
                font-size: 12px;
                color: #696969;
                align-items: center;
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