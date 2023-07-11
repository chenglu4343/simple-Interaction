<script setup lang="ts">
import { useHoverPreviewImg } from './helpers/useHoverPreviewImg'
import defaultImgSrc from '~/assets/image/pull-shark-bronze.png'

useHead({
  title: 'hoverPreviewImage',
})

const containerRef = ref<HTMLElement | undefined>()
const containerWidth = ref(200)
const containerHeight = ref(200)
const hoverWidth = ref(100)
const hoverHeight = ref(100)
const previewWidth = ref(300)

const { containerStyle, hoverBoxStyle, previewBoxStyle } = useHoverPreviewImg({
  imgSrc: defaultImgSrc,
  containerRef,
  containerWidth,
  containerHeight,
  hoverWidth,
  hoverHeight,
  previewWidth,
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

    <!-- input -->
    <div class="mt-4">
      <div class="row">
        <span>containerWidth:</span>
        <input v-model="containerWidth" type="number">
      </div>
      <div class="row">
        <span>containerHeight:</span>
        <input v-model="containerHeight" type="number">
      </div>
      <div class="row">
        <span>hoverWidth:</span>
        <input v-model="hoverWidth" type="number">
      </div>
      <div class="row">
        <span>hoverHeight:</span>
        <input v-model="hoverHeight" type="number">
      </div>
      <div class="row">
        <span>previewWidth:</span>
        <input v-model="previewWidth" type="number">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container{
  margin: auto;

  img{
    width: 100%;
    height: 100%;
    // object-fit: contain;
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

.row{
  display: flex;

  &>span{
    min-width: 150px;
  }
}
</style>
