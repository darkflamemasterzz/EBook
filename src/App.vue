<template>
  <div id="app">
    <div class="text">text</div>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['test'])
    },
    mounted () {
      this.$store.dispatch('setTest', 10).then(() => {
        console.log(this.test)
      })
    }
  }
  // rem自适应布局
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize // 给fontSize设置最大值
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss" scoped>
@import "./assets/styles/global.scss";
.text{
  font-size: px2rem(40);
}
</style>
