<script setup lang="ts">
/** 解决移动端按钮过小，导致点击失效问题，扩大点击区域的同时，不改变原有布局 */
defineProps<{
  /** 查看可点击区域 */
  debug?: boolean
  /** 扩大点击区域的大小,@default -10rpx */
  size?: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <div
    class="scale-btn"
    :style="{
      '--bg-color': debug ? 'rgba(200, 0, 0, .6)' : undefined,
      '--size': size ?? '-10px',
    }"
    @click="$event => emit('click', $event)"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.scale-btn {
  --size: -10px;
  --bg-color: transparent;

  position: relative;
  line-height: 0;

  &::after {
    content: '';
    position: absolute;
    top: var(--size); /* 扩大上下点击区域 */
    bottom: var(--size);
    left: var(--size); /* 扩大左右点击区域 */
    right: var(--size);
    pointer-events: auto; /* 启用伪元素的点击事件 */
    background-color: var(--bg-color);
    z-index: 11;
  }
}
</style>
