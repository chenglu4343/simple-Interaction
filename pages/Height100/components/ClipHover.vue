<template>
  <section class="wrapper">
    <span>Hover Me</span>
    <article class="w-300px h-100px bg-amber content p-10px">
      <a href="https://juejin.cn/post/7257716027211055141">See More</a>
    </article>
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;
  position: relative;

  .content {
    z-index: 1;
    position: absolute;
    clip-path: inset(0 0 100% 0);
    transition-duration: .3s;
    overflow: hidden;
  }

  &:hover .content {
      clip-path: inset(0);
  }
}
</style>
