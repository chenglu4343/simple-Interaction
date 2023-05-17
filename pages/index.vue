<script setup>
import { navigation } from '~/constants/navigation'
</script>

<template>
  <main class="grid grid-rows-[auto_1fr] h-full gap-4 min-h-0 w-full">
    <h1 class="m-0">
      navigation
    </h1>

    <section class="grid navigation-container max-w-full gap-4 items-start">
      <div v-for="(nav, index) of navigation" :key="index" class="flex items-center gap-2 min-w-0">
        <span>{{ index + 1 }}.</span>
        <a :href="nav.path">{{ `${nav.name}` }}</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.navigation-container{
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
</style>
