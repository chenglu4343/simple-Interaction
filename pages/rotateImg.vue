<script setup lang='ts'>
useHead({
  title: 'rotateImg',
})

const imgArr = ref<string[]>([])
const currentIndex = ref(0)
const animationName = ref<'rotate-vertical' | 'rotate-horizontal' | undefined>(undefined)
const isAnimation = ref(false)

Promise.all([
  import('~/assets/image/pull-shark-default.png'),
  import('~/assets/image/pull-shark-bronze.png'),
  import('~/assets/image/pull-shark-silver.png'),
]).then((promises) => {
  imgArr.value = promises.map(p => p.default)
  nextTick(() => {
    startAnimate()
  })
})

function startAnimate() {
  isAnimation.value = true
  animationName.value = 'rotate-vertical'
}

function handleAnimationEnd(e: AnimationEvent) {
  if (e.animationName === 'rotate-vertical') {
    currentIndex.value = (currentIndex.value + 1) % imgArr.value.length
    animationName.value = 'rotate-horizontal'
  }
  else if (e.animationName === 'rotate-horizontal') {
    if (currentIndex.value === 0) {
      animationName.value = undefined
      isAnimation.value = false
      return
    }

    animationName.value = 'rotate-vertical'
  }
}

function handleMouseEnter() {
  if (isAnimation.value)
    return

  startAnimate()
}
</script>

<template>
  <div class="flex justify-center">
    <div
      class="imgs-container"
      :style="{
        'animation-name': animationName,
      }"
      @animationend="handleAnimationEnd"
      @mouseenter="handleMouseEnter"
    >
      <img
        v-for="(img, index) of imgArr" :key="index" :src="img" :style="{
          'z-index': currentIndex === index ? 1 : 0,
        }"
      >
    </div>
  </div>
</template>

<style scoped>
.imgs-container{
  --size: 280px;
  width: var(--size);
  height: var(--size);
  position: relative;
  animation-duration: .5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.imgs-container img{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

<style>
@keyframes rotate-vertical {
  0% {
    transform: rotateY(0)
  }
  100% {
    transform: rotateY(90deg)
  }
}

@keyframes rotate-horizontal {
  0% {
    transform: rotateY(90deg)
  }
  100% {
    transform: rotateY(0)
  }
}
</style>
