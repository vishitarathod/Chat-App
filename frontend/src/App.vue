<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue'
export default {
  components: { TheHeader },
  name: 'App',

}
</script>
