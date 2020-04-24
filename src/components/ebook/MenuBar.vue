<template>
    <div class="menu-bar">
        <transition name="slide-up">
            <div class="menu-wrapper"
                :class="{'hide-box-shadow': ifSettingShow || !ifTitleAndMenuShow}"
                v-show="ifTitleAndMenuShow"
            >
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
                <div class="setting-font-size">
                    <div class="preview moveAlittleBitRight" :style="{fontSize:fontSizeList[0]+'px'}">A</div>
                    <div class="select">
                        <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index">
                            <div class="line"></div>
                            <div class="point-wrapper">
                                <div class="point"></div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="preview moveAlittleBitLeft" :style="{fontSize:fontSizeList[fontSizeList.length-1]+'px'}">A</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: "MenuBar",
  props: {
      ifTitleAndMenuShow: Boolean,
      fontSizeList: Array
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
        z-index: 100;
        bottom: px2rem(59);
        left: 0;
        width: 100%;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        .setting-font-size {
            display: flex;
            height: 100%;
            .preview {
                flex: 0 0 px2rem(40);
                @include center
            }
            .moveAlittleBitRight{
                position: relative;
                left: px2rem(20);
            }
            .moveAlittleBitLeft{
                position: relative;
                right: px2rem(30);
            }
            .select{
                display: flex;
                flex: 1;
                .select-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    &:first-child {
                        .line{
                            &:first-child {
                                border-top: none
                            }
                        }
                    }
                    &:last-child {
                        .line{
                            &:last-child {
                                border-top: none;
                            }
                        }
                    }
                    .line{
                        flex: 1;
                        height: 0;
                        border-top: px2rem(1) solid #ccc
                    }
                    .point-wrapper {
                        flex: 0 0 0;
                        width: 0;
                        height: px2rem(7);
                        border-left: px2rem(1) solid #ccc
                    }
                }
            }         
        }
    }
    .hide-box-shadow{
        box-shadow:none;
    }
}
</style>