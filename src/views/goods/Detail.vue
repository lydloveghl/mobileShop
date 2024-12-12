<template>
    <div class="detail">
        <header :class="{ visible: showHeader }">
            <IconFont name="left"></IconFont>
            <div class="titleTab">
                <span :class="{active : activeTab === 0}" @click="scrollToSection(0)">商品<i></i></span>
                <span :class="{active : activeTab === 1}" @click="scrollToSection(1)">评价<i></i></span>
                <span :class="{active : activeTab === 2}" @click="scrollToSection(2)">详情<i></i></span>
                <span :class="{active : activeTab === 3}" @click="scrollToSection(3)">推荐<i></i></span>
            </div>
            <IconFont name="more-x"></IconFont>
        </header>
        <section>
            <div id="goods" class="section">
                <nut-swiper :auto-play="3000" @change="onChange">
                    <nut-swiper-item v-for="(item, index) in goodsBanner" :key="index" style="height: 250px">
                    <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
                    </nut-swiper-item>
                    <template #page>
                    <div class="swiper-pagination"> {{ val }}/4 </div>
                    </template>
                </nut-swiper>
                <p class="price"><nut-price :price="goodsDetail.originprice" :decimal-digits="3" thousands size="large" /></p>
                <p class="goodsName">
                    <nut-ellipsis direction="end" :content="goodsDetail.proname" :rows="2"></nut-ellipsis>
                    <span>同款低价</span>
                </p>
                <nut-cell title="选择地址" :desc="text" is-link @click="showAddressOther"></nut-cell>
                <nut-address
                    v-model:visible="showPopupOther"
                    type="exist"
                    :exist-address="existAddress"
                    :province="address.province"
                    :city="address.city"
                    :country="address.country"
                    :town="address.town"
                    @close="close"
                    @selected="selected"
                    custom-and-exist-title="选择其他地址"
                    @switch-module="switchModule"
                    @close-mask="closeMask"
                    @change="placeChange"
                ></nut-address>
            </div>
            <div id="evaluate" class="section">
                <nut-comment
                :images="cmt.images"
                :videos="cmt.videos"
                :info="cmt.info"
                @click="handleclick"
                @clickImages="clickImages"
                :operation="['replay']"
            >
                <template #comment-labels>
                <img
                    class="nut-comment-header__labels--item"
                    src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg"
                />
                </template>
            </nut-comment>
            </div>
            <div id="recommend" class="section">
                <h1><span></span>猜你喜欢</h1>
                <div></div>
            </div>
            <div id="details" class="section"></div>
        </section>
        <footer>
            <van-action-bar>
                <van-action-bar-icon icon="shop-o" text="店铺" color="#ee0a24"/>
                <van-action-bar-icon icon="comment-o" text="客服" />
                <van-action-bar-icon icon="shopping-cart-o" text="购物车"/>
                <van-action-bar-button type="warning" text="加入购物车" />
                <van-action-bar-button type="danger" text="立即购买" />
            </van-action-bar>
        </footer>
    </div>
</template>
<script setup>
import {ref,onBeforeMount,onUnmounted,nextTick,reactive,onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { getGoodsDetail } from '@/apis/goods';
import { getPlaceList } from '@/apis/place';
const router = useRouter();
const goodsDetail = ref([])
const goodsBanner = ref([])
const store = useCounterStore()
const userAddress = ref([])
const existAddress = ref([])
const activeTab = ref(0);
const goodsRef = ref(null);
const evaluateRef = ref(null);
const detailsRef = ref(null);
const recommendRef = ref(null);
const sectionRefs = [goodsRef, evaluateRef, detailsRef, recommendRef];
const showHeader = ref(false);
onBeforeMount(async () => {
    console.log(router)
    let {data:res} = await getGoodsDetail(router.currentRoute.value.params.proid)
    goodsBanner.value = res.data.banners[0].split(',')
    goodsDetail.value = res.data
    console.log(res.data)
    let {data:address} = await getPlaceList(store.userId)
    console.log(address)
    userAddress.value = address.data
    for(var i = 0; i < userAddress.value.length;i++){
        var newObj = {
            id:userAddress.value[i].userid,
            addressDetail:userAddress.value[i].addressDetail,
            cityName:userAddress.value[i].city,
            countyName:userAddress.value[i].county,
            provinceName:userAddress.value[i].province,
            selectedAddress:userAddress.value[i].isDefault,
            townName:'',
            name:userAddress.value[i].name,
            phone:userAddress.value[i].tel
        }
        existAddress.value.push(newObj)
    }
})
const val = ref(1)
const onChange = (index) => {
  val.value = index + 1
}
let scrollToSection = async (index) => {
    const targetRef = sectionRefs[index];
  if (targetRef.value) {
    await nextTick(); 
    const offsetTop = targetRef.value.offsetTop;
    window.scrollTo({
      top: offsetTop - 50, 
      behavior: 'smooth',
    });
    activeTab.value = index;
  }
}
const handleScroll = () => {
    const scrollTop = window.scrollY;
    showHeader.value = scrollTop > 100; 
    console.log(scrollHeader.value)
    sectionRefs.forEach((refItem, index) => {
        if (refItem.value) {
        const rect = refItem.value.getBoundingClientRect();
        
        if (rect.top <= 60 && rect.bottom >= 60) {
            activeTab.value = index;
        }
        }
    });
};
const showPopupOther = ref(false)
const address = reactive({
  province: [
    { id: 1, name: '北京' },
    { id: 2, name: '广西' },
    { id: 3, name: '江西' },
    { id: 4, name: '四川' }
  ],
  city: [
    { id: 7, name: '朝阳区' },
    { id: 8, name: '崇文区' },
    { id: 9, name: '昌平区' },
    { id: 6, name: '石景山区' }
  ],
  country: [
    { id: 3, name: '八里庄街道' },
    { id: 9, name: '北苑' },
    { id: 4, name: '常营乡' }
  ],
  town: []
})
const backBtnIcon = ref('left')
const text = ref('选择地址')

const showAddressOther = () => {
  showPopupOther.value = true
}

const close = (val) => {
  if (val.type == 'exist') {
    const { provinceName, cityName, countyName, townName, addressDetail } = val.data
    text.value = provinceName + cityName + countyName + townName + addressDetail
  } else {
    text.value = val.data.addressStr
  }
}

const selected = (prevExistAdd, nowExistAdd, arr) => {
  console.log(prevExistAdd)
  console.log(nowExistAdd)
}

const switchModule = (cal) => {
  if (cal.type == 'custom') {
    console.log('点击了“选择其他地址”按钮')
  } else {
    console.log('点击了自定义地址左上角的返回按钮')
  }
}
const placeChange = (cal) => {
  const name = address[cal.next]
  if (!name || name.length < 1) {
    showPopupOther.value = false
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
const closeMask = (val) => {
  console.log('关闭弹层', val)
}
let cmt = ref({})
onMounted(() => {
  fetch('//storage.360buyimg.com/nutui/3x/comment_data.json')
    .then((response) => response.json())
    .then((res) => {
      cmt.value = res.Comment
    })
    .catch((err) => console.log('Oh, error', err))
})
const handleclick = (info) => {
  console.log('进行跳转', info)
}
const clickImages = (imgs) => {
  console.log('进行图片展示', imgs)
}
</script>
<style lang="less" scoped>
    .detail{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        section{
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: auto;
            height: calc(100% - 50px);
            background-color: #e5e5e5;
            #evaluate{
                background-color: #fff;
                padding: 10px;
                margin-bottom: 10px;
            }
            #recommend{
                background-color: #fff;
                padding: 10px;
                box-sizing: border-box;

                h1{
                    display: flex;
                    height: 30px;
                    align-items: center;
                    span{
                        width: 2px;
                        height: 100%;
                        margin-right: 10px;
                        background-image: linear-gradient(to bottom,red ,#fff);
                        display: inline-block;
                    }
                }
            }
            #goods{
                width: 100%;
                background-color: #fff;
                margin-bottom: 10px;
                .swiper-pagination {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 46px;
                    height: 22px;
                    background: rgba(0, 0, 0, 0.33);
                    border-radius: 22px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    line-height: 22px;
                }
                p{
                    margin: 20px 10px;
                    span{
                        margin-top: 10px;
                        color: #ababab;
                        font-size: 12px;
                    }
                }
            }
        }
        footer{
            .van-action-bar-button{
                border-radius: 40px;
                margin: 5px;
            }
        }
        header{
            width: 100%;
            height: 50px;
            display: flex;
            position: sticky;
            top: -50px;
            // align-items: center;
            background-color: #f5f5f5;
            // padding: 0 10px;
            .titleTab{
                flex: 1;
                display: flex;
                align-items: center;
                span{
                    width: 25%;
                    // line-height: 50px;
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    i{
                        display: none;
                        width: 30%;
                        height: 2px;
                        background-image: linear-gradient(to right bottom,red,#fff);

                    }
                }
            }    
                .nut-icon{
                    width: 40px;
                    height: 50px;
                    line-height: 50px;

                }
            }
    }
</style>
