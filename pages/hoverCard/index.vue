<script setup lang='ts'>
import type { Component } from 'vue'
import TrickerCard from './components/TrickerCard.vue'
import ZoomInCard from './components/ZoomInCard.vue'

useHead({
  title: 'HoverCard',
})

const cards: {
  title: string
  component: Component
}[] = [
  {
    title: 'CSS tricker card',
    component: TrickerCard,
  },
  {
    title: 'Zoom In Card',
    component: ZoomInCard,
  },
]
</script>

<template>
  <main>
    <section v-for="(card, index) of cards" :key="index">
      <h2>{{ card.title }}</h2>
      <component :is="card.component" />
    </section>
  </main>
</template>
