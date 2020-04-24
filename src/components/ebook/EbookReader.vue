<template>
<div class="ebook">
    <TitleBar :ifTitleAndMenuShow="ifTitleAndMenuShow"></TitleBar>
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prevPage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
    <MenuBar :ifTitleAndMenuShow="ifTitleAndMenuShow" :fontSizeList="fontSizeList" ref="MenuBar"></MenuBar>
</div>
</template>

<script>
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import Epub from 'epubjs'
const DOWNLOAD_URL = 'http://localhost:8081/epub/cs/java.epub'
global.ePub = Epub
/* eslint-disable*/
export default {
  name: "Ebook",
  components: {
      TitleBar,
      MenuBar
  },
  data () {
    return {
        ifTitleAndMenuShow: false,
        fontSizeList: [12,14,16,18,20,22,24]
    }
  },
  methods: {
      toggleTitleAndMenu() {
          this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
          if (!this.ifTitleAndMenuShow){
              this.$refs.MenuBar.hideSetting()
          }
      },
      // 电子书解析和渲染
      showEpub() {
          // 生成book对象
          this.book = new Epub(DOWNLOAD_URL)
          // 通过Book.renderTo生成Rendition
          this.rendition = this.book.renderTo('read', {
              width: window.innerWidth,
              height: window.innerHeight
          })
          // 通过Rendition.display渲染电子书
          this.rendition.display()
      },
      // 向前翻页
      prevPage() {
          if (this.rendition) {
              this.rendition.prev()
          }
      },
      // 向后翻页
      nextPage() {
          if (this.rendition) {
              this.rendition.next()
          }
      }
  },
  mounted() {
      this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook{
    position: relative;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        display: flex;
        .left{
            flex: 0 0 px2rem(100);
        }
        .center{
            flex: 1;
        }
        .right{
            flex: 0 0 px2rem(100);
        }
    }
}
</style>

