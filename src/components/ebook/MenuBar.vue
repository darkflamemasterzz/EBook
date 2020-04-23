<template>
    <div class="menu-bar">
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
                    <span class="icon-A icon" @click="showSetting"></span>
                </div>
            </div>
        </transition>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="ifSettingShow">
                <div class="setting-font-size"></div>
            </div>
        </transition>
    </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: "MenuBar",
  props: {
      ifTitleAndMenuShow: Boolean
  },
  data () {
    return {
        ifSettingShow: false
    }
  },
  methods: {
      showSetting() {
          this.ifSettingShow = true
      },
      hideSetting() {
          this.ifSettingShow = false
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';

.menu-bar{
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
    .setting-wrapper {
        position: absolute;
        z-index: 102;
        bottom: px2rem(48);
        left: 0;
        width: 100%;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        .setting-font-size {

        }
    }
}
</style>