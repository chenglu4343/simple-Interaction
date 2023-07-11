<script setup lang="ts">
import { useHoverPreviewImg } from './helpers/useHoverPreviewImg'
import defaultImgSrc from '~/assets/image/pull-shark-bronze.png'

useHead({
  title: 'hoverPreviewImage',
})

const containerRef = ref<HTMLElement | undefined>()

const { containerStyle, hoverBoxStyle, previewBoxStyle } = useHoverPreviewImg({
  imgSrc: defaultImgSrc,
  containerRef,
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      ref="containerRef"
      class="container"
      :style="containerStyle"
    >
      <!-- img-box -->
      <img :src="defaultImgSrc">
      <!-- hover-box -->
      <div class="hover-box" :style="hoverBoxStyle" />
    </div>

    <!-- preview-box -->
    <div
      class="preview-box" :style="previewBoxStyle"
    />
  </div>
</template>

<style lang="scss">
.container{
  margin: auto;

  img{
    width: 100%;
    height: 100%;
  }

  .hover-box{
    display: none;
  }

  &:hover .hover-box{
    display: initial;
  }
}

.preview-box{
    margin: auto;
}
</style>
