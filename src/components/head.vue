<style lang="stylus">
    .head-box
        position: fixed
        top: 0
        left: 0
        right: 0
        transition: all .2s
        background: #fff
        border-bottom: 1px solid #f1f1f1
        color: #909090
        z-index: 250
        height: 60px
    .head-container 
        width: 1000px
        margin: 0 auto
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        align-items: center
        height:60px
    .log 
        margin-right:20px
    .log img
        height: 35px
    nav 
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        align-items: center
    
    nav a 
        padding: 0 15px
        font-size: 15px
        color: #8590a6
        cursor: pointer
    nav a:hover
        color:#007fff
    .search
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        margin-left:20px
    .search-bar
        width: 300px
        background:#f6f6f6
        border: 1px solid #ebebeb
        border-radius: 3px
        padding: 4px 10px
        box-sizing: border-box
        transition: all .2s ease
    .search-bar input 
        width: 100%
        font-size: 14px
        line-height: 24px
        background: transparent
        color:#8590a6
    .focus
        width: 380px
        background:#fff
        border:1px solid #8590a6
    .ask-question
        color: #fff
        background-color: #0084ff
        padding: 0 14px
        margin-left: 16px
        transition: all .3s ease
        line-height: 30px
        font-size:16px
        border-radius:5px
    .isHide
        opacity:0
    .operate 
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        flex:1 auto
        justify-content: flex-end
    .operate  li
        padding: 0 5px
        color: #007fff
        cursor: pointer
    .operate .write
        padding: 0 20px
</style>
<template>
    <header class="head-box">
        <div class="head-container">
            <div class="log">
                <img src="http://ozpmvfr0u.bkt.clouddn.com/resources/0/201801191439408723.png" alt="">
            </div>
            <nav>
                <router-link to="/">首页</router-link>
                <router-link to="/Source">开源库</router-link>
                <router-link to="/Activity">活动</router-link>
            </nav>
            <div class="search">
                <div class="search-bar" v-bind:class="{ focus:isFocus }">
                    <input type="" name="" placeholder="请输入你要搜索的内容" @focus="focusInput()" 
                    @blur="blurInput()">
                </div>
                <button class="ask-question" v-bind:class="{ isHide:isFocus }">提问</button>
            </div>
            <ul class="operate">
                <li class="write">写文章</li>
                |<li @click="login()">登录</li>
                <li @click="register()">注册</li>
            </ul> 
        </div>
        <masks :regOrLogin="operateType" :name="name" v-show="showMask" v-on:sendMsgToHideMask="sendMsgToHideMask()"></masks>
    </header>
</template>

<script>
import Masks from '@/components/mask'
export default {
    name:'head',
    components: {
      Masks
    },
    data() {
        return {
            isFocus:false,
            showMask:false,
            operateType:"",
            name:""
        }
    },
    computed: {
        
    },
    ready: function () {
        
    },
    methods: {
        focusInput:function(){
            this.isFocus = true;
        },
        blurInput:function(){
            this.isFocus = false;
        },
        login:function(){
            this.showMask = true;
            this.operateType = "Login",
            this.name = "登录"
        },
        register:function(){
            this.showMask = true;
            this.operateType = "Register"
            this.name = "注册"
        },
        sendMsgToHideMask:function(){
            this.showMask = false;
        }
    }
}

</script>
