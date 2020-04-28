<template>
    <transition name="slide-down">
        <div class="title-wrapper" v-show="menuVisible">
            <div class="left">
                <span class="icon-left icon" @click="back"></span>
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
</template>

<script>
/* eslint-disable*/
import { ebookMixin } from '../../utils/mixin'
export default {
  name: "TitleBar",
  data () {
    return {
        
    }
  },
  mixins: [ebookMixin],
  methods: {
      back() {
          console.log('back')
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
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
</style>