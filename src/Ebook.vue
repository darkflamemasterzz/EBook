<template>
    <div>
        <EbookReader></EbookReader>
    </div>
</template>

<script>
/* eslint-disable*/
import EbookReader from './components/ebook/EbookReader'
export default {
  name: "Ebook",
  components: {
      EbookReader
  }
  
}
</script>

<style lang="scss" scoped>
@import './assets/styles/global.scss';
</style>
