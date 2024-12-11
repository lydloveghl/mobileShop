<template>
    <div class="register">
        <header>
            <van-icon name="arrow-left" @click="router.back"/>
            <h1>注册</h1>
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
            v-model="phoneNumber" 
            @change="phoneChecked"
            />
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
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码"/>
            <van-button round type="success" @click="userRegister">注册</van-button>
        </section>
    </div>
</template>
<script setup>
    import { storeToRefs } from 'pinia';
    import { useCounterStore } from '@/stores/counter';
    import { useRouter } from 'vue-router';
    import { ref,onBeforeMount } from 'vue';
    import { phoneCheck,codeCheck,register } from '@/apis/register';
    import { sendCode } from '@/apis/login';
    import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
    const store = useCounterStore();
    const router = useRouter();
    const phoneNumber = ref('')
    const sms = ref('')
    const password = ref('')
    onBeforeMount(() => {
        store.currentRouter = router.currentRoute.value.path
    })
    const phoneChecked = async () => {
        let {data:checkResult} = await phoneCheck(phoneNumber.value.slice(3))
        if(checkResult.code !== '200'){
            showFailToast('手机号已注册');
        }
    }
    const sendCheckCode = async () => {
        console.log(phoneNumber.value.slice(3))
        let {data:res} = await sendCode(phoneNumber.value.slice(3))
        console.log(res)
    }
    const userRegister = async () => {
        let {data:checkResult} = await codeCheck(phoneNumber.value.slice(3),sms.value)
        if(checkResult.code !== '200'){
            showFailToast('验证码错误');
            console.log(checkResult)
            sms.value='';
            return;
        }
        let {data:registerResult} = await register(phoneNumber.value.slice(3),password.value)
        console.log(registerResult)
        if(registerResult.code !== '200'){
            showFailToast('注册失败');
            password.value='';
            sms.value = '';
            return;
        }
        showSuccessToast('注册成功');
        router.push({path:'/login'})
    }
</script>
<style lang="less">
    .register{
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
            .van-button--success{
                background-color: red;
                width: 190px;
                border: 0;
                margin-top: 20px;
            }
            .van-field{
                padding: 20px 0;
                width: 300px;
            }
        }
    }
</style>