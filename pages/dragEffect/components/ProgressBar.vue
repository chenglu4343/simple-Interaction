<script setup lang="ts">
const barContainer = ref<HTMLElement | null>(null)
const leftDotPercent = ref(0)

function handleMouseDown(ev: MouseEvent) {
  handleMouseCalc(ev)
  barContainer.value?.classList.add('active')

  window.addEventListener('mousemove', handleMouseCalc)
  window.addEventListener(
    'mouseup',
    () => {
      barContainer.value?.classList.remove('active')
      window.removeEventListener('mousemove', handleMouseCalc)
    },
    {
      once: true,
    },
  )
}

function handleTouchStart(ev: TouchEvent) {
  handleTouchCalc(ev)
  barContainer.value?.classList.add('active')

  window.addEventListener('touchmove', handleTouchCalc)
  window.addEventListener(
    'touchend',
    () => {
      barContainer.value?.classList.remove('active')
      window.removeEventListener('touchmove', handleTouchCalc)
    },
    {
      once: true,
    },
  )
}

function calcLeftDotPercent(clientX: number) {
  const rect = barContainer.value?.getBoundingClientRect()
  if (!rect)
    return

  const moveX = clientX - rect.left
  leftDotPercent.value = Math.min(1, Math.max(0, moveX / rect.width))
}

function handleMouseCalc(ev: MouseEvent) {
  calcLeftDotPercent(ev.clientX)
}

function handleTouchCalc(ev: TouchEvent) {
  ev.preventDefault()
  calcLeftDotPercent(ev.touches[0].clientX)
}
</script>

<template>
  <div ref="barContainer" class="bar" @click="handleMouseCalc">
    <div
      class="dot"
      :style="{
        '--left': `${leftDotPercent * 100}%`,
      }"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
    />
  </div>
</template>

<style scoped lang="scss">
.bar {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #e5e5e5;
  position: relative;
  cursor: pointer;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #b13030;
    position: absolute;
    top: 0;
    left: var(--left);
    transform: translateX(-50%);
  }

  &.active .dot, .dot:hover{
      transform: translateX(-50%) scale(1.5);
  }
}
</style>
