<script setup lang="ts">
const COUNT = 10
const loadingRef = ref<HTMLDivElement>()
const data = ref<Array<{ title: string }>>([])

if (process.client) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // 实际还需要判断是否已经有数据再请求了，是否数据已经请求完毕了
      data.value = data.value.concat(
        Array.from({ length: COUNT }).map((_, i) => ({
          title: `Item ${data.value.length + i + 1}`,
        })),
      )
      // 手动触发下一次的 IntersectionObserver，可能加载完之后依然没有撑满
      requestAnimationFrame(() => {
        observer.unobserve(loadingRef.value!)
        observer.observe(loadingRef.value!)
      })
    }
  })

  onMounted(() => {
    observer.observe(loadingRef.value!)
  })
  onBeforeUnmount(() => {
    observer.disconnect()
  })
}
</script>

<template>
  <section>
    <ul>
      <li v-for="item in data" :key="item.title">
        {{ item.title }}
      </li>
    </ul>
  </section>
  <footer ref="loadingRef" class="text-center">
    loading...
  </footer>
</template>
