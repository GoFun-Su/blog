<template>
  <div id="app">
  	 <Header-nav></Header-nav>
	 <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from '@/components/head'
export default {
  name: 'app',
  components: {
  	 HeaderNav
  }
}
</script>
