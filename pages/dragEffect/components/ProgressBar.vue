<script setup lang="ts">
const barContainer = ref<HTMLElement | null>(null)
const leftDotPercent = ref(0)

function handleMouseDown(ev: MouseEvent) {
  calcLeftDotPercent(ev)
  barContainer.value?.classList.add('active')

  window.addEventListener('mousemove', calcLeftDotPercent)
  window.addEventListener(
    'mouseup',
    () => {
      barContainer.value?.classList.remove('active')
      window.removeEventListener('mousemove', calcLeftDotPercent)
    },
    {
      once: true,
    },
  )
}

function calcLeftDotPercent(ev: MouseEvent) {
  const rect = barContainer.value?.getBoundingClientRect()
  if (!rect)
    return

  const moveX = ev.clientX - rect.left
  leftDotPercent.value = Math.min(1, Math.max(0, moveX / rect.width))
}
</script>

<template>
  <div ref="barContainer" class="bar" @click="calcLeftDotPercent">
    <div
      class="dot"
      :style="{
        '--left': `${leftDotPercent * 100}%`,
      }"
      @mousedown="handleMouseDown"
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
