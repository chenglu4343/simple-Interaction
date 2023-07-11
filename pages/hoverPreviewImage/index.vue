<script setup lang="ts">
import defaultImgSrc from '~/assets/image/pull-shark-bronze.png'

useHead({
  title: 'hoverPreviewImage',
})

const HOVER_W = 100
const HOVER_H = 100
const HOVER_RATIO = HOVER_W / HOVER_H
const PREVIEW_W = 300
const containerRef = ref<HTMLElement | undefined>()
const { x: mouseX, y: mouseY } = useMouse({
  target: containerRef,
})
const styleVars = computed(() => {
  let minusLeft = 0
  let minusTop = 0
  let containerWidth = Infinity
  let containerHeight = Infinity

  if (containerRef.value) {
    const { pageLeft, pageTop } = getPageLeftAndTop(containerRef.value)
    minusLeft = pageLeft
    minusTop = pageTop
    containerWidth = containerRef.value.offsetWidth
    containerHeight = containerRef.value.offsetHeight
  }

  return {
    '--hover-w': `${HOVER_W}px`,
    '--hover-h': `${HOVER_H}px`,
    '--hover-ratio': HOVER_RATIO,
    '--preview-w': `${PREVIEW_W}px`,
    '--mouse-x': Math.min(Math.max(HOVER_W / 2, mouseX.value - minusLeft), containerWidth - HOVER_W / 2),
    '--mouse-y': Math.min(Math.max(HOVER_H / 2, mouseY.value - minusTop), containerHeight - HOVER_H / 2),
  }
})

/**
 * get offsetTop and offsetLeft to window
 */
function getPageLeftAndTop(element: HTMLElement) {
  let pageLeft = element.offsetLeft
  let pageTop = element.offsetTop
  let parent = element.offsetParent as HTMLElement

  while (parent) {
    pageLeft += parent.offsetLeft
    pageTop += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }

  return {
    pageLeft,
    pageTop,
  }
}
</script>

<template>
  <div class="flex flex-col items-center" :style="styleVars">
    <div
      ref="containerRef"
      class="container"
    >
      <!-- img-box -->
      <img :src="defaultImgSrc">
      <!-- hover-box -->
      <div class="hover-box" />
    </div>

    <!-- preview-box -->
    <div
      class="preview-box" :style="{
        '--bg-url': `url(${defaultImgSrc})`,
      }"
    />
  </div>
</template>

<style lang="scss">
.container{
  --container-width: 200px;
  --container-height:200px;
  --hover-bg: rgba(24, 144, 255,.6);

  position: relative;
  width: var(--container-width);
  height: var(--container-height);
  overflow: hidden;
  cursor: move;
  margin: auto;

  img{
    width: 100%;
    height: 100%;
  }

  .hover-box{
    display: none;
    position: absolute;
    width: var(--hover-w);
    aspect-ratio: var(--hover-ratio);
    background-color: var(--hover-bg);
    box-sizing: border-box;
    left: 0;
    top: 0;

    transform: translateX(-50%)
                translateY(-50%)
                translateX(calc(var(--mouse-x) * 1px))
                translateY(calc(var(--mouse-y) * 1px));
  }

  &:hover .hover-box{
    display: initial;
  }
}

.preview-box{
    width: var(--preview-w);
    aspect-ratio: var(--hover-ratio);
    margin: auto;
    overflow: hidden;
    background-image: var(--bg-url);
    background-size: calc(200px / 100px * 300px);
    background-position: left calc((var(--mouse-x) - 50) * -3px) top calc((var(--mouse-y) - 50) * -3px);
    background-repeat: no-repeat;
}
</style>
