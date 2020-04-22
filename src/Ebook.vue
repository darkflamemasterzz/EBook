<template>
<div class="ebook">
    <div class="read-wrapper">
        <div id="read"></div>
    </div>
</div>
</template>

<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = 'http://localhost:8081/epub/cs/java.epub'
global.ePub = Epub
/* eslint-disable*/
export default {
  name: "Ebook",
  data () {
    return {
    }
  },
  methods: {
      // 电子书解析和渲染
      showEpub() {
          // 生成book对象
          this.book = new Epub(DOWNLOAD_URL)
          console.log(this.book)
          // 通过Book.renderTo生成Rendition
          this.rendition = this.book.renderTo('read', {
              width: window.innerWidth,
              height: window.innerHeight
          })
          // 通过Rendition.display渲染电子书
          this.rendition.display()
      }
  },
  mounted() {
      this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import './assets/styles/global.scss'
</style>
