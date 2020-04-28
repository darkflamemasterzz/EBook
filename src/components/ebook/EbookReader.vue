<template>
<div class="ebook">
    <TitleBar></TitleBar>
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prevPage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
    <MenuBar 
        :fontSizeList="fontSizeList" 
        :defaultFontSize="defaultFontSize"
        @setFontSize="setFontSize"
        ref="MenuBar"
        :themeList="themeList"
        :defaultTheme="defaultTheme"
        @setTheme="setTheme"
        :bookAvailable="bookAvailable"
        @onProgressChange="onProgressChange"
        :navigation="navigation"
        @jumpTo="jumpTo"
    ></MenuBar>
</div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import Epub from 'epubjs'
// const DOWNLOAD_URL = 'http://localhost:8081/epub/cs/java.epub'
global.ePub = Epub
/* eslint-disable*/
export default {
  name: "EbookReader",
  components: {
      TitleBar,
      MenuBar
  },
  mixins: [ebookMixin],
  data () {
    return {
        filePath: '',
        // ifTitleAndMenuShow: false, // 这个值应该由Vuex的menuVisible控制
        fontSizeList: [12,14,16,18,20,22,24],
        defaultFontSize: 16,
        themeList: [
            {
                name: 'default',
                style: {
                    body: {
                        'color': '#000', 'background': '#fff'
                    }
                }
            },
            {
                name: 'eye',
                style: {
                    body: {
                        'color': '#000', 'background': '#ceeaba'
                    }
                }
            },
            {
                name: 'night',
                style: {
                    body: {
                        'color': '#fff', 'background': '#000'
                    }
                }
            },
            {
                name: 'gold',
                style: {
                    body: {
                        'color': '#000', 'background': 'rgb(241,236,226)'
                    }
                }
            }
        ],
        defaultTheme: 0,
        bookAvailable: false,
        navigation: {}
    }
  },
  methods: {
       resolvedFilePath() {
            const BASE_URL = 'http://localhost:8081/epub/'
            // resolved file path from dynamic router
            const fileName = this.$route.params.filePath.split("|").join('/')
            const DOWNLOAD_URL = BASE_URL + fileName + '.epub'
            this.filePath = DOWNLOAD_URL
            // 把filePath存到vuex
            // this.$store.dispatch('setFilePath', filePath)
            return DOWNLOAD_URL
      },
      toggleTitleAndMenu() {
        //   this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
          this.setMenuVisible(!this.menuVisible)  
          if (!this.menuVisible){
              this.$refs.MenuBar.hideSetting()
          }
      },
      // 电子书解析和渲染
      showEpub() {
          // 生成book对象
          this.book = new Epub(this.resolvedFilePath())
          // 通过Book.renderTo生成Rendition
          this.rendition = this.book.renderTo('read', {
              width: window.innerWidth,
              height: window.innerHeight
          })
          // 通过Rendition.display渲染电子书
          this.rendition.display()
          // 获取Theme对象
          this.theme = this.rendition.themes
          // 设置为默认字号
          this.setFontSize(this.defaultFontSize)
          // 设置主题
          this.registerTheme()
          this.setTheme(this.defaultTheme)
          // 电子书进度定位、目录导航
          this.book.ready.then(() => {
              this.navigation = this.book.navigation
              return this.book.locations.generate()
          }).then(result => {
              this.locations = this.book.locations
              this.bookAvailable = true
          })
      },
      // 向前翻页
      prevPage() {
          if (this.rendition) {
              this.rendition.prev()
              this.hideTitleAndMenu()
          }
      },
      // 向后翻页
      nextPage() {
          if (this.rendition) {
              this.rendition.next()
              this.hideTitleAndMenu()
          }
      },
      setFontSize(fontSize) {
          this.defaultFontSize = fontSize
          if (this.theme){
              this.theme.fontSize(fontSize + 'px')
          }
      },
      registerTheme() {
          this.themeList.forEach(theme => {
              this.theme.register(theme.name, theme.style)
          })
      },
      setTheme(index) {
          this.theme.select(this.themeList[index].name)
          this.defaultTheme = index
      },
      // progress 进度条的数值（0-100）
      onProgressChange(progress) {
          const percentage = progress / 100
          const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
          this.rendition.display(location)
      },
      hideTitleAndMenu() {
        //   this.ifTitleAndMenuShow = false
        this.setMenuVisible(false) 
        this.$refs.MenuBar.hideSetting()
        this.$refs.MenuBar.hideContent()
      },
      //根据链接跳转到制定位置
      jumpTo(href) {
          this.rendition.display(href)
          this.hideTitleAndMenu()
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

