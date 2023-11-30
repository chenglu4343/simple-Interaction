<script setup lang="ts">
const num = ref<number>()

if (process.client && !('paintWorklet' in CSS)) {
  requestAnimationFrame(innerCallback)

  function innerCallback() {
    num.value = num.value ? num.value + 1 : 1
    requestAnimationFrame(innerCallback)
  }
}
</script>

<template>
  <div class="text-center">
    <span
      class="font-bold text-100px  bg-clip-text clip" :style="{
        '--num': num,
      }"
    >
      UnoCSS
    </span>
  </div>
</template>

<style scoped>
.clip {
  --num: 0;
  --deg: calc(var(--num) * 1deg );
  background: linear-gradient(120deg, hsl(var(--deg), 50%, 50%) 30%, hsl(calc(var(--deg) + 30deg), 50%, 50%));
  color: transparent;
  background-clip: text;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    --num: 0;
  }
  to {
    --num: 360;
  }
}

@property --num {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}
</style>
