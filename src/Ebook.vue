<template>
<div class="ebook">
    <transition name="slide-down">
        <div class="title-wrapper" v-show="ifTitleAndMenuShow">
            <div class="left">
                <span class="icon-left icon"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-user icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more icon"></span>
                </div>
            </div>
        </div>
    </transition>
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prevPage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
    <transition name="slide-up">
        <div class="menu-wrapper" v-show="ifTitleAndMenuShow">
            <div class="icon-wrapper">
                <span class="icon-manage icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-progress icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-bright icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-A icon"></span>
            </div>
        </div>
    </transition>
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
        ifTitleAndMenuShow: false
    }
  },
  methods: {
      toggleTitleAndMenu() {
          this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
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
@import './assets/styles/global.scss';
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
    .title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.15);
        .left{
            flex: 0 0 px2rem(60);
            @include center;
            .icon{
                font-size: px2rem(30);
            }
        }
        .right{
            flex: 1;
            @include center;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper{
                flex: 0 0 px2rem(40);
                @include center;
                .icon{
                    font-size: px2rem(25);
                }
            }
        }
    }
    .menu-wrapper{
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        .icon-wrapper{
            flex: 1;
            @include center;
            .icon-manage {
                font-size: px2rem(24)
            }
            .icon-progress {
                font-size: px2rem(24)
            }
            .icon-bright {
                font-size: px2rem(24)
            }
        }
    }
}
</style>
