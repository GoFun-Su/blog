<style lang="stylus">
    .prompt-box
        margin-top:10px
    .forget-pwd
        float:right
</style>
<template>
        <div class="login">
            <div class="item">
                <label for="name">用户名：</label>
                <input type="text" id="name" 
                        class="form-control input" 
                        name="name"
                        placeholder="请输入用户名"
                        v-model="name"
                        v-validator:name="'required|name'">
            </div>
           <div class="item">
                <label for="password">密码</label>
                <input type="text" id="password" 
                        class="form-control input" 
                        name="password"
                        placeholder="请输入密码"
                        v-model="password"
                        v-validator:password="'required|password'">
            </div>
            <button class="btn" @click="login()">登录</button>
            <div class="prompt-box">
                <span>没有账号？</span>
                <span @click="switchStateToReg()" class="switch-state">注册</span>
                <span class="switch-state forget-pwd">忘记密码</span>
            </div>
        </div>
</template>

<script>
export default {
    name:'login',
    components: {
       
    },
    data() {
        return {
            name:"",
            password:""
        }
    },
    computed: {
        
    },
    ready: function () {
        
    },
    methods: {
      switchStateToReg:function(){
        this.$emit("switchStateToReg")
      },
      login:function(){
        this.$allValidate().then().catch(err =>{
            
        })
      }
    }
}

</script>
