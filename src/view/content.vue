<style lang="stylus">
    .container
        display: -webkit-box
        display: -ms-flexbox
        display: flex
    aside
        width:240px
        margin-left:20px
        background:#fff
    .left
        flex:1
        background:#fff
    .left nav 
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        padding: 20px
        justify-content: space-between
    .left ul.title
        display: -webkit-box
        display: -ms-flexbox
        display: flex

</style>
<template>
    <div class="view-contaner">
       <div class="container">
           <div class="left">
               <nav>
                   <h5 class="h5">推荐文章</h5>
                   <ul class="title">
                        <li>
                            <router-link to="/">推荐</router-link>
                        </li>
                        <li>
                            <router-link to="/Read">阅读</router-link>
                        </li>
                        <li>
                            <router-link to="">推荐</router-link>
                        </li>
                        <li>
                            <router-link to="">推荐</router-link>
                        </li>
                        <li>
                            <router-link to="">推荐</router-link>
                        </li>
                        <li>
                            <router-link to="">推荐</router-link>
                        </li>
                   </ul>
               </nav>
                <router-view></router-view>
           </div>
           <aside>
               dddddddd
           </aside>
       </div>
    </div>
</template>

<script>

export default {
    name:'content',
    components: {
      
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
      
    }
}

</script>
