<style lang="stylus">
.first
    margin-top: 10px
.first-item
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    justify-content:space-around
.first-item li
    width:50px
    height:50px
    border-radius:50px
    background-color: #f4f8fb
    align-items:center
    justify-content: center
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    cursor: pointer
    color:#8b9196
.first-item li img
    width:30px
    height:30px
#close
    cursor: pointer
</style>
<template>
    <div class="mask-container">
        <div class="masks">
            <div class="close">
                <span class="name">{{name}}</span>
                <span id="close" @click="sendMsgToHideMask()">×</span>
            </div>
            <component :is="regOrLogin" 
                        v-on:switchStateToLogin="switchStateToLogin()"
                        v-on:switchStateToReg="switchStateToReg()">
            </component>
            <div class="first">
                <p>第三方登录：</p>
                <ul class="first-item">
                    <li>
                        <img src="https://gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg">
                    </li>
                    <li>
                        <img src="https://gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg">
                    </li>
                    <li>
                        <img src="https://gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Register from '@/components/register'
import Login from '@/components/login'
export default {
    name:'mask',
    props:["regOrLogin","name"],
    components: {
        Register,Login
    },
    data() {
        return {
        }
    },
    computed: {
        
    },
    ready: function () {
        
    },
    methods: {
      switchStateToLogin:function(){
        this.regOrLogin ="Login";
        this.name = "登录"
      },
      switchStateToReg:function(){
        this.regOrLogin ="Register";
        this.name = "注册"
      },
      sendMsgToHideMask:function(){
        this.$emit("sendMsgToHideMask")
      }
    }
}

</script>
