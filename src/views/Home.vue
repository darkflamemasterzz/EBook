<template>
  <div class="home">
    <span class="icon-book"></span>
  </div>
</template>

<script>
// @ is an alias to /src
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'Home'
}
</script>
