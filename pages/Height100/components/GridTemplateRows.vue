<template>
  <section class="wrapper">
    <span>Hover Me</span>
    <article class="bg-cyan content">
      <div class="overflow-hidden">
        <div class="w-300px h-100px">
          <a href="https://dev.to/francescovetere/css-trick-transition-from-height-0-to-auto-21de?ref=dailydev">See More</a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;

  .content {
    position: absolute;
    display: grid;
    grid-template-rows: 0fr;
    transition-duration: .3s;
  }

  &:hover .content {
    grid-template-rows: 1fr;
  }
}
</style>
