<script setup lang="ts">
import ScrollQuery from './ScrollQuery.vue'
</script>

<template>
  <main class="grid grid-rows-[auto_1fr] h-full min-h-0 overflow-auto">
    <header class=" bg-indigo p-4" contenteditable>
      Header
    </header>

    <section class="grid grid-cols-[auto_1fr] overflow-auto min-h-50vh">
      <aside class="bg-rose p-4" contenteditable>
        asider
      </aside>
      <ScrollQuery class="bg-teal overflow-auto" />
    </section>
  </main>
</template>
