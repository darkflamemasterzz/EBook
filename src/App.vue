<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {

  }
  // rem自适应布局（让根元素的font-size随着屏幕宽度的变化而变化）
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize // 给fontSize设置最大值
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss" scoped>
@import "./assets/styles/global.scss";
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
