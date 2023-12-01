<script setup lang="ts">
import { useTimeSharingRef } from './helpers'

interface Data {
  left: string
  top: string
  id: string
}

const loadSize = [1000, 10000, 100000, 500000, 1000000]
const dataArr = ref<Array<Data>>([])
const { setValue } = useTimeSharingRef(dataArr)

function generateData(): Data {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    id: `${Math.random() * 100000000000000000}`,
  }
}

function handleClear() {
  setValue([])
}

function load(size: number) {
  setValue(Array.from({ length: size }, () => generateData()))
}
</script>

<template>
  <main class="grid grid-rows-[auto_1fr] h-full gap-20px">
    <section class="flex gap-10px">
      <button @click="handleClear">
        clear
      </button>
      <button v-for="size of loadSize" :key="size" @click="load(size)">
        load x {{ size }}
      </button>
    </section>
    <section class="h-full bg-indigo relative">
      <div
        v-for="item of dataArr" :key="item.id" class="absolute w-10px h-10px bg-emerald rounded-50%" :style="{
          left: item.left,
          top: item.top,
        }"
      />
    </section>
  </main>
</template>
