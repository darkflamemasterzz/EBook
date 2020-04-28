<template>
    <div class="menu-bar">
        <transition name="slide-up">
            <div class="menu-wrapper"
                :class="{'hide-box-shadow': ifSettingShow || !menuVisible}"
                v-show="menuVisible"
            >
                <div class="icon-wrapper">
                    <span class="icon-manage icon" @click="showSetting(3)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-progress icon" @click="showSetting(2)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-bright icon" @click="showSetting(1)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-A icon" @click="showSetting(0)"></span>
                </div>
            </div>
        </transition>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="ifSettingShow">
                <div class="setting-font-size" v-if="showTag === 0">
                    <div class="preview" :style="{fontSize:fontSizeList[0]+'px'}">A</div>
                    <div class="select">
                        <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item)">
                            <div class="line"></div>
                            <div class="point-wrapper">
                                <div class="point" v-show="defaultFontSize === item">
                                    <div class="small-point"></div>
                                </div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1]+'px'}">A</div>
                </div>
                <div class="setting-theme" v-else-if="showTag === 1">
                    <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
                        <div class="preview" 
                            :style="{background: item.style.body.background}" 
                            :class="{'no-border': item.style.body.background !== '#fff'}"
                        ></div>
                        <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
                    </div>
                </div>
                <div class="setting-progress" v-else-if="showTag === 2">
                    <div class="progress-wrapper">
                        <input class="progress" type="range" 
                                                max="100"
                                                min="0"
                                                step="1"
                                                @change="onProgressChange($event.target.value)"
                                                @input="onProgressInput($event.target.value)"
                                                :value="progress"
                                                :disabled="!bookAvailable"
                                                ref="progress"/>
                    </div>
                    <div class="text-wrapper">
                        <span>{{bookAvailable ? progress + '%' : 'loading...'}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <ContentView :ifShowContent="ifShowContent"
                     v-show="ifShowContent"
                     :navigation="navigation"
                     :bookAvailable="bookAvailable"
                     @jumpTo="jumpTo"
        ></ContentView>
        <transition name="fade">
            <div class="content-mask"
                 v-show="ifShowContent"
                 @click="hideContent"
            ></div>
        </transition>
    </div>
</template>

<script>
/* eslint-disable*/
import ContentView from './ContentView'
import { ebookMixin } from '../../utils/mixin'
export default {
  name: "MenuBar",
  components: {
      ContentView
  },
  props: {
      fontSizeList: Array,
      defaultFontSize: Number,
      themeList: Array,
      defaultTheme: Number,
      bookAvailable: Boolean,
      navigation: Object
  },
  mixins: [ebookMixin],
  data () {
    return {
        ifSettingShow: false,
        showTag: 1,
        progress: 0,
        ifShowContent: false
    }
  },
  methods: {
      showSetting(tag) {
          this.showTag = tag
          if (this.showTag === 3) {
              this.ifSettingShow = false
              this.ifShowContent = true
          } else {
              this.ifSettingShow = true
          }
      },
      hideSetting() {
          this.ifSettingShow = false
      },
      setFontSize(fontSize) {
          this.$emit('setFontSize', fontSize)
      },
      setTheme(index) {
          this.$emit('setTheme', index)
      },
      onProgressInput(progress) {
          this.progress = progress
          this.$refs.progress.style.backgroundSize = '$(this.progress)% 100%'
      },
      onProgressChange(progress) {
          this.$emit('onProgressChange', progress)
      },
      hideContent() {
          this.ifShowContent = false
      },
      jumpTo(target) {
          this.$emit('jumpTo', target)
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
        z-index: 103;
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
                flex: 0 0 px2rem(60);
                @include center
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
                        position: relative;
                        flex: 0 0 0;
                        width: 0;
                        height: px2rem(7);
                        border-left: px2rem(1) solid #ccc;
                        .point {
                            position: absolute;
                            top: px2rem(-6);
                            left: px2rem(-6);
                            width: px2rem(20);
                            height: px2rem(20);
                            border-radius: 50%;
                            background: white;
                            border: px2rem(1) solid #ccc;
                            box-shadow: 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
                            @include center;
                            .small-point{
                                width: px2rem(5);
                                height: px2rem(5);
                                background: black;
                            }
                        }
                    }
                }
            }         
        }
        .setting-theme{
            height: 100%;
            display: flex;
            .setting-theme-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: px2rem(5);
                box-sizing: border-box;
                .preview{
                    flex: 1;
                    border: px2rem(1) solid #ccc;
                    box-sizing: border-box;
                    &.no-border{
                        border: none;
                    }
                }
                .text{
                    flex: 0 0 px2rem(20);
                    font-size: px2rem(14);
                    color: #ccc;
                    @include center;
                    &.selected {
                        color: #333;
                    }
                }
            }
        }
    }
    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
        .progress-wrapper {
            width: 100%;
            height: 100%;
            @include center;
            padding: 0 px2rem(30);
            box-sizing: border-box;
            .progress{
                width: 100%;
                -webkit-appearance: none;
                height: px2rem(2);
                background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
                background-size: 0 100%;
            }
            &:focus {
                outline: none;
            }
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: px2rem(20);
                width: px2rem(20);
                border-radius: 50%;
                background: white;
                box-shadow: 0 4px 4px 0 rgba(0,0,0,.15);
                border: px2rem(1) solid #ddd
            }
        }
    }
    .content-mask{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: 100%;
        background: rgba(51,51,51,.8)
    }
    .hide-box-shadow{
        box-shadow:none;
    }
}
</style>