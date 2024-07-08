<template>
  <section class="wrapper">
    <span>Hover Me</span>
    <article class="w-300px h-100px bg-fuchsia content" />
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;
  position: relative;

  .content {
    position: absolute;
    transition-duration: .3s;
    max-height: 0;
    overflow: hidden;
  }

  &:hover .content {
    max-height: 200px;
  }
}
</style>
